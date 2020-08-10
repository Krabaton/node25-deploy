const User = require('../schemas/user')

const findById = async (id) => {
  return User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return User.findOne({ email })
}

const createUser = async ({ email, hash, name, sex }) => {
  const user = new User({ email, hash, name, sex })
  return user.save()
}

module.exports = { findById, findByEmail, createUser }
