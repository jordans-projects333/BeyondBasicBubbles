const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
const serverConfig = require('../serverConfig.json');
const fs = require('fs')

async function updateProductPriority(productName, number){
    let findIt = await Product.findOne({name: productName})
    findIt.priority = number
    console.log(findIt)
    findIt.save()
}

async function updateProductAlternate(productName, hash){
    let findIt = await Product.findOne({name: productName})
    findIt.alternateImages = hash
    console.log(findIt)
    findIt.save()
}

async function updateProduct(productName, hash, active){
    // Product.findOneAndUpdate(
    //     {name: productName},  //filter
    //     {imageBlurHash: theHash}, //data to update
    //     { //options
    //       returnNewDocument: true,
    //       new: true,
    //       strict: false
    //     }
    //   )
    let findIt = await Product.findOne({name: productName})
    console.log(findIt)
    findIt.active = active
    findIt.imageBlurHash = hash
    findIt.save()
}
// updateProductPriority('Skull Bath Bomb gift set', 3)
// updateProduct('Skull Bath Bomb gift set', 'UQF#tXx@_JpIVWnjX8Rj#*R%nQR*s:s;oaW=', true)
// updateProductAlternate('Skull Bath Bomb gift set', 
//     [
//         'UQNH+xNHKbEexuw}S1Sdy,Rj%2$*=fOSaxxH',
//         'USM%Zc%#_Mo}-qt8oxWB~nkCIWeoX4W-RRn%',
//         'ULHmvQyV?^tlD~n5XLV@:6nnVsNZt7W-Ipoc',
//         'UXL;1:M|?aSiyGWCozWF?ao}IpWC%ekCWCkC',
//         'UGHdR8xu^~X*y_$+=@O9},n,Q:n$I1bES$j]',
//         'UKIy@Wtk=@TD9:jES^jG{1WVnCrxY2owR%XP'
//     ])
// updateProductPriority('Cauldron bath bomb and bracelet gift set', 4)
// updateProduct('Cauldron bath bomb and bracelet gift set', 'UaKw:_9v^+^*8_oft7M|?wr;R*NfI?oxWBjG', true)
// updateProductAlternate('Cauldron bath bomb and bracelet gift set', 
//     [
//         'UaJuGr%N~qnhITWCt8V@~pV@D*bb9FofWXt7',
//         'UZN117-;?dMy01oc%1ajofWEM{s+-:WFIos*',
//         'UJI=DP_NWB%LE3M_n~Rk9FV?R.IURjbc%Max',
//         'UNJ*q}%h_4-n00Ri%MWC_NxCD%IrMwWXR-t6',
//         'UfLEQY%M_4i{IVWBRis:?bjGIUSf-:jGRoW;',
//         'UKHxmP9F_N9Z014.sloJ8wr;ofkDM|?vX9Rj',
//         'USLXMa_Nx^jF?bIUo0t7kXj?%1M|kDoHRjbJ',
//         'UFIE-3T#?H^M~qkCM{xa.A=tIo9u%MxaxaS$'
//     ])
// updateProductPriority('4x Bath Bomb Gift Set', 5)
// updateProduct('4x Bath Bomb Gift Set', 'UXIOqvx9%|F#-hwdI^t+}nrptQV@nVNZnhs=', true)
// updateProductAlternate('4x Bath Bomb Gift Set', 
//     [
//         'UEJRs|Y+4R1P03qs+E%3TTIT@?}?.-k@PDIp',
//         'UMK^:D4TEuAAN4~XxsInypTJMe-VM_M{kX%M',
//         'UNKBq6Di~Ut-D4?cNGxu~SXSR:nOP9%M-=IA',
//         'UHL;jV4ey0Dz}i%zRrM#^f$PROTc03VX-PcC',
//         'U8D]@@00x:9v.QtRMz-o?^00rtDO%Qw@RhR:',
//         'UCIY5]rq-{0Oz-z;niAp00Rj~WW.5XK0tR$+',
//         'USNdBq4oO+,,t0%fSQRR~TV@whXToPM}wGbp',
//         'UbMj]o9Hx-roI9OXoNv~~TxsM}bdXo#-j=TJ'
//     ])
// updateProduct('4x Bath Bomb Gift Set', 'UXIOqvx9%|F#-hwdI^t+}nrptQV@nVNZnhs=', true)
// updateProductAlternate('4x Bath Bomb Gift Set', ['UEJRs|Y+4R1P03qs+E%3TTIT@?}?.-k@PDIp', 'UMK^:D4TEuAAN4~XxsInypTJMe-VM_M{kX%M', 'UNKBq6Di~Ut-D4?cNGxu~SXSR:nOP9%M-=IA', 'UHL;jV4ey0Dz}i%zRrM#^f$PROTc03VX-PcC', 'U8D]@@00x:9v.QtRMz-o?^00rtDO%Qw@RhR:', 'UCIY5]rq-{0Oz-z;niAp00Rj~WW.5XK0tR$+', 'USNdBq4oO+,,t0%fSQRR~TV@whXToPM}wGbp', 'UbMj]o9Hx-roI9OXoNv~~TxsM}bdXo#-j=TJ'])

