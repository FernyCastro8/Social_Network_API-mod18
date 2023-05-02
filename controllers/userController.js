const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    // listeing on http:localhost:3001/api/users
    getAllUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single user by its _id
    // listeing on http:localhost:3001/api/users/:id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
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
            { _id: req.params.id },
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
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => { res.status(500).json(err) });
    }
};
