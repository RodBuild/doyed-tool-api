const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['multiple', 'radio', 'input', 'checkbox'],
      default: 'multiple',
    },
    title: {
      type: String,
      required: [true, 'field is required'],
      minlength: [5, 'field min length is 5'],
      maxlength: [60, 'field max length is 60'],
    },
    data: [
      {
        question: String,
        answers: [
          {
            text: String,
            points: Number,
          },
        ],
      },
    ],
  },
  { collection: 'quote' }
)

const QuoteSchema = mongoose.model('quote', quoteSchema)

module.exports = QuoteSchema
