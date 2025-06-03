const mongoose =require('mongoose')
const empEducationSchema = require('../schema/empEducationSchema')
const empEducationModel = mongoose.model('educationdetails',empEducationSchema)
module.exports = empEducationModel