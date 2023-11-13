// Import necessary modules:
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models/');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { username, email, thoughts, friends } = req.body;

        const createdThoughts = await Thought.create(thoughts || []);

        // Create friends first
        const createdFriends = await User.create(friends || []);

        // Create the user with the obtained thought and friend ObjectId values
        const user = await User.create({
            username,
            email,
            thoughts: createdThoughts.map((thought) => thought._id),
            friends: createdFriends.map((friend) => friend._id),
        });

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
};
// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Add friend
const addFriend = async (req, res) => {
    try {
        const { userId } = req.params;
        const { friendId } = req.body;

        // Ensure the provided friendId is a valid ObjectId
        if (!ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid friendId' });
        }

        // Update the user's friend list
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

// Remove friend
const deleteFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid userId or friendId' });
        }

        // Remove the friend from the user's friend list
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
};