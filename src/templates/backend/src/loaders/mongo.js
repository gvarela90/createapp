const { MongoClient } = require('mongodb')
const logError = require('../gateways/log-error')
const { SECRETS } = require('../config')
const dbName = SECRETS.db.name

const mongoClientConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority',
  readConcern: { level: 'majority' },
}

module.exports = {
  connectClients,
  getDb,
  getCollections,
  withTransaction,
  closeClient,
}

const mongoClient = new MongoClient(SECRETS.db.connectionUrl, mongoClientConfig)
let connectionAttempt

if (process.env.NODE_ENV !== 'test') connectClients()

async function connectClients() {
  if (connectionAttempt) return connectionAttempt

  try {
    connectionAttempt = Promise.all([mongoClient.connect()])

    await connectionAttempt
  } catch (error) {
    logError('Could not connect to MongoDB %o', error)
    process.exit(1)
  }
}

async function getDb() {
  await connectClients()
  return mongoClient.db(dbName)
}

async function getCollections() {
  await connectClients()
  const db = mongoClient.db(dbName)
  return {
    Users: db.collection('users'),
  }
}

async function withTransaction(fn) {
  await connectClients()
  const session = mongoClient.startSession()
  let result = {}
  try {
    await session.withTransaction(async () => {
      // Configuring CI to run transactions is tricky.
      // This is the workaround for now.
      result = await fn(process.env.CI ? null : session)
    })
    session.endSession()
    return result
  } catch (err) {
    session.endSession()
    throw err
  }
}

process.on('SIGINT', closeClient)
process.on('SIGTERM', closeClient)

async function closeClient() {
  if (connectionAttempt) await connectionAttempt

  try {
    if (mongoClient.isConnected()) await mongoClient.close()
  } catch (error) {
    logError('Could not close clients %o', error)
    process.exit(1)
  }

  if (process.env.NODE_ENV !== 'test') process.exit(0)
}
