const express = require('express')
const verifyToken = require('../middleware/jwt')
const empAddressModel = require('../model/empAddressModel')

const empAddressRouter = express.Router()

empAddressRouter.get('/allAdd', async(req,res)=>{
   
    try {
        const getEmpAddress = await empAddressModel.find({})
        if(getEmpAddress){
            return res.status(200).json({message:'User Address fetched successfully', empAddress:getEmpAddress})
        }
    } catch (error) {
        console.error('Error in /seeaddress:', error);
        return res.status(500).json({message:'ERROR SERVER SIDE'})
    }
})

empAddressRouter.get('/seeaddress', verifyToken,async(req,res)=>{
    const user = req.user
    try {
        // console.log(user.userMaster.loginId);
        
        const getEmpAddress = await empAddressModel.findOne({employeeCode:user.userMaster.loginId})
        if(getEmpAddress){
            return res.status(200).json({message:'User Address fetched successfully', empAddress:getEmpAddress})
        }
        else{
            // console.log(getEmpAddress);
            return res.status(404).json({message:'Sorry Couldnt Fetch',getEmpAddress})
        }
    } catch (error) {
        console.error('Error in /seeaddress:', error);
        return res.status(500).json({message:'ERROR SERVER SIDE'})
    }
})
empAddressRouter.post('/updateAddress',verifyToken,async(req,res)=>{
    const user = req.user
    try {
        const updateAddress = await empAddressModel.findOneAndUpdate({},{})
    } catch (error) {
        
    }
})
module.exports = empAddressRouter