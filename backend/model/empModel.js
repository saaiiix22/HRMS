const mongoose = require('mongoose')
const empSchema = require('../schema/empSchema')

const empModel = mongoose.model("emps", empSchema)

module.exports = empModel