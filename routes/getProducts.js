const express = require('express')
const Product = require('../models/product')
const router = express.Router()
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
const client = redis.createClient(REDIS_PORT)

router.post("/", async (req, res) => {
    try {
        client.setEx('product1', 30, 'bath bomb')
    } catch (err) {
        console.log(err)
    }
    const product = await Product.findOne({priority : (req.body.index + 1)}).select('name price categories imageBlurHash priority -_id')
    res.json({ product })
})

router.post("/addInfo", async (req, res) => {
    const getInfo = await Product.findOne({name: req.body.titleData}).select('description alternateImages -_id')
    const name = req.body.titleData
    res.json({ getInfo, name })
})

module.exports = router