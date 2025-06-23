const mongoose = require('mongoose')
const menuRolesSchema = require('../schema/menuRolesSchema')
const menuRolesModel = mongoose.model('menuroles',menuRolesSchema)
module.exports = menuRolesModel