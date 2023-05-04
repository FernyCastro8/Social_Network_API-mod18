const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;
// ObjectId() method for converting studentId string into an ObjectId for querying database

module.exports = {
    // Get all users
    // listeing on http:localhost:3001/api/users
    getAllUsers(req, res) {
        console.log('userRoutes')
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single user by its _id
    // listeing on http:localhost:3001/api/users/:id
    getUserById(req, res) {
        console.log('id_userRoutes')
        User.findOne({ _id: req.params.user_id })
            .select('-__v')
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user)
            }).catch((err) => { res.status(500).json(err) });
    },

    // Create a new user
    // listeing on http:localhost:3001/api/users
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a user by its _id
    // listeing on http:localhost:3001/api/users:id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.user_id },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) => {
            !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.json(user)
        }).catch((err) => { res.status(500).json(err) });
    },

    // Delete a user by its _id
    // listeing on http:localhost:3001/api/users:id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.user_id })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => { res.status(500).json(err) });
    },


    // Add a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json({ message: 'Reaction added to thought!', thought });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json({ message: 'Reaction deleted from thought!', thought });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

};