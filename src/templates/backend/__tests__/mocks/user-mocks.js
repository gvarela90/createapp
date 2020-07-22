const { ObjectId } = require('mongodb')

const userId = new ObjectId()

const mockUser = Object.freeze({
  username: 'user-test',
  firstName: 'John',
  lastName: 'Doe',
})

module.exports = {
  userId,
  mockUser,
}
