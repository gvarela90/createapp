const { isCelebrate } = require('celebrate')

const logError = require('../../gateways/log-error')
const { UnknownValidationError } = require('../../utils/endpoint-errors')

module.exports = (error, req, res, next) => {
  // :: Joi malformed
  if (isCelebrate(error) && error.joi.details.length) {
    return res.status(422).json({
      error: {
        status: 422,
        validations: [...error.joi.details],
      },
    })
  }
  // :: Joi unknown validation
  else if (isCelebrate(error)) {
    return next(new UnknownValidationError())
  }
  // :: Errors without status
  if (!error.status) {
    logError('Unexpected error %o', error)
  }
  res.status(error.status || 500)
  res.json({
    error: {
      status: error.status,
      message: error.message,
    },
  })
}
