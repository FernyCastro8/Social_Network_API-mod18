const express = require('express');
const db = require('./config/connection');
const PORT = 3001;
const api_routes = require('./controllers/api_routes');


const app = express();
app.use(express.json);
app.use(express.urlencoded({ extended: true }));


app.use('/api', api_routes)


db.once('open', () => {
    app.listen(PORT, () => console.log('Severt listening on port %s,', PORT));
})



