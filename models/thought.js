// import dependencies
const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const moment = require('moment');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        max: 280,
        min: 1
    },

    createdAt: {
        type: Date, default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: { type: String},
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