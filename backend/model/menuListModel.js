const mongoose = require('mongoose')
const menuListSchema = require('../schema/menuListSchema')

const menuListModel = mongoose.model('menuLists', menuListSchema)

module.exports = menuListModel