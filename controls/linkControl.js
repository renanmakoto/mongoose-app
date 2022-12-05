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
        res.render('all', { links });
    } catch (error) {
        res.send(error);
    }
}

const deleteLink = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
        await docModelLink.findByIdAndDelete(id)
        res.send(id)
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = { redirect, addLink, allLinks, deleteLink };