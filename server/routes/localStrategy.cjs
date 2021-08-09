const passport = require('passport') 
const Strategy = require('passport-local').Strategy();
const bcrypt = require('bcryptjs')
const db = require('../models/users.js')

const localStrategy = () => {
passport.use(new Strategy(
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
  ))}

module.exports = localStrategy;