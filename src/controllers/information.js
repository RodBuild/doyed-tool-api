const mongoose = require('mongoose')
const Information = require('../models/information.js')

const getData = async (req, res) => {
  try {
    const identifier = req.params.identifier
    await Information.findOne({ 'key-identifier': identifier }, 'title description reasons')
      .then(async (data) => {
        res.status(200).json({ success: true, data: data })
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code',
    })
  }
}

const updateData = async (req, res) => {
  try {
    const data = req.body
    // Fix key-identifier
    data['key-identifier'] = data['key-identifier'].trim().replaceAll(' ', '-').toLowerCase()
    const identifier = req.body['key-identifier']
    if (!identifier) {
      return res
        .status(400)
        .json({ success: false, message: 'Bad Request', error: 'key-identifier value is needed on the body' })
    }
    const response = await Information.findOneAndUpdate({ 'key-identifier': identifier }, data, {
      runValidators: true,
      rawResult: true,
      new: true,
      upsert: true,
    })
    res.status(200).json({
      success: true,
      message: response?.lastErrorObject?.updatedExisting
        ? `Found and updated the entry with identifier: ${identifier}`
        : `Created a new entry with identifier: ${identifier}`,
    })
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
      error: error?.message ? error.message : 'Check source code',
    })
  }
}

module.exports = { getData, updateData }
