const mongoose = require('mongoose');


const Thought = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,

    },
    createdAt: {

    },
    username: [

    ],
    reactions: [

    ]

});


module.exports = Thought;