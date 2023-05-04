const router = require('express').Router();
const apiRoutes = require('./api');


// listening on http://localhost:3001/api
router.use("/api", apiRoutes);


module.exports = router;
