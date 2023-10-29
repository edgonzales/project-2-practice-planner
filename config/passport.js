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
		console.log(profile)
	  // cb function signature below
	  // cb(error, dataYouWantToGiveToPassport)		
	  // if there is an error just pass the error as the first argument
	  // cb(err)
	  // if no error pass in null then the data you want to give to passport
	  // cb(null, dataYouWantToPassToPassportGoesHere)

      // a user has logged in with OAuth...

      // IMPLEMENT THIS LOGIC!

      // Check if the user has logged in before in our app,
      // Search our User's collection in mongodb and see if any user has the google id
      // which value is called profile.id
      let user = await UserModel.findOne({ googleId: profile.id });
      // UserModelFindOne, will either return the userDocument that contatins
      // that googleId or it will return undefined!
	
      // if we have the user pass the users information to passport middleware
      if (user) return cb(null, user);//cb(null, user); the next function is serializeUser to put the id of the user
	  // in the cookie	
		


	  /// WE DON"T HAVE A USER THIS CODE RUNS!
   
      // otherwise if user undefined, Create that User in our database
      // becuase its the first time loggin in to our app!
      try {
        user = await UserModel.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value, // array of objects from google
          avatar: profile.photos[0].value, // array of objects from google
        });

        // once we create the user, pass that user document to passport
        return cb(null, user);
	//	cb(null, user); the next function is serializeUser to put the id of the user
	// in the cookie	
      } catch (err) {
        cb(err);
      }
    }
  )
);


// This function is the one called after the callback function above
// cb(null, user)
passport.serializeUser(function (user, cb) {
	// it takes the user document from the cb(null, user),
	// attaching the user's mongodb id inside of of our session cookie
	// you can look at the cookie in the devtools application/cookies -> connect.sid <- this is the cookie 
	// the client sends every request to identify who they are and now inside of it is the users database id!
  cb(null, user._id);
});


//^^^ THis is the last thing that happens after a user logs in


// THis function below happens after the user logs 
// THis function happens on every single request from the client!
// open up the session cookie, (connect.sid)
// take the userId out of the cookie, and go to the database and find that users document
// then ATTACH the users document to req.user!!!!!! Which is availiable in all of our controller functions!
// and will be also in our views, (check out the res.locals code in the server)
passport.deserializeUser(async function(userId, cb){
	try {
		const userDoc = await UserModel.findById(userId);
		// This line of code below
		cb(null, userDoc) // <------- This is setting the user document to req.user = userDoc passes it 
		// to one of the controller functions!
	} catch(err){
		cb(err)
	}
})