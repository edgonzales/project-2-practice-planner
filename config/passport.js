const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy; // <- notice its capitalized, its a class!
const UserModel = require("../models/user");

passport.use(
  new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    // The verify callback function

    // THIS FUNCTION OCCURS AFTER THE USER LOGINS with GOOGLE!
    async function (accessToken, refreshToken, profile, cb) {
      let user = await UserModel.findOne({ googleId: profile.id });
      if (user) return cb(null, user);

      try {
        user = await UserModel.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value, // array of objects from google
          avatar: profile.photos[0].value, // array of objects from google
        });
        return cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
  try {
    const userDoc = await UserModel.findById(userId);
    cb(null, userDoc)
  } catch (err) {
    cb(err)
  }
})