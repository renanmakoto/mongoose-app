const express = require('express')
const methodOverride = require('method-override')
const router = express.Router();

router.use(methodOverride('_method'));

const linkControl = require('../controls/linkControl');

router.get('/', linkControl.allLinks);
router.get('/:title', linkControl.redirect);
router.get('/add', (req, res) => res.render('add', { error: false, body: {} }));
router.get('/edit/:id', linkControl.loadLink);

router.post('/', express.urlencoded({ extended: true }), linkControl.addLink);
router.post('/edit/:id', express.urlencoded({ extended: true }), linkControl.editLink);

router.delete('/:id', linkControl.deleteLink)
router.delete('/', express.urlencoded({ extended: true }), linkControl.deleteLink)

module.exports = router;
