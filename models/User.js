const mongoose = require('mongoose');

const User = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{ VALUE } is not a valid email',
    }},
    thoughts:[

    ],
    friends: [

    ]

});


module.exports = User;


