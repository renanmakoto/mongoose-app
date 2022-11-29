const docModelLink = require('../models/docModelLink');

const redirect = async (req, res) => {
    let title = req.params.title;

    try {

        let doc = await docModelLink.findOne({ click: "test" })

        console.log(doc);

        res.redirect(doc.url);

    } catch (error) {

        res.send(error);

    }
};

const addLink = async (req, res) => {

    let link = new docModelLink(req.body)

    try {

        let doc = await link.save()
        res.send("Link added succesfully.");

    } catch (error) {

        res.send(error)

    }

};

module.exports = { redirect, addLink };