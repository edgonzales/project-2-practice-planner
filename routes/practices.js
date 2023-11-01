var express = require('express');
var router = express.Router();
const practicesCtrl = require('../controllers/practices')

/* GET users listing. */
router.get('/', practicesCtrl.index);
router.get('/new', practicesCtrl.new);
router.post('/', practicesCtrl.create);
router.get('/:id', practicesCtrl.show);

module.exports = router;
