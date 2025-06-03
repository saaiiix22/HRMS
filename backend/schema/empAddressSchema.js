const mongoose = require('mongoose');

const empAddressSchema = new mongoose.Schema({
  empAddressId: Number,
  bothAddressSameFlag: String,
  
  presAddressLine: String,
  presCityName: String,
  presPincode: String,

  presDistMstObj: {
    districtId: Number,
    districtName: String,
    districtCode: String,
    stateMaster: {
      stateId: Number,
      stateCode: String,
      stateName: String,
      stateCodeForGst: String,
      countryMaster: {
        countryId: Number,
        countryCode: String,
        countryName: String
      }
    },
    status: String,
  },

  presStateMstObj: {
    stateId: Number,
    stateCode: String,
    stateName: String,
    stateCodeForGst: String,
    countryMaster: {
      countryId: Number,
      countryCode: String,
      countryName: String
    }
  },

  permAddressLine: String,
  permCityName: String,
  permPincode: String,

  permDistMstObj: {
    districtId: Number,
    districtName: String,
    districtCode: String,
    stateMaster: {
      stateId: Number,
      stateCode: String,
      stateName: String,
      stateCodeForGst: String,
      countryMaster: {
        countryId: Number,
        countryCode: String,
        countryName: String
      }
    },
    status: String,
    createdDate: Number
  },

  permStateMstObj: {
    stateId: Number,
    stateCode: String,
    stateName: String,
    stateCodeForGst: String,
    countryMaster: {
      countryId: Number,
      countryCode: String,
      countryName: String
    }
  },

  status: String,
  createdDate: Number,

  employeeCode: String,
  employeeId: Number

});

module.exports = empAddressSchema
