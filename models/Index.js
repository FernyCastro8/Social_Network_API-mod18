// Import the User model from the User.js file
const User = require('./User');
// Import the Thought model from the Thought.js file
const Thought = require('./Thought');


// Export the User and Thought models
// This allows other parts of the application to use these models when this module is imported
module.exports = { User, Thought, };
