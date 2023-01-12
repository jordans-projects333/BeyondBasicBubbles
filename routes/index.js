const express = require('express')
const router = express.Router()
const AdminData = require('../models/adminData')
const serverConfigs = require('../serverConfig.json')
require('dotenv').config()

router.get("/", checkNotAuthenticted, async (req, res) => {
    if(req.session.firstView != true){
        if(req.session.firstView != undefined){
            let compare = new Date()
            let compare2 = Date.parse(req.session.firstView)
            let timeCompare = (compare.getTime() - compare2) / (1000)
            if(timeCompare > 20){
                const getCurrentCount = await AdminData.findOne({})
                getCurrentCount.returningPageViewCount += 1
                getCurrentCount.save()
                req.session.firstView = true
            }
        }
        if(req.session.firstView == undefined){
            const getCurrentCount = await AdminData.findOne({})
            getCurrentCount.newPageViewCount += 1
            getCurrentCount.save()
            req.session.firstView = new Date()
        }
    }
    res.render('index', 
    { 
        message: req.flash('message'), 
        login: false,
        backgroundImage : serverConfigs.backgroundImage,
        galleryImages: serverConfigs.galleryImages,
        productTotal : serverConfigs.currentNumberOFActiveProducts,
        lastServerUpdate : serverConfigs.lastServerUpdate
    })
})

function checkNotAuthenticted(req, res, next){
    if(req.isAuthenticated() && req.user.email == process.env.ADMIN_EMAIL){
        return res.redirect('/admin')
    }else if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    next()
}

module.exports = router