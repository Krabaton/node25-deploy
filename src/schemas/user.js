const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: 'Guest',
    },
    sex: {
      type: String,
      enum: {
        values: ['m', 'f'],
        message: 'But it not allowed',
      },
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      },
    },
    hash: {
      type: String,
      required: [true, 'Password required'],
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre('save', function () {
  this.hash = bcrypt.hashSync(this.hash, bcrypt.genSaltSync(10), null)
})

// userSchema.path('email').validate(function (value) {
//   const re = /\S+@\S+\.\S+/
//   return re.test(String(value).toLowerCase())
// })

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

const User = mongoose.model('user', userSchema)

module.exports = User
