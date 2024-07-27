const mongoose = require('mongoose');
//const  mongoURL =  'mongodb://127.0.0.1:27017/users'
const  mongoURL= 'mongodb+srv://syedhanzilahatim:hatim3402@cluster0.rjuax50.mongodb.net/'
mongoose.connect(mongoURL);
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