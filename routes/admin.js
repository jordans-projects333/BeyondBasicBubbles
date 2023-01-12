const express = require('express')
require('dotenv').config()
const path = require('path')
const passport = require('passport')
const router = express.Router()

router.get("/", checkAuthenticted, (req, res) => {
    // res.sendFile('admin.css', {root: path.join(__dirname, '../admin')})
    res.render('admin', { message: req.flash('message'), login: true })
})

router.get("/customize", checkAuthenticted, (req, res) => {
    // res.sendFile('admin.css', {root: path.join(__dirname, '../admin')})
    res.render('customize', { message: req.flash('message'), login: true })
})

router.get("/newsletter", checkAuthenticted, (req, res) => {
    // res.sendFile('admin.css', {root: path.join(__dirname, '../admin')})
    res.render('newsletter', { message: req.flash('message'), login: true })
})

function checkAuthenticted(req, res, next){
    if(!req.isAuthenticated()) return res.redirect('/')
    if(req.user.email != process.env.ADMIN_EMAIL) return res.redirect('/profile')
    next()
}

module.exports = router