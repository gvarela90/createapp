module.exports = {
  $jsonSchema: {
    title: 'Users',
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      username: { bsonType: 'string' },
      firstName: { bsonType: 'string' },
      lastName: { bsonType: 'string' },
      createdAt: { bsonType: 'date' },
    },
  },
}
