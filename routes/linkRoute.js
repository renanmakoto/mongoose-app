const express = require('express');
const router = express.Router();
const linkControl = require('../controls/linkControl');

router.get('/all', linkControl.allLinks);

router.get('/:title', linkControl.redirect);

router.post('/', express.urlencoded({ extended: true }), linkControl.addLink);

router.get('/', (req, res) => res.render('index', { error: false, body: {} }));

module.exports = router;