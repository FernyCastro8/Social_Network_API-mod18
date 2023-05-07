const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const api_routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// listening on http://localhost:3001/api
app.use('/', api_routes)


db.once('open', (err) => {
    if (err) throw err;
    app.listen(PORT, () => console.log('Server listening on port %s,', PORT));
})



