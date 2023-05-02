const router = require('express').Router();
const userRoutes = require("./user_routes")
const thoughtRoutes = require('./thoughs_routes');

router.use("/users", userRoutes)


module.exports = router;
