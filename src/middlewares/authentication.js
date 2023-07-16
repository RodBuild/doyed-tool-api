const jwt = require('jsonwebtoken')
const Users = require('../models/users.js')

const loginRequired = (req, res, next) => {
  try {
    const token = req.cookies.doyed_access_token
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { email: data.email, role: data.role }
    next()
  } catch (error) {
    res
      .status(500)
      .json({ message: 'authenticaion failed', error: error?.message ? error.message : 'Check source code' })
  }
}

const accountExists = async (req, res, next) => {
  try {
    const results = await Users.find({ email: req.body.email })
    if (results.length !== 0) {
      return res.status(500).json({ message: 'email already in used' })
    }
    next()
  } catch (error) {
    res
      .status(500)
      .json({ message: 'authenticaion failed', error: error?.message ? error.message : 'Check source code' })
  }
}

module.exports = { loginRequired, accountExists }
