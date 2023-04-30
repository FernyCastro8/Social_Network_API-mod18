const mongoose = require('mongoose');
const { Schema, Model } = require('mongoose');


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
        // Use a regular expression to validate the email address ??
        validate: {
            validator: validator.isEmail,
            message: '{ VALUE } is not a valid email',
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    toJSON: {
        virtuals: true
    },
    id: false

});


// Creates a property 'friends' to Get total count of friends on retrieval
UserSchema.virtual('friendCount')
    //getter method
    .get(() => {
        return this.friends.length;
    });


// Creates the User model using the UserSchema
const User = mongoose.model('user', UserSchema);


module.exports = User;


