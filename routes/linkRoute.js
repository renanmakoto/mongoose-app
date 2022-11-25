const express = require('express');
const router = express.Router();
const linkControl = require('../controls/linkControl');

router.get('/:title', linkControl.redirect);

router.get('/', (req, res) => res.send('Hello, World!'));

module.exports = router;