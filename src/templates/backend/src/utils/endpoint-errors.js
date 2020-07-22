class EndpointError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

Object.defineProperty(EndpointError.prototype, 'name', {
  value: 'EndpointError',
})

module.exports = {
  EndpointError,
  UnauthorizedError,
  NotFoundError,
  UnprocessableEntityError,
  UnknownValidationError,
}

function UnauthorizedError(message = 'Unauthorized error') {
  return new EndpointError(message, 401)
}

function NotFoundError(message = 'Not found') {
  return new EndpointError(message, 404)
}

function UnprocessableEntityError(message = 'Invalid Payload structure') {
  return new EndpointError(message, 422)
}

function UnknownValidationError(
  message = 'A validation error occurred but no details are available',
) {
  return new EndpointError(message, 500)
}
