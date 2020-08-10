const express = require('express')
const router = express.Router()
const { reg, login, logout } = require('../../controllers/users')
const auth = require('../../helpers/auth')

router.post('/registration', reg)
router.post('/login', login)
router.post('/logout', auth, logout)

module.exports = router
