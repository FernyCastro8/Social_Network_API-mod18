const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;
// ObjectId() method for converting studentId string into an ObjectId for querying database

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
        console.log('id_thoughtRoutes');
        // thoghtId is the route parameter in routes/api/thought_routes.js
        Thought.findOne({ _id: req.params.thought_id })
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
        console.log('create thought has been activated')
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
        console.log('id_update thought has been activated')
        Thought.findOneAndUpdate(
            //  thoghtId is key value to set to find thought when testing API
            { _id: req.params.thought_id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
                console.log('id_thought updated successfully');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a thought by its _id
    // listening on http:localhost:3001/api/thoughts/:id
    deleteThought(req, res) {
        console.log('id_delete thought has been activated')
        Thought.findOneAndDelete({ _id: req.params.thought_id })
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
                    return res.status(200).json({ message: 'Thought Deleted succesfully' });
                }
                res.json({ message: 'Thought deleted successfully!', user });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thought_id/reactions
    addReaction(req, res) {
        cosole.log('add reaction has been activated')
        Thought.findOneAndUpdate(
            { _id: req.params.thought_id },
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
    // listening on http:localhost:3001/api/thoughts/:thought_id/reactions/:reactionId
    removeReaction(req, res) {
        console.log('remove reaction has been activated')
        Thought.findOneAndUpdate(
            { _id: req.params.thought_id },
            { $pull: { reactions: { reactionId: req.params.reaction } } },
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

