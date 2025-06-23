const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()
const dbConnection = require('./db_connection/dbConnection')
const empRouter = require('./router/empRouter')
const empEducationRouter = require('./router/empEducationRouter')
const cookieParser = require('cookie-parser')
const empAddressRouter = require('./router/empAddressRouter')
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser())
dbConnection()
app.use('/', empRouter)
app.use('/education', empEducationRouter)
app.use('/address',empAddressRouter)
app.listen(8081, () => {
    console.log('server started');
})
