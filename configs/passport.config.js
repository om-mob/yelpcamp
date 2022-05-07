const localStrategy = require("passport-local");
const User = require('../models/user')

// passport configurations. Runs Only on the first app Run!!! (Not a middleware!!! Doesn't Run with Every Request!)
function initialize(passport) {
  passport.use(new localStrategy(User.authenticate())); // strategy used to authenticate AND authentication fn
  passport.serializeUser(User.serializeUser()); // serialize and deserialize model (is it always user OR it is because the model is called User)
  passport.deserializeUser(User.deserializeUser());
}
/* 
[User.authenticate(), User.serializeUser(), User.deserializeUser()]
These functions/methods Came from passport-local Mongoose. Usually you write them urself in passport.config.js file.
Check out Kyle's video "Node.js Passport Login System Tutorial" to see an example implementation.
*/

module.exports = initialize
