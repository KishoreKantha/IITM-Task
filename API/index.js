// for access .env file
require('dotenv').config();

// dependency 
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


// for api routes
const routes = require('./routes/routes');

// mongodb connection
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection

// it will connect to the database, and throws any error if the connection fails
database.on('error', (error) => {
    console.log(error)
})

// it will run only one time. If it is successful, it will show a message that says Database Connected
database.once('connected', () => {
    console.log('Database Connected');
})

// for creates an express application. 
const app = express();

// Use CORS middleware
app.use(cors());
app.options('*', cors());

// for accept json request
app.use(express.json());


// for endpoint
app.use('/api', routes)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})