const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'something'],
      lowercase: [true, 'lowercase is required'],
      trim: true,
      required: [true, 'email is required']
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    fname: {
      type: String
    },
    lname: {
      type: String
    },
    role: {
      type: String
    },
    updated: {
      type: Date,
      default: null
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'users' }
)

const UsersSchema = mongoose.model('users', usersSchema)

module.exports = UsersSchema
