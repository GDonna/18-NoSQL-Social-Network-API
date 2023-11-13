// import dependencies
const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => moment(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
{
    toJSON: {
        getters: true,
        virtuals: true,
        id: false
    },
}
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;