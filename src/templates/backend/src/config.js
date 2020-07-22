const getEnvForConfig = require('./utils/get-env-for-config')
const ENV_FOR_CONFIG = getEnvForConfig()

const SECRETS = require(`../config/${ENV_FOR_CONFIG}/secrets`)
const SETTINGS = require(`../config/${ENV_FOR_CONFIG}/settings`)

if (process.env.NODE_ENV === 'test') {
  // So that we can run concurrent tests that use the DB.
  SECRETS.db.name = `${SECRETS.db.name}_${Date.now()}`
}

module.exports = { SECRETS, SETTINGS }
