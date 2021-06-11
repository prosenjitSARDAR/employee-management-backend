const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/employee');
const upload = require('../helpers/multer'); //We've Configured multer in this file
const Authenticate = require('../middlewares/authenticate');

// GET /api/employee/get-all-employees
router.get('/get-all-employees', Authenticate, employeeController.getAllEmployeesController);

//POST /api/employee/create-employee
router.post('/create-employee', Authenticate, employeeController.createEmployeeController);

//GET /api/employee/get-employee/123
router.get('/get-employee/:id', Authenticate, employeeController.getEmployeeController);

//PATCH /api/employee/edit-employee/123
router.patch('/edit-employee/:id', Authenticate, employeeController.editEmployeeController);

//PATCH /api/employee/image-upload/123
router.patch('/image-upload/:id', Authenticate, upload.single('file'), employeeController.uploadEmployeeImage);

//DELETE /api/employee/delete-employee/123
router.delete('/delete-employee/:id', Authenticate, employeeController.deleteEmployeeController);


module.exports = router;