const mongoose = require('mongoose')

const information = new mongoose.Schema(
  {
    'key-identifier': {
      type: String,
      required: [true, 'field is required'],
    },
    title: {
      type: String,
      required: [true, 'field is required'],
      minlength: [8, 'field min length is 8'],
      maxlength: [40, 'field max length is 40'],
    },
    description: {
      type: String,
      required: [true, 'field is required'],
    },
    reasons: [String],
  },
  { collection: 'information' }
)

const Information = mongoose.model('information', information)

module.exports = Information
