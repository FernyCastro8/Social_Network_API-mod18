const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const api_routes = require('./controllers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api_routes)


db.once('open', (err) => {
    if (err) throw err;
    app.listen(PORT, () => console.log('Server listening on port %s,', PORT));
})