// const mainProduct = 'What-On-Earth-Bath-Bombs'
// const numberOfalternates = 3

// try {
//     console.log('trying')
//     const newFile = sharp(`./public/images/products/${mainProduct}/${mainProduct}.jpg`).webp({quality: 90}).resize( 500, 500, {fit: 'fill'})
//     .toFile(`./public/images/products/${mainProduct}/${mainProduct}--500.webp`)
//     console.log(newFile)
//     console.log('boi')
// } catch (error) {
//     console.log(error, 'nooo')
// }
// try {
//     console.log('trying')
//     const newFile = sharp(`./public/images/products/${mainProduct}/${mainProduct}.jpg`).webp({quality: 70}).resize( 200, 200, {fit: 'fill'})
//     .toFile(`./public/images/products/${mainProduct}/${mainProduct}--200.webp`)
//     console.log(newFile)
//     console.log('boi')
// } catch (error) {
//     console.log(error, 'nooo')
// }
// for(let i = 0; i < numberOfalternates; i++){
//     try {
//         console.log('trying')
//         const newFile = sharp(`./public/images/products/${mainProduct}/alternate_${i + 1}.jpg`).webp({quality: 90}).resize( 600, 400, {fit: 'fill'})
//         .toFile(`./public/images/products/${mainProduct}/galleryAlternative_${i + 1}--600.webp`)
//         console.log(newFile)
//         console.log('boi')
//     } catch (error) {
//         console.log(error, 'nooo')
//     }
//     try {
//         console.log('trying')
//         const newFile = sharp(`./public/images/products/${mainProduct}/alternate_${i + 1}.jpg`).webp({quality: 70}).resize( 300, 200, {fit: 'fill'})
//         .toFile(`./public/images/products/${mainProduct}/galleryAlternative_${i + 1}--300.webp`)
//         console.log(newFile)
//         console.log('boi')
//     } catch (error) {
//         console.log(error, 'nooo')
//     }
// }

const monthSt = [1,21,31]
const monthNd = [2,22,]
const monthRd = [3,23]
const monthTh = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,,24,25,26,27,28,29,30]
var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

router.post("/", async (req, res) => {
//     serverConfig.currentNumberOFActiveProducts = 25
// fs.writeFile('serverConfig.json', JSON.stringify(serverConfig, null, 2), err => {
//     if (err) return console.log(err);
    
//     console.log('writing to ' + 'serverConfig.json');
//   });

    // console.log(req.body)
    // let customDate = '31st Dec, 2022'
    // let customName = 'Eleanor'
    // let yourDate = new Date()
    // const offset = yourDate.getTimezoneOffset()
    // yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    // let dateString = yourDate.toISOString().split('T')[0]
    // let monthValue = parseInt(dateString.substring(5, 7))
    // monthValue = months[monthValue - 1];
    // let yearValue = dateString.substring(0, 4)
    // let dateValue = parseInt(dateString.substring(9, 11))
    // dateValue = findDateEnding(dateValue)
    // let reviewDate = `${dateValue} ${monthValue}, ${yearValue}`
    // console.log(reviewDate)
    // let getProduct = await Product.findOne({name: 'Skull Bath Bomb gift set'})
    // let reviewVar = {
    //     date: customDate,
    //     name: customName,
    //     reviewContent: req.body.reviewContent,
    //     rating: req.body.rating,
    //     id: uuidv4()
    // }
    // console.log(reviewVar)
    // getProduct.reviews.unshift(reviewVar)
    // getProduct.save()
})

function findDateEnding(dateValue){
    if(monthSt.includes(dateValue))return dateValue+'st'
    if(monthNd.includes(dateValue))return dateValue+'nd'
    if(monthRd.includes(dateValue))return dateValue+'rd'
    if(monthTh.includes(dateValue))return dateValue+'th'
}

module.exports = router