const mongoose = require('mongoose')
const empAddressSchema = require('../schema/empAddressSchema')

const empAddressModel = mongoose.model('empaddresses', empAddressSchema);

module.exports = empAddressModel