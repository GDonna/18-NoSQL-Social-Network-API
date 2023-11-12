// import dependencies
const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./reaction');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },

    id: false
}
);
thoughtSchema.virtual('reactionCount').get(function () {
    console.log(this)
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;