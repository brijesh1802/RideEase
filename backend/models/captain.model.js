const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 2 characters long'],
        },
        lastName : {
            type: String,
            required: true,
            minLength: [3, 'Last name must be at least 2 characters long'],
        }
    },
    email : {
        type: String,
        required: true,
        unique: true,
        minLength : [5, 'Email must be at least 5 characters long'],
        lowercase: true,
        match : [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password : {
        type: String,
        required: true,
        minLength : [8, 'Password must be at least 8 characters long'],
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color : {
            type: String,
            required: true,
            minLength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minLength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity :{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            type: String,
            enum: ['car', 'bike', 'auto rickshaw'],
            required: true,
        }
    },
    location:{
        lat:{
            type: Number
        },
        long:{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id :this._id }, process.env.JWT_SECRET,{ expiresIn : '24h' })
    return token
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model('Captain', captainSchema)