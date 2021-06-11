const Admin = require('../Models/Admin');
const baseController = require('./baseController');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTRATION  POST /api/auth/registration
const registrationController = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        //CHECKING EMAIL EXIST OR NOT
        const doesExist = Admin.findOne({ email: email })
        if (doesExist) {
            throw createError.Conflict(`${email} is already exist`);
        }

        //HASHING PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creating Admin Object
        const admin = new Admin({
            email: email,
            password: hashedPassword,
        })

        //Saving Admin object into DB
        await admin.save()

        //Sending Response
        baseController.success(res, "Done! new admin has been created", null);

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
}


//LOGIN
const loginController = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        //Check email exist in DB or not
        const admin = await Admin.findOne({ email })
        if (admin) {
            //Comparing Password
            bcrypt.compare(password, admin.password, (err, result) => {
                if (err) {
                    //IF something went wrong or any error happen
                    throw createError.Unauthorized("Sorry! Something went wrong. Please try again later");

                } else if (result == true) {
                    //If email id & password match
                    let token = jwt.sign({ email: admin.email, _id: admin._id }, 'SECRET', { expiresIn: '3h' });
                    baseController.success(res, "Welcome! Authentication successfull", token);

                } else {
                    //If Email or Password not match
                    //Here we are not throwing Error (Due to app crash). We are using error response of baseController
                    baseController.error(res, "Sorry! Username or password not valid", null);

                }
            })

        } else {
            //If email id does not exist in DB
            throw createError.Unauthorized("Sorry! Username or password not valid")
        }

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
}


//CHANGE PASSWORD
const changePassword = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
}


module.exports = {
    registrationController,
    loginController,
    changePassword
}