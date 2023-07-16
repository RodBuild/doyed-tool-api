const Users = require('../models/users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
  try {
    const newUser = new Users({
      email: req.body.email ? req.body.email : null,
      password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : null,
      role: 'customer',
    })
    await newUser.save()
    res.status(200).json({ success: true, message: `account created` })
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
const userLogin = async (req, res) => {
  try {
    const email = req.body.email ? req.body.email : null
    const password = req.body.password ? req.body.password : null
    const response = await Users.findOne({ email: email })
    if (!response || !password || (password && !bcrypt.compareSync(password, response.password))) {
      return res.status(404).json({ success: false, message: `account not found` })
    }
    const token = await jwt.sign({ email: response.email, role: response.role }, process.env.JWT_SECRET, {
      expiresIn: 15 * 60, // 15 minutes
    })
    res
      .cookie('doyed_access_token', token, {
        secure: false, // localhost: false | prod: true
        expires: new Date(Date.now() + 900000), // 15 minutes
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, message: `user is logged in`, token: token })
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

const userLogout = async (req, res) => {
  const token = req.cookies.doyed_access_token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  res.clearCookie('doyed_access_token').status(200).json({ success: true, message: `user is logged out` })
}

module.exports = { userRegister, userLogin, userLogout }
