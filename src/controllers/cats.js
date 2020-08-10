const { cats } = require('../repository')
const { HttpCode } = require('../helpers/constants')
const { getPayloadFromBearToken } = require('../helpers/getpayload')

const get = async (req, res) => {
  try {
    const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = req.query

    const { id = null } = getPayloadFromBearToken(req)

    const options = {
      id,
      sortBy,
      sortByDesc,
      filter,
      limit: parseInt(limit),
      skip: parseInt(skip),
    }
    const { total, cats: data } = await cats.getAllCats(options)
    return res.status(HttpCode.OK).json({
      statusMessage: 'Ok',
      status: HttpCode.OK,
      total: total,
      data,
    })
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    })
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const cat = await cats.getCatById(id)
    if (!cat) {
      return res.status(HttpCode.NOT_FOUND).json({ err: 'Cat not found' })
    } else {
      return res.status(HttpCode.OK).json(cat)
    }
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    })
  }
}

const create = async (req, res) => {
  try {
    const { id } = getPayloadFromBearToken(req)
    const cat = await cats.createCat(req.body, id)
    return res.status(HttpCode.CREATED).json(cat)
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const cat = await cats.updateCat(req.body, id)
    if (!cat) {
      return res.status(HttpCode.NOT_FOUND).json({ err: 'Cat not found' })
    } else {
      return res.status(HttpCode.OK).json(cat)
    }
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const cat = await cats.deleteCat(id)
    if (!cat) {
      return res.status(HttpCode.ACCEPTED).json({})
    } else {
      return res.status(HttpCode.OK).json(cat)
    }
  } catch (e) {
    return res.status(HttpCode.BAD_REQUEST).json({
      err: HttpCode.BAD_REQUEST,
      message: e.message,
    })
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}
