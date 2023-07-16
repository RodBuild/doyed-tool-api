const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'field is required'],
      minlength: [8, 'field min length is 8'],
      maxlength: [30, 'field max length is 20']
    },
    picture: String,
    type: {
      type: String,
      required: [true, 'field is required'],
      minlength: [3, 'field min length is 3'],
      maxlength: [30, 'field max length is 30']
    },
    'description-short': {
      type: String,
      required: [true, 'field is required'],
      minlength: [10, 'field min length is 10'],
      maxlength: [50, 'field max length is 50']
    },
    'description-long': {
      type: String,
      required: [true, 'field is required'],
      minlength: [10, 'field min length is 10'],
      maxlength: [100, 'field max length is 100']
    },
    'avg-price': {
      type: String,
      required: false,
      minlength: [1, 'field min length is 1'],
      maxlength: [20, 'field max length is 20']
    },
    'estimate-questions': [
      {
        type: String,
        required: [false, 'field is required'],
        minlength: [5, 'field min length is 5'],
        maxlength: [60, 'field max length is 60']
      }
    ]
  },
  { collection: 'products' }
)

const ProductsSchema = mongoose.model('products', productsSchema)

module.exports = ProductsSchema
