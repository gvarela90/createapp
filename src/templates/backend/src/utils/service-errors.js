class AppError extends Error {}
Object.defineProperty(AppError.prototype, 'name', {
  value: 'UnblockerError',
})

const definitions = [['CustomError', 'CustomMessage']]

module.exports = definitions.reduce(
  (accum, def) => ({
    ...accum,
    [def[0]]: class extends AppError {
      constructor(message = def[1]) {
        super()
        this.message = message
        if (def[2]) this.status = def[2]
      }
    },
  }),
  {},
)
