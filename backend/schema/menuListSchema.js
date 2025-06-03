const mongoose = require('mongoose')

const menuListSchema = new mongoose.Schema({
  menuId: Number,
  menuDescriptionEng: String,
  menuDescriptionHindi: String,
  menuDescriptionOdiya: String,
  menuURI: String,
  parentMenuId: Number,
  childMenu: Boolean,
  menuIcon: String,
  displayOrder: Number,
  active: Boolean,
  appCode: String
})
module.exports = menuListSchema