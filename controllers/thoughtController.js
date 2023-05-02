const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    // listening on http:localhost:3001/api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Create a new thought
    // listening on http:localhost:3001/api/thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'Thought created successfully!', thought: user });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : User.findOneAndUpdate(
                        { _id: thought.userId },
                        { $pull: { thoughts: thought._id } }
                    )
                        .then(() => res.json({ message: 'Thought deleted successfully!' }))
                        .catch((err) => res.status(500).json(err));
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // // Add a reaction to a thought
    // // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions
    // addReaction(req, res) {
    //     Thought.findOneAndUpdate(
    //         { _id: req.params.thoughtId },
    //         { $push: { reactions: req.body } },
    //         { runValidators: true, new: true })
    // },

};