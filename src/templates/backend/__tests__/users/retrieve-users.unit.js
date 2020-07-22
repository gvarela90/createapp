const retrieveUser = require('../../src/services/users/retrieve-user')
const { getCollections } = require('../../src/loaders/mongo')
const { mockUser, userId } = require('../mocks/user-mocks')

describe('Users Unit - Retrieve users', () => {
  let Users

  beforeAll(async () => {
    ;({ Users } = await getCollections())
  })

  beforeEach(async () => {
    await Users.insertOne({ ...mockUser, _id: userId })
  })

  test('Should return the user found', async () => {
    const user = await retrieveUser(userId)
    expect(user).toMatchObject({
      ...mockUser,
      _id: userId,
    })
  })

  test('Should return null when user was not found', async () => {
    const user = await retrieveUser('5f184bed28c5e475cdbc5ae9')
    expect(user).toBeNull()
  })
})
