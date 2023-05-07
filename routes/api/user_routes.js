const router = require('express').Router();
const { User } = require('../../models');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// Get all users
// listeing on http:localhost:3001/api/users
router.route('/').get(getAllUsers).post(createUser)

// Get user by id   //    Update user by id   //  Delete user by id
router.route('/:user_id').get(getUserById).put(updateUser).delete(deleteUser)




module.exports = router;


// bonus: to delete all users associated thoughts when a user is deleted


//--------------------------------------------------------------------------------

// "/:userId/friends/:friendId"

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list


// module.exports = router;



