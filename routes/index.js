const express = require('express')
const router = express.Router()
const { ensureAuth , ensureGuest} = require('../middleware/auth')
const Helps = require('../models/Helps')


router.get('/',ensureGuest, (req,res)=>{
    res.render('login',{layout:'login'})
})

router.get('/dashboard',ensureAuth,async (req,res)=>{
    try {
        const helpsPosted = await Helps.find({user:req.user.id}).lean()
        res.render('dashboard',{
            fname: req.user.firstName,
            helpsPosted,
        })

    }catch (err){
        console.error(err)
        res.render('/error/500')
         

    }
    // res.render('dashboard',{
    //     fname:req.user.firstName,
    // })

})

module.exports = router