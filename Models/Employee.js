const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Please enter employee name"],
        trim: true
    },
    imageUrl: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        minLength: 4,
        required: [true, "Please enter a valid email"],
        trim: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    city: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: 2,
        required: [true, "Please add a city"]
    },
    phone: {
        type: Number,
        trim: true,
        required: [true, "Please add a phone number"]
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        enum: ['male', 'female', 'non-binary']
    },
    designation: {
        type: String,
        trim: true,
        required: [true, "Please add a designation or job title of employee"],
        lowercase: true,
        minLength: 2        
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: true,
        required: [true, "Please select employee status"]
    }
    
}, {timestamps: true});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;