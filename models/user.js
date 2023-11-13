const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // matching a valid email address
    },
    
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'  // referencing thought doc model
        }
    
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  // referencing user doc model
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },

    id: false
});

// virtual to count friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;