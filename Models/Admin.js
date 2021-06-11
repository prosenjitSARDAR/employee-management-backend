const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        trim: true,
        unique: true,
        required: [true, "Please enter a valid email addres."],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Please enter a password."],
        minlength: 6
    }
}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema)

//exporting models
module.exports = Admin