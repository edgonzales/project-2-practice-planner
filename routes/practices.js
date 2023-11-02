var express = require('express');
var router = express.Router();
const practicesCtrl = require('../controllers/practices');
const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', isLoggedIn, practicesCtrl.index);
router.get('/new', isLoggedIn, practicesCtrl.new);
router.post('/', isLoggedIn, practicesCtrl.create);
router.get('/:id', isLoggedIn, practicesCtrl.show);
router.delete('/:id', isLoggedIn, practicesCtrl.deletePractice);

module.exports = router;
