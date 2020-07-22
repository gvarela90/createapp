/* istanbul ignore file */
const { sentryDsn } = require('../config')
const Sentry = require('@sentry/node')
const isProd = process.env.NODE_ENV === 'production'

if (isProd) Sentry.init({ dsn: sentryDsn })

module.exports = (error) => {
  isProd && Sentry.captureException(error)
}
