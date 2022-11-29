const express = require('express');
const router = express.Router();
const linkControl = require('../controls/linkControl');

router.get('/:title', linkControl.redirect);

router.post('/', express.urlencoded({ extended: true }), linkControl.addLink);

router.get('/', (req, res) => res.render('index'));

module.exports = router;