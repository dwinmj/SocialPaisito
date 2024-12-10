const express = require('express');

const router = express.Router();
const { register, login, logout, forgotPassword, checkUsername} = require( "../controllers/auth");

// Rutoes for links that do not require auth
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/check-username', checkUsername );
router.post('/forgot-password', forgotPassword );

module.exports = router;
