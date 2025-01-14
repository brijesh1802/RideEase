
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blackList = require('../models/blacklistToken.model')   


module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()})
    }

    const { fullName, email, password } = req.body

    const usere = await userModel.findOne({email})

    if(usere) {
        return res.status(400)
                  .json({error: 'User already exists'})
    }

    const hashedPass = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPass
    })

    const token = user.generateAuthToken()

    res.status(201)
       .json({token, user})
}


module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()})
    }

    const { email, password } = req.body

    const user = await userModel.findOne({email}).select('+password')

    if(!user) {
        return res.status(400)
                  .json({error: 'User not found'})
    }

    const isValidPass = await user.comparePassword(password, user.password)

    if(!isValidPass) {
        return res.status(400)
                  .json({error: 'Invalid password'})
    }

    const token = user.generateAuthToken()

    res.cookie('token', token)

    res.status(200)
       .json({token, user})
}


module.exports.getUserProfile = async (req, res) => {
    res.status(200)
       .json(req.user)
}

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    try {
        await blackList.create({ token })
        res.clearCookie('token')
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
        console.error('Token verification failed:', err)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}