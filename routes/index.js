const router = require('express').Router();
const userRoutes = require("./user_routes")
const thoughtRoutes = require('./thoughs_routes');

const apiRoutes = (userRoutes, thoughtRoutes)

// listening on http://localhost:3001/api
router.use("/api", apiRoutes);


module.exports = router;
