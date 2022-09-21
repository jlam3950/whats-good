const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oidc").Strategy;
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //       callbackURL: "http://localhost:5500/google/callback",
  //       passReqToCallback: true
  //     }, 
  //     function(request, accessToken, refreshToken, profile, done) {
  //       // User.findOrCreate({ googleId: profile.id}, function (err, user){
  //         return done(null, profile);
  //         // return done(err,profile);
  //       }));
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
        };
        cb(err, userInformation);
      });
    });
    
    // passport.serializeUser((user, done) => {
    //   done(null, user);
    // });

    // passport.deserializeUser((user, done) => {
    //   // cb(null, user.id);
    //   done(null, user);
    // });
};
