const Users = require('../models/users.js')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const getProfile = async (req, res) => {
  try {
    const data = await Users.findOne({ email: req.user.email })
    if (!data) {
      return res.status(400).json({ success: false, message: 'Bad Request' })
    }
    const userData = { email: data.email, fname: data.fname, lname: data.lname, role: data.role }
    res.status(200).json({ success: true, data: userData })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Service Unavailable',
      error: error?.message ? error.message : 'Check source code',
    })
  }
}
const updateProfile = async (req, res) => {
  try {
    const data = { fname: req.body.fname, lname: req.body.lname, updated: new Date().toISOString() }
    await Users.findOneAndUpdate({ email: req.user.email }, data, { returnOriginal: false })
    res.status(200).json({ success: true, message: 'User data updated' })
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
const updatePassword = async (req, res) => {
  const currentPassword = req.body.password ? req.body.password : null
  if (!currentPassword) {
    return res.status(400).json({ success: false, message: 'Current password is required' })
  }
  const response = await Users.findOne({ email: req.user.email })
  if (!bcrypt.compareSync(currentPassword, response.password)) {
    return res.status(400).json({ success: false, message: 'Current password is invalid' })
  }
  const newPassword = req.body.newpassword ? req.body.newpassword : null
  if (!newPassword) {
    return res.status(400).json({ success: false, message: 'New password is required' })
  }
  if (currentPassword === newPassword) {
    return res.status(400).json({ success: false, message: 'Passwords are the same' })
  }
  const password = bcrypt.hashSync(newPassword, 10)
  await Users.findOneAndUpdate({ email: req.user.email }, { password: password })
  res.status(200).json({ success: true, message: 'Password was updated' })
}
const resetPassword = async (req, res) => {
  // TO-DO: how to reset user password by sending an email
}

module.exports = { getProfile, updateProfile, updatePassword }
