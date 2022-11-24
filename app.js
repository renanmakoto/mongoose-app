const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 }
});



const docModelLink = mongoose.model('docModelLink', linkSchema);



let db = mongoose.connection;

db.on("error", () => { console.log("There has been an error.") });
db.once("open", () => {
    console.log("Database loaded.")

    app.get('/:title', async (req, res) => {

        let title = req.params.title;

        try {

            let doc = await docModelLink.findOne({ click: "test" })

            console.log(doc);

            res.redirect(doc.url);

        } catch (error) {

            res.send("There's been an error.");

        }
    })

})



// docLink.save().then(doc => {
//     console.log(doc);
// }).catch(error => {
//     console.log(error);
// });

app.get('/', (req, res) => res.send('Hello, World!'));
app.listen(port, () => console.log(`Server running on port ${port}`));
