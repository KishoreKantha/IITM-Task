// dependency 
const mongoose = require('mongoose');

// regex patterns and function for validation
const phoneReg = /\+?\d[\d -]{8,12}\d/;
const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var validateRegex = function (email, reg) {
    return reg.test(email)
};

// main table schema with validations
const dataSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        min: 2,
        max: 100
    },
    lastname: {
        required: true,
        type: String,
        min: 2,
        max: 100
    },
    age: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    role: {
        required: true,
        type: String,
        validate: {
            validator: async function (role) {
                return ['SuperAdmin', 'Admin', 'Employee'].includes(role)
            },
            message: props => 'Role mismatch !. Available roles are SuperAdmin, Admin, Employee'
        }
    },
    department: {
        required: true,
        type: String,
        validate: {
            validator: async function (department) {
                return ['IT', 'HR', 'Admin'].includes(department)
            },
            message: props => 'Department mismatch !. Available departments are IT, HR, Admin'
        }
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: async function (email) { return validateRegex(email, emailReg) },
            message: props => 'Invalid email !'
        },
    },
    phone: {
        required: true,
        type: Number,
        trim: true,
        unique: true,
        validate: {
            validator: async function (phone) { return validateRegex(phone, phoneReg) },
            message: props => 'Invalid Phone Number !. Phone number must contains 10 digit'
        }
    },
    isactive: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Employee', dataSchema)