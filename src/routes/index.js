var express = require('express');
var router = express.Router();
const catwaysRouter = require('./catways');
const usersRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
module.exports = router;
