const express = require('express')
const router = express.Router()
const { ensureAuth , ensureGuest} = require('../middleware/auth')
const Help = require('../models/Help')


router.get('/',ensureGuest, (req,res)=>{
    res.render('login',{layout:'login'})
})

router.get('/dashboard',ensureAuth,async (req,res)=>{
    try {
        const helps = await Help.find({user:req.user.id}).lean()
        res.render('dashboard',{
            fname: req.user.firstName,
            helps,
        })

    }catch (err){
        console.error(err)
        res.render('/errors/500')
         

    }
    // res.render('dashboard',{
    //     fname:req.user.firstName,
    // })

})

module.exports = router