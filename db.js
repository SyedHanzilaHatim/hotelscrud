const mongoose = require('mongoose');
require('dotenv').config()
//const  MONDO_URL_LOCAL =  process.env.MONGO_URL_LOCAL
const MONDO_URL = process.env.MONGO_URL
mongoose.connect(MONDO_URL);
const db = mongoose.connection;


db.on("connected",()=>{
    console.log("Conneted to MongoDB Server")
})

db.on("error", (err)=>{
    console.log("MongoDB Connection error" , err)

})

db.on("disconnected", (msg)=>{
    console.log("MongoDB Server Disconnected", msg)
})


module.exports = db;