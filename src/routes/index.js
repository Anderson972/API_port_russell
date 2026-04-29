var express = require('express');
var router = express.Router();
const private = require('../middlewares/private');
const service = require('../services/users')


// Routes
const catwaysRouter = require('./catways');
const usersRouter = require('./users');
const reservationsRouter = require('./reservations');



// login 
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Accueil - se connecter',
    errors    : null,
    mail      : '',
    isInvalid : false
  });
});

//Gestion de la connexion
router.post('/login', service.authenticate);
router.get('/logout', service.logout);


router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/',reservationsRouter);


router.get('/dashboard', private.checkJWT, (req, res) => {
    const now = new Date();

    const date_now = now.toLocaleString('fr-FR', {
        weekday   : 'long',
        day       : '2-digit',
        month     : 'long',
        year      : 'numeric'}) + ' ' + now.toLocaleTimeString('fr-FR', { 
        hour      : '2-digit',
        minute    : '2-digit',
        second    : '2-digit',
    });

    res.render('dashboard',{
        title   : 'Tableau de bord',
        current : 'dashboard',
        username: req.decoded.user.username,
        mail    : req.decoded.user.email,
        date_now: date_now
    })
});



module.exports = router;
