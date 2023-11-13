// Import necessary modules:
const { ObjectId } = require('mongoose').Types;
const { Thought, Reaction } = require('../models/index');

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Get a single thought by ID
const getThoughtbyID = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a new thought
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        return res.json(thought);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        // const reaction = await Reaction.create(req.body);
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        return res.json(thought);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
};

// Delete a reaction by ID
const deleteReaction = async (req, res) => {
    try {
        const reaction = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        if (!reaction) {
            return res.status(404).json({ message: 'No Reaction!' });
        }
        return res.json({ message: 'Reaction successfully deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    getAllThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
};