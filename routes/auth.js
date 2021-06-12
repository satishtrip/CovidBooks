const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc Authorisation with google
//@rout GET /auth/google

router.get('/google', passport.authenticate('google', {scope:['profile']}))

//google auth callback
//route = get/

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard')
    }
  )
  

//   // @desc    Logout user
//   // @route   /auth/logout
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
  
//@ logout user /auth/logout


module.exports = router