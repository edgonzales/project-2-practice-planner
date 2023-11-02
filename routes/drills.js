var express = require('express');
var router = express.Router();
const drillsCtrl = require('../controllers/drills');
const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', isLoggedIn, drillsCtrl.index);
router.get('/new', isLoggedIn, drillsCtrl.new);
router.post('/', isLoggedIn, drillsCtrl.create);
router.get('/:id', isLoggedIn, drillsCtrl.show);
router.delete('/:id', isLoggedIn, drillsCtrl.deleteDrill);
router.get('/:id/edit', isLoggedIn, drillsCtrl.edit);
router.put('/:id', isLoggedIn, drillsCtrl.update);

module.exports = router;
