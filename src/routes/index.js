var express = require('express');
var router = express.Router();


// Routes
const catwaysRouter = require('./catways');
const usersRouter = require('./users');
const reservationsRouter = require('./reservations');



// login 
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Accueil - se connecter',
    errors : null
  })
});

router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/',reservationsRouter);


module.exports = router;
