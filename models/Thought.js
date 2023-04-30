const mongoose = require('mongoose');


const Thought = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        reactions: [reactionSchema]
    }

});


// Thought.virtual('reactionCount').get(() => {
//     return this.reactions.length;
// });

module.exports = Thought;