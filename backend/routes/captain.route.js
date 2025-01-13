const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),

    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),

    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),

    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),

    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),

    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto rickshaw']).withMessage('Vehicle type must be either car, bike or auto rickshaw'),

], captainController.registerCaptain);

router.get('/login',[

    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),

], captainController.loginCaptain)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)


router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;
