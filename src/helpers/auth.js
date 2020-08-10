const passport = require('passport')
const { HttpCode } = require('./constants')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(HttpCode.FORBIDEN).json({
        statusMessage: 'Error',
        status: HttpCode.FORBIDEN,
        data: {
          message: 'Forbiden',
        },
      })
    }
    return next()
  })(req, res, next)
}

module.exports = auth
