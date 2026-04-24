var express = require('express');
var router = express.Router();
const catwaysRouter = require('./catways')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/catways', catwaysRouter);
module.exports = router;
