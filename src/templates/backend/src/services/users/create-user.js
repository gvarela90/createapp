const { getCollections } = require('../../loaders/mongo')

module.exports = async (data) => {
  const { Users } = await getCollections()
  const { insertedId } = await Users.insertOne({ ...data, createdAt: new Date() })
  return insertedId
}
