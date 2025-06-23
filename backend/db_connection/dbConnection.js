const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/HRMS' || process.env.DBURL)
        conn?console.log('DB Connected'):console.log('DB Connection Failed');
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConnection