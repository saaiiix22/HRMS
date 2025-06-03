const express = require('express')
const empEducationModel = require('../model/educationModel')
const verifyToken = require('../middleware/jwt')
const empEducationRouter = express.Router()


// ! Add Education
empEducationRouter.post('/addEducation', verifyToken, async (req, res) => {
    const user = req.user
    const {empEduArr} = req.body   
    try {
        const oldEducation = await empEducationModel.deleteMany({ userId: user.employeeId })
        const updatedEducation = await empEducationModel.insertMany(empEduArr)
        res.status(200).json({ message: 'Education details updated successfully', data: updatedEducation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update education details', error: error.message });
    }
})

module.exports = empEducationRouter