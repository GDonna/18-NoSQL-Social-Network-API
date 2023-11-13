// Import necessary modules:
const { ObjectId } = require('mongoose').Types;
const { Thought, Reaction } = require('../models');

const addReaction = async (req, res) => {
    try {
        // const reaction = await Reaction.create(req.body);
        const reaction = await Reaction.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        return res.json(reaction);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
};

// Delete a reaction by ID
const deleteReaction = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndRemove({ _id: req.params.thoughtId });
        if (!reaction) {
            return res.status(404).json({ message: 'No Reaction!' });
        }
        return res.json({ message: 'Reaction successfully deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    addReaction,
    deleteReaction
};