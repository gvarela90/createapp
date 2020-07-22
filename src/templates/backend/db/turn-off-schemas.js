const { getDb } = require('../src/loaders/mongo')
const { log } = require('../src/gateways/log')

async function turnoffSchemas() {
  const db = await getDb()
  const turnoffSchema = async (collection) => {
    await db.command({
      collectionMod: collection,
      validationLevel: 'off',
    })
    // eslint-disable-next-line no-console
    log(`Turned off schema in collection ${collection}`)
  }
  const collections = ['users']
  for (const collection of collections) {
    await turnoffSchema(collection)
  }
  process.exit()
}

turnoffSchemas().then(() => {
  log('Finished disabling DB schemas')
  process.exit()
})
