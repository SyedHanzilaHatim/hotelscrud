const mongoose = require('mongoose');
const  mongoURL =  'mongodb://127.0.0.1:27017/users'

mongoose.connect(mongoURL)
const db = mongoose.connection;


db.on("connected",()=>{
    console.log("Conneted to MongoDB Server")
})

db.on("error", (err)=>{
    console.log("MongoDB Connection error" , err)

})

db.on("disconnected", ()=>{
    console.log("MongoDB Server Disconnecter")
})


module.exports = db;