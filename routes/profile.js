require('dotenv').config()
const express = require('express')
const router = express.Router()

router.get("/", checkAuthenticted, (req, res) => {
    res.render('index', { message: req.flash('message'), login: true, name: req.user.name })
})

router.delete('/logout', (req, res)=> {
    req.logOut(function(err){
        if(err){return next(err)}
        res.redirect('/')
    })
})

function checkAuthenticted(req, res, next){
    if(!req.isAuthenticated()) return res.redirect('/')
    if(req.user.email == process.env.ADMIN_EMAIL) return res.redirect('/admin')
    next()
}

module.exports = router