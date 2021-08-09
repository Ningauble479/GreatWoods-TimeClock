const passport = require('passport')
require('./localStrategy.cjs')
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
const passportConfig = (app) => {
  app.use(passport.initialize)
  app.use(passport.session)
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
}); }

module.exports = passportConfig
  

// Exporting our configured passport