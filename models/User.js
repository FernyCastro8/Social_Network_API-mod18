const mongoose = require('mongoose');
const { Schema, Model } = require('mongoose');
const friendSchema = require('./Friend');



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
            unique: true,
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
        friends: {
            type: [friendSchema]
        }
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
    .get(function () {
        return this.friends.length;
    });


// Creates the User model using the UserSchema
const User = mongoose.model('User', UserSchema);


module.exports = User;
