const docModelLink = require('../models/docModelLink');

const redirect = async (req, res, next) => {
    let title = req.params.title;
    try {
        let doc = await docModelLink.findOne({ title })
        console.log(doc);
        if (doc) {
            res.redirect(doc.url);
        } else {
            next()
        }
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
        res.render('index', { error, body: req.body });
    }
};

const allLinks = async (req, res) => {

    try {
        let links = await docModelLink.find({});
        res.send(links);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { redirect, addLink, allLinks };