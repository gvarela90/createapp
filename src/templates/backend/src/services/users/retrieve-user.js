const { ObjectId } = require('mongodb')
const { getCollections } = require('../../loaders/mongo')

module.exports = async (id) => {
  const { Users } = await getCollections()
  return await Users.findOne({ _id: ObjectId(id) })
}
