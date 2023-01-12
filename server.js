if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const passport = require('passport')
require('./passport-config')(passport)
const session = require('express-session')
const mongoose = require('mongoose')
const express = require('express')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const Product = require('./models/product')
const fs = require('fs')

const indexRouter = require('./routes/index')
const galleryRouter = require('./routes/gallery')
const cartRouter = require('./routes/cart')
const reviewRouter = require('./routes/review')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const adminRouter = require('./routes/admin')
const addProductRouter = require('./routes/editProducts')
const getProductsRouter = require('./routes/getProducts')
const newsletterRouter = require('./routes/newsletter')



// alternate_1.jpg
// async function updatingThe(){
//     let yyy = await Product.findOne({name: 'Ocean Vibes Bath Bombs'})
//         yyy.alternateImages = 3
//         await yyy.save()
// }
// updatingThe()

/////////////////////////////////////////////////////////
const app = express()
mongoose.connect(process.env.DATABASE_URL, ()=> {console.log('Database connected')}, e => console.log(e))

app.set('view engine', 'ejs')

app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.error = req.flash('error')
    next()
})

app.get("/bubble", (req, res) => {
    res.render('bubble', { message: req.flash('message'), login: false })
})

app.use('/', indexRouter)
app.use('/gallery', galleryRouter)
app.use('/cart', cartRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/admin', adminRouter)
app.use('/review', reviewRouter)
app.use('/editProducts', addProductRouter)
app.use('/getProducts', getProductsRouter)
app.use('/newsletter', newsletterRouter)

app.use(express.static('public'))

app.listen(process.env.PORT || 3000, console.log('listening on port 3000'))