const passport = require('passport');
const person = require('./models/person');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username,password, done )=>{
    try {
        // console.log("Received Credentials:", username,password);
        const user = await person.findOne({username:username});
        if (!user){
            return done(null,false,{message:"Incorrect username"})
        }
        const isPasswordMatch =await user.comparePassword(password) 
        if(isPasswordMatch){
            return done(null,user)
        }else{ 
            return done(null,false,{message:"Incorresct password"});
        }
    } catch (err) {
            return done(err);
    }

}));
module.exports = passport;