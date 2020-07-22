const { Router } = require('express')
const { celebrate, Joi } = require('celebrate')
const middlewares = require('../middlewares')
const { NotFoundError } = require('../../utils/endpoint-errors')
const createUser = require('../../services/users/create-user')
const retrieveUser = require('../../services/users/retrieve-user')

const router = Router({ mergeParams: true })

module.exports = (app) => {
  app.use('/users', router)

  router.post(
    '',
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }),
    }),
    middlewares.asyncMiddleware(async (req, res) => {
      const id = await createUser(req.body)
      return res.json({ id })
    }),
  )

  router.get(
    '/:userId',
    middlewares.asyncMiddleware(async (req, res) => {
      const data = await retrieveUser(req.params.userId)
      if (!data) throw NotFoundError('User not found')
      res.json({ data })
    }),
  )
}
