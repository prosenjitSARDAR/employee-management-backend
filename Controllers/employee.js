const mongoose = require('mongoose');
const Employee = require('../Models/Employee');
const baseController = require('./baseController');
const createError = require('http-errors');

// GET /api/employee/get-all-employees
const getAllEmployeesController = async (req, res, next) => {
    try {
        const employees = await Employee.find({}).select('-__v -createdAt')

        baseController.success(res, "Done! received all employee details", employees);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


//POST /api/employee/create-employee
const createEmployeeController = async (req, res, next) => {
    try {
        const details = req.body;
        const employee = new Employee(details);

        const employeeDetails = await employee.save()

        baseController.success(res, "Done! new employee has been added.", employeeDetails);
    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
}


//GET /api/employee/get-employee/:id
const getEmployeeController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id).select('-__v -createdAt')

        if (!employee) {
            throw createError(404, 'Sorry! employee not found');
        }

        baseController.success(res, "Done! received employee details.", employee);
    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Employee Id'));
            return;
        }
        next(err);
    }
}


//PATCH /api/employee/edit-employee/:id
const editEmployeeController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = { new: true };

        const updatedEmployee = await Employee.findByIdAndUpdate(id, update, options).select('-__v -createdAt')

        baseController.success(res, "Done! employee details has been updated successfully.", updatedEmployee);
    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Employee Id'));
            return;
        }
        next(err);
    }
}


//PATCH /api/employee/image-upload/:id
const uploadEmployeeImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const imageUrl = process.env.IMAGE_URL + req.file.filename;
        const options = { new: true };

        const updateEmployeeImage = await Employee.findByIdAndUpdate(id, { imageUrl: imageUrl }, options).select('-__v -createdAt')

        baseController.success(res, "Done! employee image has been uploaded successfully.", updateEmployeeImage);

    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Employee Id'));
            return;
        }
        next(err);
    }
}


//DELETE /api/employee/delete-employee/:id
const deleteEmployeeController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Employee.findByIdAndDelete(id).select('-__v -createdAt')

        if (!result) {
            throw createError(404, "Sorry! employee not found");
        }

        baseController.success(res, "Done! employee details has been removed", result);
    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Employee Id'));
            return;
        }
        next(err);
    }
}


module.exports = {
    getAllEmployeesController,
    createEmployeeController,
    getEmployeeController,
    editEmployeeController,
    uploadEmployeeImage,
    deleteEmployeeController
}