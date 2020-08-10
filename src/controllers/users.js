const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/config')
const { users } = require('../repository')
const { HttpCode } = require('../helpers/constants')
const { getPayloadFromBearToken } = require('../helpers/getpayload')

const reg = async (req, res, next) => {
  const { email, password, name, sex } = req.body
  const user = await users.findByEmail(email)
  if (user) {
    return res.status(HttpCode.BAD_REQUEST).json({
      statusMessage: 'Error',
      status: HttpCode.BAD_REQUEST,
      data: {
        message: 'Email is already use',
      },
    })
  }
  try {
    const newUser = await users.createUser({ email, hash: password, name, sex })
    return res.status(HttpCode.CREATED).json({
      statusMessage: 'Ok',
      status: HttpCode.CREATED,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (err) {
    let statusError = null
    if (err.name === 'ValidationError') {
      statusError = HttpCode.Unprocessable_Entity
    } else {
      statusError = HttpCode.INTERNAL_SERVER_ERROR
    }
    return res.status(statusError).json({
      statusMessage: 'Error',
      status: statusError,
      data: {
        message: err.message,
      },
    })
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await users.findByEmail(email)
  if (!user || !user.validPassword(password)) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      statusMessage: 'Error',
      status: HttpCode.UNAUTHORIZED,
      data: {
        message: 'Invalid credentials',
      },
    })
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await user.update({ token })
  return res.status(HttpCode.OK).json({
    statusMessage: 'Ok',
    status: HttpCode.OK,
    data: {
      token,
    },
  })
}

const logout = async (req, res, next) => {
  const { id } = getPayloadFromBearToken(req)
  const user = await users.findById(id)
  await user.updateOne({ token: null })
  return res.status(HttpCode.NO_CONTENT).json({
    statusMessage: 'Ok',
    status: HttpCode.NO_CONTENT,
  })
}

module.exports = {
  reg,
  login,
  logout,
}
