const docModelLink = require('../models/docModelLink')

const redirect = async (req, res, next) => {
    let title = req.params.title
    
    try {
        let doc = await docModelLink.findOneAndUpdate({ title }, { $inc: { click: 1 } })
        console.log(doc)
        if (doc) {
            res.redirect(doc.url)
        } else {
            next()
        }
    } catch (error) {
        res.send(error)
    }
}

const addLink = async (req, res) => {
    let link = new docModelLink(req.body)
    
    try {
        let doc = await link.save()
        res.redirect('/')
    } catch (error) {
        res.render('add', { error, body: req.body })
    }
}

const allLinks = async (req, res) => {
    try {
        let docs = await docModelLink.find({})
        res.render('all', { links: docs })
    } catch (error) {
        res.send(error)
    }
}

const deleteLink = async (req, res) => {
    let id = req.params.id
    if (!id) {
        id = req.body.id
    }
    try {
        await docModelLink.findByIdAndDelete(id)
        // res.send(id)
        res.redirect('/')
    } catch (error) {
        res.status(404).send(error)
    }
}

const loadLink = async (req, res) => {
    let id = req.params.id

    try {
        let doc = await docModelLink.findById(id)
        res.render('edit', { error: false, body: doc })
    } catch (error) {
        res.status(404).send(error)
    }
}

const editLink = async (req, res) => {
    let link = {}
    link.title = req.body.title
    link.description = req.body.description
    link.url = req.body.url

    let id = req.params.id
    if (!id) {
        id = req.body.id
    }

    console.log(id)

    try {
        let doc = await docModelLink.updateOne({ _id: id }, link)
        res.redirect('/')
    } catch (error) {
        res.render('edit', { error, body: req.body })
    }
}

module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink }
