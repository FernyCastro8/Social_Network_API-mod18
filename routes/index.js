// Import the express module and create a new router object
const router = require('express').Router();

// Import the API routes from the 'api' module
const apiRoutes = require('./api');

// Use the API routes when the path starts with '/api'
// This means that all routes defined in 'apiRoutes' will be prefixed with '/api'
// For example, if there's a route defined in 'apiRoutes' as '/users', you can access it here as '/api/users'
router.use("/api", apiRoutes);

// Export the router to be used in other parts of the application
module.exports = router;