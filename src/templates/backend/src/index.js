const express = require('express')
const configureApp = require('./loaders/configure-app')
const { SETTINGS } = require('./config')
const log = require('./gateways/log')

const app = express({ strict: true })
configureApp(app)

if (process.env.NODE_ENV !== 'test') startServer()
module.exports = { startServer }

function startServer({ port = SETTINGS.PORT } = {}) {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        log(`Server up and running at ${port} 🚀`)
        resolve(server)
      })
      .on('error', (error) => {
        reject(error)
        process.exit(2)
      })
  })
}
