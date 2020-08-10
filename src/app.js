const express = require('express')
const cors = require('cors')
const app = express()
const { HttpCode } = require('./helpers/constants')

const routerCats = require('./routes/cats')
const routerAuth = require('./routes/auth')

app.use(cors())
app.use(express.json({ limit: '25kb' }))
app.use(express.urlencoded({ extended: false }))

require('./config/passport')
app.use('/api/auth', routerAuth)
app.use('/api/cats', routerCats)

app.use(function (req, res, next) {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ err: HttpCode.NOT_FOUND, message: 'Use API /api/cats' })
})

app.use(function (err, req, res, next) {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({ err: HttpCode.INTERNAL_SERVER_ERROR, message: err.message })
})

module.exports = app
