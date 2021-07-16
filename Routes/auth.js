const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const Authenticate = require('../middlewares/authenticate');

// *Note: We will not create any registration form or component on the front-end. We will use this 'Registration' API for Sigle use. We will create only one Admin through post-man software.

//REGISTRATION      POST    /api/auth/registration
router.post('/registration', authController.registrationController);

//LOGIN             POST    /api/auth/login
router.post('/login', authController.loginController);

//RESET PASSWORD    POST    /api/auth/login
router.post('/reset-password', authController.resetPassword);


module.exports = router;