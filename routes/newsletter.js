const express = require('express')
const Newsletter = require('../models/newsletterEmails')
const router = express.Router()

router.post("/", async (req, res) => {
    if(validateEmail(req.body.newsletterEmail) != null){
        const alreadyExistsEmail = await Newsletter.exists({ email: req.body.newsletterEmail })
        if(alreadyExistsEmail == null){
            const email = new Newsletter({
                email: req.body.newsletterEmail,
            })
            try {
                await email.save()
            } catch (error) {
                console.log(error)
            }
        }
    }
})

router.post("/getData", checkAuthenticted, async (req, res) => {
    let newsletterData = await Newsletter.find({}).select('email -_id')
    res.json({ newsletterData })
})

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkAuthenticted(req, res, next){
    if(!req.isAuthenticated()) return res.redirect('/')
    if(req.user.email != 'jordanroberts333@icloud.com') return res.redirect('/profile')
    next()
}

module.exports = router