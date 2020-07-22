const { getDb, closeClient } = require('../../src/loaders/mongo')

jest.setTimeout(30000)
jest.mock('../../src/gateways/log')
jest.mock('../../src/gateways/log-error')

beforeEach(async () => {
  const db = await getDb()
  await db.dropDatabase()
})

afterAll(async () => {
  const db = await getDb()
  await db.dropDatabase()
  await closeClient()
})
