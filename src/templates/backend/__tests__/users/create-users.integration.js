const request = require('supertest')
const { startServer } = require('../../src')
const { mockUser } = require('../mocks/user-mocks')

describe('Users Integration - Create users', () => {
  let appServer

  const createUserRequest = async (body) => {
    return await request(appServer).post('/v0/users').send(body)
  }

  beforeAll(async () => {
    appServer = await startServer()
  })

  afterAll(async () => {
    await new Promise((resolve) => appServer.close(resolve))
  })

  describe('/v#/users', () => {
    test('POST: 200 if user was created', async () => {
      const res = await createUserRequest(mockUser)
      expect(res.statusCode).toBe(200)
    })

    test('POST: 422 if request does not contain username', async () => {
      const res = await createUserRequest({})
      expect(res.statusCode).toBe(422)
      expect(res.body.error.validations[0].message).toBe('"username" is required')
    })
  })
})
