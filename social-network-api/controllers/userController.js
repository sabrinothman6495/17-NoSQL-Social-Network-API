const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate('friends').populate('thoughts');
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('friends').populate('thoughts');
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                await Thought.deleteMany({ _id: { $in: user.thoughts } });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    removeFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
