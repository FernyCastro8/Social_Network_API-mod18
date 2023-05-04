const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction

} = require('../../controllers/thoughtController');



// // Get all thoughts
// // listeing on http:localhost:3001/api/thoughts
router.route('/').get(getAllThoughts);

// // Create a new thought
// // http://localhost:3001/api/thoughts
router.route('/').post(createThought);


// // Update a thought by its _id
// //  http://localhost:3001/api/thoughts/:id
router.route('/:id').put(updateThought);


// // Delete a thought by its _id
// // http://localhost:3001/api/thoughts/:id
router.route('/:id').delete(deleteThought);


// Add a reaction to a thought
// http://localhost:3001/api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction);


// Delete a reaction from a thought
// http://localhost:3001/api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(removeReaction);



/*  
/api/thoughts /: thoughtId / reactions

POST to create a reaction stored in a single thought's reactions array field


DELETE to pull and remove a reaction by the reaction's reactionId value
*/

module.exports = router;

