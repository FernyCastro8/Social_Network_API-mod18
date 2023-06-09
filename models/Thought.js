const mongoose = require('mongoose');
const { Schema, model, } = require('mongoose');
const reactionSchema = require("./Reaction")


const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Getter method to format the timestamp on query
        get: (createdAtVal) => dayjs(createdAtVal).format('lll')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        // Array of nested documents created with the reactionSchema
        type: [reactionSchema]
    },
},
    {
        toJSON: {
            virtuals: true,
        }, id: false
    }
);


thoughtSchema.virtual('reactionCount')
    // Getter method
    .get(function () {
        return this.reactions.length;
    });


// Creates the Thought model using the thoughtSchema 
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;