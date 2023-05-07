const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;
// ObjectId() method for converting studentId string into an ObjectId for querying database

module.exports = {
    // Get all users
    // listeing on http:localhost:3001/api/users
    getAllUsers(req, res) {
        console.log('user Routes')
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
    // listeing on http:localhost:3001/api/users/:user_id
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
        console.log('create userRoutes')
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a user by its _id
    // listeing on http:localhost:3001/api/:user_id
    updateUser(req, res) {
        console.log('update userRoutes')
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
    // listeing on http:localhost:3001/api/:users:id
    deleteUser(req, res) {
        console.log('id_delete userRoutes')
        User.findOneAndDelete({ _id: req.params.user_id })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => { res.status(500).json(err) });
    },


    // Add a new friend to a user's friend list
    // listening on http:localhost:3001/api/users/:user_id/friends/:friend_id
    addFriend(req, res) {
        console.log('id_add friend userRoutes');

        // Add a new friend to a user's friend list
        const friend = req.body.friend_Id;

        User.findOneAndUpdate(
            { _id: req.params.user_id },
            { $push: { friends: friend } }, // Add the friend to the 'friends' array
            { new: true }
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
                console.log('Friend added successfully');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // Delete a friend from a user's friend list
    // listening on http:localhost:3001/api/users/:user_id/friends/:friend_id
    deleteFriend(req, res) {
        console.log('id_delete friend userRoutes');

        // Delete a friend from a user's friend list
        const friendId = req.params.friend_id;
    }

    // Add a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thought_id/reactions
    // addReaction(req, res) {
    //     console.log('id_add Reaction userRoutes')
    //     Thought.findOneAndUpdate(
    //         { _id: req.params.thought_id },
    //         { $push: { reactions: req.body } },
    //         { runValidators: true, new: true })
    //         .then((thought) => {
    //             if (!thought) {
    //                 return res.status(404).json({ message: 'No thought found with this id!' });
    //             }
    //             res.json({ message: 'Reaction added to thought!', thought });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },

    // Delete a reaction to a thought
    // listening on http:localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
    // deleteReaction(req, res) {
    //     console.log('delete reaction userRoutes')
    //     Thought.findOneAndUpdate(
    //         { _id: req.params.thoughtId },
    //         { $pull: { reactions: { reactionId: req.params.reaction } } },
    //         { runValidators: true, new: true })
    //         .then((thought) => {
    //             if (!thought) {
    //                 return res.status(404).json({ message: 'No thought found with this id!' });
    //             }
    //             res.json({ message: 'Reaction deleted from thought!', thought });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // }

};