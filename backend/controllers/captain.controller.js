const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const blackList = require('../models/blacklistToken.model') 
const { validationResult } = require('express-validator')

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullName, email, password, vehicle } = req.body

    const existingCaptain = await captainModel.findOne({ email })   

    if(existingCaptain) {
        return res.status(400).json({ error: 'Captain already exists' })    
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({ 
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password:hashedPassword,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType   
    })  

    const token = captain.generateAuthToken()

    res.status(201).json({ token })

}  

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()})
    }

    const { email, password } = req.body

    const user = await captainModel.findOne({email}).select('+password')

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


module.exports.getCaptainProfile = async (req, res) => {
    res.status(200)
       .json(req.captain)
}

module.exports.logoutCaptain = async (req, res) => {
    const token  = req.cookies.token || req.headers.authorization.split(' ')[1] 

    await blackList.create({token})

    res.clearCookie('token')

    res.status(200)
       .json({message: 'Logged out successfully'})
}   