// The environment is 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { NODE_ENV } = process.env
module.exports = () => NODE_ENV
