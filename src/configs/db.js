const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Connection String + Database name
    const uri = `${process.env.MONGODB_URI}all-data`
    const connection = await mongoose.connect(
      uri,
      {
        useNewUrlParser: true
      }
    )
    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
