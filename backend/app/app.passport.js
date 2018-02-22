const winston = require('winston');

const LocalStrategy = require('passport-local').Strategy;

const User = require('./components/user/user.model');

//const dbConfig = require('./config/db')['mongo'][process.env.NODE_ENV || 'dev'];

module.exports = (passport) => {
  passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
    User.findOne({email: username}, (err, user) => {
      if (err) {
        winston.error(`Error Passport LocalStrategy authenticating user with email ${email}`)
        return done(err);
      } else if (!user) {
        winston.debug(`User with email ${username} not found in DB`);
        return done(null, false, { message: 'User not found'});
      } else {
        winston.debug(`User with email ${username} found in DB`);
        return done(null, user);
      }
    });
  }));
};
