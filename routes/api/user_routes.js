const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
// ObjectId() method for converting studentId string into an ObjectId for querying database
const { User } = require('../../models');


// Get all users
// listeing on http:localhost:3001/api/users
router.get('/users', async (req, res) => {
    // to find all users
    const users = await User.find();

    res.json(users);

    console.log(users)
});

// Get a single user by its _id
// listeing on http:localhost:3001/api/users/:id
router.get('/:id', async (req, res) => {
    try {
        // to find a single user by its _id
        const user = await User.findOne({
            _id: ObjectId(req.params.id)
        });

        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }

});


// Create a new user
// listeing on http:localhost:3001/api/users
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body);

        res.status(200).json(user);
        // res.json(user)
        // return res.status(200)

    } catch (error) { // to send back client error if it fails
        res.status(500).send(error);
        console.log(error, 'Internal server error')
        // res.status(500).send(err.errors.type.properties.message);
        // err.errors.type.properties.message is the error message from the model
    }
});


// Update a user by its _id
// listeing on http:localhost:3001/api/users:id
router.put('/:id', async (req, res) => {
    const updateUser = await User.findOneAndUpdate({
        // to find a single user by its _id
        _id: ObjectId(req.params.id)
    },
        {       // to update the user
            username: req.body.username,
            email: req.body.email,
        },
        {
            new: true // to return the updated user)
        }
    );
    res.send(updateUser, 'User has been updated');

});


// Delete a user by its _id
// listeing on http:localhost:3001/api/users:id
router.delete('/:id', async (req, res) => {
    const deleteUser = await User.findOneAndDelete({
        // to find a single user by its _id
        _id: ObjectId.req.params.id
    });
    res.send(deleteUser, 'User has been deleted');
});


// bonus: to delete all users associated thoughts when a user is deleted


//--------------------------------------------------------------------------------

// "/:userId/friends/:friendId"

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list


module.exports = router;

