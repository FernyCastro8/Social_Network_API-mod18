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
        get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        reactions: [reactionSchema]
    },
},
    {
        toJSON: {
            virtuals: true,
        }, Id: false
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