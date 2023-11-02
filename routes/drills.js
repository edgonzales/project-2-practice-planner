var express = require('express');
var router = express.Router();
const drillsCtrl = require('../controllers/drills')

/* GET users listing. */
router.get('/', drillsCtrl.index);
router.get('/new', drillsCtrl.new);
router.post('/', drillsCtrl.create);
router.get('/:id', drillsCtrl.show);
router.delete('/:id', drillsCtrl.deleteDrill);
router.get('/:id/edit', drillsCtrl.edit);
router.put('/:id', drillsCtrl.update);

module.exports = router;
