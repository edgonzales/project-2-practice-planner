var express = require('express');
var router = express.Router();
const drillsCtrl = require('../controllers/drills')

/* GET users listing. */
router.get('/', drillsCtrl.index);
router.get('/new', drillsCtrl.new);
router.post('/', drillsCtrl.create);
// router.get('/:id', drillsCtrl.show);

module.exports = router;
