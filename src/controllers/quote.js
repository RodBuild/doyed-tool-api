const Quote = require('../models/quote.js')
const mongoose = require('mongoose')

const getQuoteQuestions = async (req, res) => {}

const getQuoteEstimate = async (req, res) => {}

const createQuoteQuestion = async (req, res) => {
  try {
    const quoteQuestion = new Quote(req.body)
    await quoteQuestion.save()
    res.status(200).json({ success: true, data: quoteQuestion._id })
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
      error: error?.message ?? 'Check source code',
    })
  }
}

const updateQuoteQuestion = async (req, res) => {}

const deleteQuoteQuestion = async (req, res) => {}

module.exports = { getQuoteQuestions, getQuoteEstimate, createQuoteQuestion, updateQuoteQuestion, deleteQuoteQuestion }
