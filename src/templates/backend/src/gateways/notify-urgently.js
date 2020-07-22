/* istanbul ignore file */
const fetch = require('node-fetch')
const baseDiscordUrl = 'https://discordapp.com/api/webhooks'
const { discord } = require('../config')

module.exports = (message, channel = 'warnings') => {
  if (process.env.NODE_ENV !== 'production') return null
  const { channelId, channelToken } = discord[channel]
  return fetch(`${baseDiscordUrl}/${channelId}/${channelToken}`, {
    method: 'POST',
    body: JSON.stringify({ content: message }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
