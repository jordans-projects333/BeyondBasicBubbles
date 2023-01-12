const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uploadPath = path.join('public', '/images/products')
const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: async function (req, file, cb) {
        let str = req.body.name
        str = str.replace(/\s/g, '-')
        cb(null, str + '.jpg')
        }
    });
const upload = multer({ //multer settings
    storage: storage,
    fileFilter: async function(req, file, callback) {
        let checkIfExists = await Product.find({"name": req.body.name})
        if(checkIfExists.length != 0 && req.body.originalName != req.body.name){
            return callback(null, false)
        }
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(null, false)
        }
        callback(null, true)
    },
})
const Product = require('../models/product')
const router = express.Router()

router.post('/add' ,checkAuthenticted, upload.single('product'), async (req, res) => {
    let checkIfExists = await Product.find({"name": req.body.name})
    if(checkIfExists.length == 0){
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categories: [req.body.categories],
            priority: req.body.priority
        })
        try {
            console.log('saving')
            await newProduct.save()
        } catch (error) {
            console.log(error)
        }
        res.json({ message: true })
    }
})

router.post('/edit', checkAuthenticted, upload.single('product'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const priceFilter = { name: req.body.originalName };
    const priceUpdate = { price: req.body.price };
    try {
        await Product.findOneAndUpdate(priceFilter, priceUpdate);
    } catch (error) {
        console.log(error)
    }
    // Change name, adjust image
    let checkIfExists = await Product.find({"name": req.body.name})
    if(checkIfExists.length == 0 && req.body.originalName != req.body.name){
        const nameFilter = { name: req.body.originalName };
        const nameUpdate = { name: req.body.name };
        try {
            await Product.findOneAndUpdate(nameFilter, nameUpdate);
            let str = req.body.originalName
            str = str.replace(/\s/g, '-')
            if(fileName == null){
                let str2 = req.body.name
                str2 = str2.replace(/\s/g, '-')
                fs.rename(__dirname + `/../public/images/products/${str}.jpg`, __dirname + `/../public/images/products/${str2}.jpg`, function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
            }else{
                fs.unlink(__dirname + `/../public/images/products/${str}.jpg`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
        res.json({ message: true })
    }
})

router.post('/delete', checkAuthenticted, async (req, res) => {
    try {
        await Product.deleteOne({ name: req.body.name})
        let str = req.body.name
        str = str.replace(/\s/g, '-')
        fs.unlink(__dirname + `/../public/images/products/${str}.jpg`, (err) => {
            if (err) {
                throw err;
            }
        });
    } catch (error) {
        console.log(error)
    }
    res.json({ message: true })
})

function checkAuthenticted(req, res, next){
    if(!req.isAuthenticated()) return res.redirect('/')
    if(req.user.email != 'jordanroberts333@icloud.com') return res.redirect('/profile')
    next()
}

module.exports = router