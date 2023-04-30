const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');


const ThoughtSchema = new mongoose.Schema({
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

    toJSON: {
        virtuals: true,
    }, Id: false

});


Thought.virtual('reactionCount')
    // Getter method
    .get(() => {
        return this.reactions.length;
    });


// Creates the Thought model using the ThoughtSchema 
const Thought = mongoose.model('thought', ThoughtSchema);

module.exports = Thought;