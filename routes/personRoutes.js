const express = require('express');
const router = express.Router();
const person = require('../models/person');

// POST route for creating a new person
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log("Person Data Saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route for fetching all person data
router.get("/", async (req, res) => {
    try {
        const data = await person.find();
        console.log("Person Data Fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route for fetching persons by work type
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (["chef", "waiter", "manager"].includes(workType)) {
            const response = await person.find({ work: workType });
            console.log("Response Fetched on Basis Of WorkType");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid workType" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/:id",async(req,res)=>{
    try {
        const personId = req.params.id;
        const updatedPersonData =req.body;

        const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true, //return updated document
            runValidators:true, // Run Moongoose validation
        })
        if(!response){
            return res.status(404).json({error: "Person Not Found"})
        }
        console.log("Person Data Updated");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
    
})
router.delete("/:id",async(req,res)=>{
    try {
        const personId = req.params.id;
        const deleteData = await person.findByIdAndDelete(personId)
        if(!deleteData){
            return res.status(404).json({error:"Person With This Id Not Found"})
        }
        res.status(200).json({ message: "Person Deleted Successfully", data: deleteData });
        console.log("Person Data Deleted!")
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
        
    }
    

})
module.exports = router;
