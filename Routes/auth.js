const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// *Note: We will not create any registration form or component on the front-end. We will use this 'Registration' API for Sigle use. We will create only one Admin through post-man software.

//REGISTRATION  POST    /api/auth/registration
router.post('/registration', authController.registrationController);

//LOGIN POST    /api/auth/login
router.post('/login', authController.loginController);


module.exports = router;