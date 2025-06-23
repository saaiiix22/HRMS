// const express = require('express')
// const verifyToken = require('../middleware/jwt')
// const menuListModel = require('../model/menuListModel')
// const menuListRouter = express.Router()

// menuListRouter.get('/menu', verifyToken, async(req,res)=>{
//     const user = req.user
//     try {
//         const roleCheck = await menuListModel.findOne({})
//         console.log(user);
        
//     } catch (error) {
//         return res.status(500).json({message:'INTERNAL SERVER ERROR'})
//     }
// })

// module.exports = menuListRouter