const express = require('express')
const router = express.Router()
const {
  get,
  getById,
  create,
  update,
  remove,
} = require('../../controllers/cats')
const auth = require('../../helpers/auth')
const {
  validateGetId,
  validateCreate,
  validateUpdate,
  validateDelete,
} = require('../../validation/validation-cats')

router
  .get('/', get)
  .get('/:id', auth, validateGetId, getById)
  .post('/', auth, validateCreate, create)
  .put('/:id', auth, validateUpdate, update)
  .delete('/:id', auth, validateDelete, remove)

module.exports = router
