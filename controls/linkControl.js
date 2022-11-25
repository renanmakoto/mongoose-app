const docModelLink = require('../models/docModelLink');

const redirect = async (req, res) => {
    let title = req.params.title;

    try {

        let doc = await docModelLink.findOne({ click: "test" })

        console.log(doc);

        res.redirect(doc.url);

    } catch (error) {

        res.send("There's been an error.");

    }
};

module.exports = { redirect }