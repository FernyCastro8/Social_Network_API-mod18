const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    // listening on http:localhost:3001/api/thoughts
    getAllThoughts(req, res) {
        console.log('get all thoughts has been activated')
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createdAt: -1 })
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Create a new thought
    // Post route
    // listening on http:localhost:3001/api/thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then(thought => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'Thought created successfully!', user });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: thought.userId },
                    { $pull: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'Thought deleted successfully!', user });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Remove a reaction from a thought
    // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }


};