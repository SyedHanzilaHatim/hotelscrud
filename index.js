const express = require('express');
const app = express();
const db = require("./db")
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const person = require('./models/person')
const menu = require('./models/menu');
require('dotenv').config();
const PORT = process.env.PORT || 5000 
const passport = require('./auth')
const LocalStrategy = require('passport-local').Strategy;

const LogRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made To : ${req.originalUrl}`)
     next();
}

app.use(LogRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false})

app.get("/", function (req, res) {
    res.send("App Started!, Welcome To my Resturant")
    console.log("Server Started!")
})


// Impoting Person routes
const personRoutes = require('./routes/personRoutes')
app.use("/person", personRoutes)

// Importing Menu Routes
const menuRoutes = require('./routes/menuRoutes')
app.use("/menu", menuRoutes)



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});
