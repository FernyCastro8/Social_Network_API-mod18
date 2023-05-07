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



//  Get all thoughts    //  Create a new thought
// listeing on http:localhost:3001/api/thoughts
router.route('/').get(getAllThoughts).post(createThought);


//  Update a thought by its id  //  Update a thought by id //   Delete a thought by its id
//  http://localhost:3001/api/thoughts/:thought_id
router.route('/:thought_id').get(getThoughtById).put(updateThought).delete(deleteThought);


// Add a reaction to a thought // delete a reaction from a thought
// http:localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/thoughts/:thought_id/:reactions').post(addReaction).delete(removeReaction);


/*  
/api/thoughts /: thoughtId / reactions
 
POST to create a reaction stored in a single thought's reactions array field
 
 
DELETE to remove a reaction by the reaction's reactionId value
*/

module.exports = router;

