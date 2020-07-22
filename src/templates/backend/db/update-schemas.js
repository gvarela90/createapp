const { getDb } = require('../src/loaders/mongo')
const usersSchema = require('./schemas/users')
const { log } = require('../src/gateways/log')

async function updateSchemas() {
  const db = await getDb()

  const updateSchema = async (collection, schema, level) => {
    await db.command({
      collectionMod: collection,
      validator: schema,
      validationLevel: level,
      validationAction: 'error',
    })

    // eslint-disable-next-line no-console

    log(`Updated schema in collection ${collection}`)
  }

  const triples = [
    ['users', usersSchema, 'moderate'], // not strict
  ]

  for (const triple of triples) {
    await updateSchema(...triple)
  }
  process.exit()
}

updateSchemas()
