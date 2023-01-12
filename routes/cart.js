const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.render('cart', { message: req.flash('message'), login: false })
})

module.exports = router