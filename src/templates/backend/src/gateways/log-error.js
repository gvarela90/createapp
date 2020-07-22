const trackErrorInSentry = require('./track-error-in-sentry')

/* istanbul ignore file */
module.exports = (message, error) => {
  console.error(message, error) // eslint-disable-line no-console
  trackErrorInSentry(error)
}
