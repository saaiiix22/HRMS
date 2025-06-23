const mongoose = require('mongoose')
const empDesignationSchema = require('../schema/empDesignationSchema')

const empDesignationModel = mongoose.model('empdesignations',empDesignationSchema)
module.exports = empDesignationModel