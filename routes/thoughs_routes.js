const router = require('express').Router();
const { OjectId } = require('mongoose').Types;
// ObjectId() method for converting studentId string into an ObjectId for querying database
const { Thought } = require('../models');

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction
} = require('../controllers/thoughtController');

// http://localhost:3001/api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:id
router.route('/thoughts/:id').get(getThoughtById).put(updateThought).delete(deleteThought);




// // Get all thoughts
// // listeing on http:localhost:3001/api/thoughts
// router.get('/thoughts', async (req, res) => {
//     // to find all thoughts
//     const thoughts = await Thought.find();

//     res.json(thoughts);
// });

// // Get a single thought by its _id
// // listeing on http:localhost:3001/api/thoughts/:id
// router.get('/thoughts/:id', async (req, res) => {
//     // to find a single thought by its _id
//     const thought = await Thought.findOne({ _id: OjectId.req.params.id })
// });


// // Create a new thought
// // http://localhost:3001/api/thoughts
// router.post('/thoughts', async (req, res) => {
//     const thought = await Thought.create(req.body)
//     res.send(thought, 'Thought has been created');
//     /* 
//     Push the created thought's _id to the associated user's thoughts array field
//     // example data
//     {
//      "thoughtText": "Here's a cool thought...",
//      "username": "lernantino",
//      "userId": "5edff358a0fcb779aa7b118b"
//      } 
//      */
// });


// // Update a thought by its _id
// //  http://localhost:3001/api/thoughts/:id
// router.put('/thoughts/:id', async (req, res) => {
//     const updateThought = await Thought.findOneAndUpdate({
//         // to find a single thought by its _id
//         _id: OjectId.req.params.id
//     },
//         {       // to update the thought
//             thoughtText: req.body.thoughtText,
//             username: req.body.username,
//         },
//         {
//             new: true // to return the updated thought)
//         }
//     );
//     res.send(updateThought, 'Thought has been updated');

// });


// // Delete a thought by its _id
// // http://localhost:3001/api/thoughts/:id
// router.delete('/thoughts/:id', async (req, res) => {
//     const deleteThought = await Thought.findOneAndDelete({
//         // to find a single thought by its _id
//         _id: OjectId.req.params.id
//     });
//     res.send(deleteThought, 'Thought has been deleted');

// });


/*  
/api/thoughts /: thoughtId / reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
*/

module.exports = router;

