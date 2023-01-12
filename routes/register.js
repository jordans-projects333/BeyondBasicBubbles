const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const Profile = require('../models/profile')

router.post("/", async (req, res, next) => {
    try {
        if(validateEmail(req.body.email) == null){
            req.flash('message', 'Not a valid email')
                res.redirect('/')
                return
        }
        if(req.body.password.length <= 5){
            req.flash('message', 'Not a valid password')
                res.redirect('/')
                return
        }
        try {
            const alreadyExists = await Profile.exists({ email: req.body.email })
            const alreadyExistsName = await Profile.exists({ email: req.body.name })
            if(alreadyExists !== null){
                req.flash('message', 'Email already exists')
                res.redirect('/')
            }else if(alreadyExistsName !== null){
                req.flash('message', 'Name already in use')
                res.redirect('/')
            }else{
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const profile = new Profile({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                try {
                    await profile.save()
                } catch (error) {
                    console.log(error)
                }
                passport.authenticate('local', {
                    successRedirect: '/profile',
                    failureRedirect: '/',
                    failureFlash: true
                })(req, res, next)
            }
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        req.flash('message', 'Failed to validate')
        res.redirect('/' )
        console.log(error)
    }
})

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

module.exports = router