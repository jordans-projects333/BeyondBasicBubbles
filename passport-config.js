const bcrypt = require('bcrypt')
const Profile = require('./models/profile')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // Match user
            Profile.findOne({ email: email })
            .then(user => {
                // cant find email
                if(!user){
                    // error, user, options
                    return done(null, false, {message: 'That email is not registered'})
                }
                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err
                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(null, false, {message: 'password is incorrect'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    // store user id session
    passport.serializeUser((user, done) =>  done(null, user.id))
    passport.deserializeUser((id, done) => { 
        Profile.findById(id, function(err, user){
            done(err, user)
        })
    })
}