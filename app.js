const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
require('dotenv').config();
require('./Database/db');

//IMPORTING ROUTES
const employeeRoute = require('./Routes/employee');
const authRoute = require('./Routes/auth');

//INITIALIZING EXPRESS APP
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//INITIALIZING ROUTES
app.use('/api/employee', employeeRoute);
app.use('/api/auth', authRoute);

//404 ROUTE
app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist'));
})

//ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

//CONFIGURING PORT
const PORT = process.env.PORT || 3000;

//RUNNING THE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})