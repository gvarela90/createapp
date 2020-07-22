const config = require('../src/config')
const { startServer } = require('../src')
const log = require('../src/gateways/log')

describe('Bare express server and DB init', () => {
  let appServer
  let exit

  beforeAll(async () => {
    appServer = await startServer()
    exit = jest.spyOn(process, 'exit').mockImplementation((number) => {
      log(`Process exited with code ${number}`)
    })
  })

  afterAll(async () => {
    exit.mockRestore()
    await new Promise((resolve) => appServer.close(resolve))
  })

  test('process.exit(1) if cannot connect to MongoDB', async () => {
    jest.resetModules()
    jest.doMock('../src/config', () => {
      const newConfig = JSON.parse(JSON.stringify(config))
      newConfig.SECRETS.db.connectionUrl = 'aWrongDbUrl'
      return newConfig
    })

    const { connectClients } = require('../src/loaders/mongo')

    await connectClients()
    expect(exit).toHaveBeenCalledWith(1)

    jest.resetModules()
  })

  test('process.exit(2) if cannot start express app', async () => {
    expect.assertions(2)
    // Spawn a second server on the same port so we know it will fail to start
    await expect(
      startServer({ port: appServer.address().port }),
    ).rejects.toThrow('listen EADDRINUSE')
    expect(exit).toHaveBeenCalledWith(2)
  })
})
