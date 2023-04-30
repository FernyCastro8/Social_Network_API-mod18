const { Schema, types } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Getter method to format the timestamp on query
        get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    toJSON: {
        getters: true,
    },
    id: false
});


// Creates the Reaction model using the ReactionSchema

module.exports = ReactionSchema;