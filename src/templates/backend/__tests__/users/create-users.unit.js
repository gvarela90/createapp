const createUser = require('../../src/services/users/create-user')
const { getCollections } = require('../../src/loaders/mongo')
const { mockUser } = require('../mocks/user-mocks')

describe('Users Unit - Create users', () => {
  let Users

  beforeAll(async () => {
    ;({ Users } = await getCollections())
  })

  test('Should create a user', async () => {
    const _id = await createUser(mockUser)
    const userCreated = await Users.findOne({ _id })
    expect(userCreated).not.toBeNull()
  })
})
