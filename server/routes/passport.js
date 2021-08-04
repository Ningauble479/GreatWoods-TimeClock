var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const db = require('../models/users')

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
function(username, password, done) {
    // When a user tries to sign in this code runs
    db.findOne({userName: username}).then((user, err)=>{
        if(!user) return done(null, false, {message: "Incorrect username."});
        else if(user){
            bcrypt.compare(password, user.password, function (err, check){
                if(check == false) return done(null, false, {message: "Incorrect password."});
                return done(null, user)
            })
        }
    })
}
))
  
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('test')
    console.log(obj)
  done(null, obj);
});
  

// Exporting our configured passport
module.exports = passport