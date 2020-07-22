const { Router } = require('express')
const users = require('./routes/user-routes')

module.exports = () => {
  const app = Router()

  users(app)
  return app
}
