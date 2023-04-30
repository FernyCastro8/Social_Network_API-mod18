const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
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
        validate: {
            validator: validator.isEmail,
            message: '{ VALUE } is not a valid email',
        }
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    toJSON: {
        virtuals: true
    },
    id: true

});

// Get total count of friends on retrieval
UserSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});


module.exports = UserSchema;


