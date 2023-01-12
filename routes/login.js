const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post("/", async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})

module.exports = router