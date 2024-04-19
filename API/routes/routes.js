// dependency 
const express = require('express');

// for create a new router object in this app
const router = express.Router()

// model schema import
const Model = require('../models/model');

//Method for create a new user 
router.post('/createUser', async (req, res) => {
    const data = new Model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        role: req.body.role,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone,
        isactive: req.body.isactive
    })
    try {
        const user = await Model.findOne({ "$or": [{ email: req.body.email }, { phone: req.body.phone }] });
        if (user)
            res.status(200).json({ message: "Email or Phone number is already exists" })
        else {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all users
router.get('/getAllUsers', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get User using ID 
router.get('/getUser/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update User using ID
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true, runValidators: true };

        const users = await Model.find({ "$or": [{ email: req.body.email }, { phone: req.body.phone }] });
        if (users && users.filter(x => x.id != id).length > 0)
            res.status(200).json({ message: "Email or Phone number is already exists" })
        else {
            const result = await Model.findByIdAndUpdate(
                id, updatedData, options
            )
            res.send(result)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete User using ID 
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.status(200).json({ message: data ? `${data.firstname} has been deleted..` : 'User not found' })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;