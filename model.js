const mongoose = require('mongoose');

// Userdata Schema
const UserdataSchema = new mongoose.Schema({
    // Define your schema fields here
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // add reservatiosn array
    reservations: {
        type: Array,
        required: false
    }
    // Add more fields as needed
});

// Staffdata Schema
const StaffdataSchema = new mongoose.Schema({
    // Define your schema fields here
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

// Admindata Schema
const AdmindataSchema = new mongoose.Schema({
    // Define your schema fields here
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

const reservationsSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    reserveDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    occasion: {
        type: String,
        required: true
    },
    bookAt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required:false,
        default: false
    }
});

// Create models
const Userdata = mongoose.model('Userdata', UserdataSchema);
const Staffdata = mongoose.model('Staffdata', StaffdataSchema);
const Admindata = mongoose.model('Admindata', AdmindataSchema);
const Reservations = mongoose.model('Reservations', reservationsSchema);

module.exports = {
    Userdata,
    Staffdata,
    Admindata,
    Reservations
};
