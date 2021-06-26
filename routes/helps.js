const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Help = require('../models/Help')

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('helps/add')
})

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Help.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500') 
  }
})

// @desc    Show all helps posted
// @route   GET /helps
router.get('/', ensureAuth, async (req, res) => {
  try {
    const helps = await Help.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('helps/index', {
      helps,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})





module.exports = router 