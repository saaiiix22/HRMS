const mongoose = require('mongoose')

const empEducationSchema = new mongoose.Schema({
    empEducationId: Number,
    standardName: String,
    institutionName: String,
    boardName: String,
    stream: String,
    passingYear: Number,
    totalMark: Number,
    certificateName: String,
    certificatePath: String,
    status: String,
    loginId:String,
    userId:Number,
    createdDate: Date,
    lastUpdatedDate: Date
})

module.exports = empEducationSchema