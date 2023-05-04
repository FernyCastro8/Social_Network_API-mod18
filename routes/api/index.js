const router = require('express').Router();
const userRoutes = require('./user_routes');
const thoughtRoutes = require('./thoughts_routes')


router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;

