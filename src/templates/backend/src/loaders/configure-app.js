const bodyParser = require('body-parser')
const middlewares = require('../endpoints/middlewares')
const endpoints = require('../endpoints')
const { NotFoundError } = require('../utils/endpoint-errors')

module.exports = (app) => {
  app.use('/v0/ping', (_, res) => res.sendStatus(204))
  app.use(bodyParser.json())

  app.use('/v0', endpoints())

  app.use((req, res, next) => next(new NotFoundError('Route not found')))
  app.use(middlewares.errorsMiddleware)
}
