const mongoose = require('mongoose')

const menuRolesSchema = mongoose.Schema({
  userMenuId: Number,
  menu: {
    menuId: Number,
    menuDescriptionEng: String,
    menuDescriptionHindi: String,
    menuDescriptionOdiya: String,
    menuURI: String,
    parentMenuId: String,
    childMenu: Boolean,
    menuIcon: String,
    displayOrder: Number,
    active: Boolean,
    appCode: String
  },
  department: String,
  section: String,
  role: {
    roleId: Number,
    roleCode: String,
    displayName: String,
    roleLevel: Number,
    description: String,
    displayOnPage: String,
    status: String,
    designation: Boolean
  }
})
module.exports = menuRolesSchema