const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');


const friendSchema = new Schema({
    friendId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    username: {
        type: String,
        riquired: true,
    },
    friendname: {
        type: String,
        required: true,
        maxlength: 40,
    },
},
    {
        toJSON: {
            id: false
        }
    });



module.exports = friendSchema;