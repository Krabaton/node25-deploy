const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for cat'],
    },
    age: {
      type: Number,
      min: 1,
      max: 20,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const Cat = mongoose.model('cat', catSchema)

module.exports = Cat
