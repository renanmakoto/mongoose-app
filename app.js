const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const path = require('path')
const linkRoute = require('./routes/linkRoute');

mongoose.connect('mongodb://localhost/mongoose-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


let db = mongoose.connection;

db.on("error", () => { console.log("There has been an error.") });
db.once("open", () => { console.log("Database loaded.") });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/', linkRoute);
app.listen(port, () => console.log(`Server running on port ${port}`))
