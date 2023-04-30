const router = require('express').Router();
const api_Routes = require('./api');

router.use('/api', api_Routes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
