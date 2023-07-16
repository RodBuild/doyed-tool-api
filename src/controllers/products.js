const Products = require('../models/products.js')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
  try {
    await Products.find()
      .then((products) => {
        res.status(200).json({ success: true, data: products })
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code'
    })
  }
}
const getProduct = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id) === true) {
      return res.status(400).json({ success: false, message: 'Bad Request', error: 'Passed id is invalid' })
    }
    await Products.findById(id)
      .then((product) => {
        res.status(200).json({ success: true, data: product })
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code'
    })
  }
}
const createProduct = async (req, res) => {
  try {
    const product = new Products(req.body)
    await product.save()
    res.status(200).json({ success: true, data: product._id })
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message
      })
      return res.status(400).json({ success: false, message: 'Bad Request', error: errors })
    }
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code'
    })
  }
}
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id) === true) {
      return res.status(400).json({ success: false, message: 'Bad Request', error: 'Passed id is invalid' })
    }
    const body = req.body
    const response = await Products.findByIdAndUpdate(id, body, { runValidators: true, new: true, rawResult: true })
    res
      .status(200)
      .json({ success: true, data: response.value ? response.value : 'Passed id does not match existing entries' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message
      })
      return res.status(400).json({ success: false, message: 'Bad Request', error: errors })
    }
    // When body contains values that cannot update the entry
    if (error.name === 'TypeError') {
      return res
        .status(400)
        .json({ success: false, message: 'Bad Request', error: 'Request body has no valid values to update the entry' })
    }
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code'
    })
  }
}
const removeProduct = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id) === true) {
      return res.status(400).json({ success: false, message: 'Bad Request', error: 'Passed id is invalid' })
    }
    const response = await Products.findByIdAndDelete(id, { rawResult: true })
    res
      .status(200)
      .json({ success: true, data: response.value ? response.value : 'Passed id does not match existing entries' })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code'
    })
  }
}

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, removeProduct }
