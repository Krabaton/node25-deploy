const Cats = require('../schemas/cat')

const getAllCats = async ({ id, limit, skip, sortBy, sortByDesc, filter }) => {
  let sortCriteria = null

  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 }
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 }
  }

  const total = await Cats.find({ owner: id }).countDocuments()

  let _cats = Cats.find({ owner: id })
  if (filter && filter.length) {
    _cats = _cats.select(filter.split('|').join(' '))
  }
  _cats = _cats
    .populate({
      path: 'owner',
      select: 'email name sex -_id',
    })
    .skip(skip)
    .limit(limit)
    .sort(sortCriteria)

  return { total, cats: await _cats }
}

const getCatById = (id) => {
  return Cats.findOne({ _id: id })
}

const createCat = (cat, id) => {
  return Cats.create({ ...cat, owner: id })
}

const updateCat = (cat, id) => {
  return Cats.findByIdAndUpdate({ _id: id }, { ...cat }, { new: true })
}

const deleteCat = (id) => {
  return Cats.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
}
