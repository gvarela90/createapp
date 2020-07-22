const request = require('supertest')
const { getCollections } = require('../../src/loaders/mongo')
const { startServer } = require('../../src')
const { mockUser, userId } = require('../mocks/user-mocks')

describe('Users Integration - Retrieve users', () => {
  let appServer, Users

  const retrieveUserRequest = async (id) => {
    return await request(appServer).get(`/v0/users/${id}`).send({})
  }

  beforeAll(async () => {
    appServer = await startServer()
    ;({ Users } = await getCollections())
  })

  beforeEach(async () => {
    await Users.insertOne({ ...mockUser, _id: userId })
  })

  afterAll(async () => {
    await new Promise((resolve) => appServer.close(resolve))
  })

  describe('/v#/users/#', () => {
    test('GET: 200 if user exists', async () => {
      const res = await retrieveUserRequest(userId)
      expect(res.statusCode).toBe(200)
      expect(res.body.data._id).toBe(userId.toString())
    })

    test('GET: 404 if user does not exist', async () => {
      const res = await retrieveUserRequest('5f184bed28c5e475cdbc5ae9')
      expect(res.statusCode).toBe(404)
      expect(res.body.error.message).toBe('User not found')
    })
  })
})
