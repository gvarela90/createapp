const moment = require('moment-timezone')

// moment() anchored to LA/server time
module.exports = (date) => {
  return moment(date).tz('America/Los_Angeles')
}
