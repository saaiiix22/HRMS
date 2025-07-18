const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        // const conn = await mongoose.connect('mongodb://localhost:27017/HRMS' || process.env.DBURL)
        const conn = await mongoose.connect('mongodb+srv://aashditHRMS:3myuODvOmYcEjdy5@cluster0.lg1lsh4.mongodb.net/HRMS' || process.env.DBURL)

        conn?console.log('DB Connected'):console.log('DB Connection Failed');
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConnection