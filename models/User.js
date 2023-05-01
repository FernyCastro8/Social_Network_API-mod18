const mongoose = require('mongoose');
const { Schema, Model } = require('mongoose');
const validator = require('validator');
// npm package for validating strings
// https://www.npmjs.com/package/validator
// trying to use validator.isEmail() to validate email address
// or Use a regular expression to validate the email address ??

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'That user already exixts!'],
            // email validation
            // match: [/.+@.+\..+/, 'Must match an email address!']
            validate: [(email) => {
                const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email);
            }, 'Must be a valid email address.']
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
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


// Creates a property 'friends' to Get total count of friends on retrieval
UserSchema.virtual('friendCount')
    //getter method
    .get(() => {
        return this.friends.length;
    });


// Creates the User model using the UserSchema
const User = mongoose.model('User', UserSchema);


module.exports = User;
