const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["sweet","sour","spicy"]
        
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    num_sales:{
        type:Number,
        required:true
    }

})

const menu = mongoose.model('menu',menuSchema);
module.exports = menu;