const express = require('express');
const router = express.Router();
const menu = require('../models/menu')


router.post("/",async(req,res)=>{
    try {
        const menudata = req.body;
        const newmenu = new menu(menudata)
        const menudataresponse = await newmenu.save()
        console.log("Menu Data Saved")
        res.status(200).json(menudataresponse)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
            
    }
})
// getting menu data
router.get("/",async(req,res)=>{
    try {
        const menudata =await menu.find()
        console.log("Menu Data Fetched")
        res.status(200).json(menudata)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
        
    }
})
router.get("/:dishType", async(req,res)=>{

    try {
        const dishType = req.params.dishType;
        if(dishType=="sweet" || dishType=="sour" || dishType=="spicy"){
            const response = await menu.find({taste: dishType})
            console.log("Response of menu fetched on basis of Taste");
            res.status(200).json(response)
        }else{
            res.status(404).json({error: "Invalid DishType"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server error"})
        
    }
})
router.put("/:tastewise",async(req,res)=>{
    try {
        const tastewise = req.params.tastewise;
        const updatedDish = req.body;
        const response = await menu.findByIdAndUpdate(tastewise,updatedDish,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:"Category Not Found"})
        }
        console.log("Menu Data Updated")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server error"})
    }
})
router.delete("/:tastewise",async(req,res)=>{
    try {
        const tastewise = req.params.tastewise;
        const deletedMenuData = await menu.findByIdAndDelete(tastewise)
        if(!deletedMenuData){
            return res.status(404).json({error:"Category Not Found"})
        }
        res.status(200).json({message: "Menu Data Deleted", data: deletedMenuData})
        console.log("Menu Data Deleted")
    } catch (error) {
        console.log(error)
            res.status(500).json({error:"Internal Server error"})
        
    }
})
module.exports = router;