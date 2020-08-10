const { HttpCode } = require('../helpers/constants')
const { query, body, param, validationResult } = require('express-validator')

const validation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({ err: errors.array() })
  }
  next()
}

const validateCat = [body('name').isString(), body('age').isNumeric()]
const validateParam = [param('id').isMongoId()] // MonogDB

module.exports = {
  validateCreate: [...validateCat, validation],
  validateUpdate: [...validateParam, ...validateCat, validation],
  validateDelete: [...validateParam, validation],
  validateGetId: [...validateParam, validation],
}
