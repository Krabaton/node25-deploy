const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const getPayloadFromBearToken = (req) => {
  const [_, token] = req.get('authorization')
    ? req.get('authorization').split(' ')
    : [null, null]

  const payload = jwt.decode(token, SECRET_KEY)

  return payload ? payload : { id: null }
}

module.exports = {
  getPayloadFromBearToken,
}
