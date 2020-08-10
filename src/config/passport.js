const passport = require('passport')
const passportJwt = require('passport-jwt')
const { users } = require('../repository')
const { SECRET_KEY } = require('./config')

const Strategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await users.findById(payload.id)
      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, { id: user.id })
    } catch (err) {
      done(err)
    }
  }),
)
