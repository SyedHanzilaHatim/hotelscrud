const express = require('express');
const app = express();
const db = require("./db")
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const person = require('./models/person')
const menu = require('./models/menu');

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



app.listen(5000, () => {
    console.log("Listening on 911")
});
