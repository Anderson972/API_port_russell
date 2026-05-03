var express = require('express');
var router = express.Router();
const private = require('../middlewares/private');
const service = require('../services/users')

const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

// Routes
const catwaysRouter = require('./catways');
const usersRouter = require('./users');
const reservationsRouter = require('./reservations');
const reservation = require('../models/reservation');
// const reservation = require('../models/reservation');



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
router.use('/catways',reservationsRouter);


router.get('/dashboard', private.checkJWT, async (req, res) => {
  
  const catway = await Catway.find()        
  const reservation = await Reservation.find()

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
        date_now: date_now,
        reservations    : reservation
    })
});

router.get('/reservations', private.checkJWT, async (req, res) => {
  const id = parseInt(req.query.id)
  try {
    if (id) {
      return res.redirect(`/catways/${id}/reservations`)
    }
    return res.render('reservations', {
      title         : 'Réservations',
      current       : 'reservations',
      reservations  : [],        
      err_notFind   : null,
      err_msg       : false,
      catway_num    : ''
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur reservations'})
  }
});

router.get('/catways/:id/reservations', private.checkJWT, async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway){
      const reservations = await Reservation.find({catwayNumber : id})
      return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : reservations,
        err_notFind   : reservations.length === 0 ?'Aucune réservation pour ce catway': null ,
        err_msg       : reservations.length === 0 ? true : false,
        catway_num    : id
      })
    }
    return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : [],
        err_notFind   : `le catway${id} n'existe pas`,
        err_msg       : true,
        catway_num    : id
    })
  } catch (error) {
      console.error(error)
      return res.status(500).json({message : 'erreur serveur reservations list'})
  }
});

router.delete('/catways/:id/reservation/:idReservation', private.checkJWT, async (req, res) => {
  const id            = parseInt(req.params.id)
  const idReservation = req.params.idReservation
  try {
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway) {
      const reservation = await Reservation.findById(idReservation)
      if (reservation) {
        console.log('N° _id' + idReservation)
        await Reservation.deleteOne({_id : idReservation})
        return res.redirect(`/catways/${id}/reservations`)
      }
      return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : reservation,
        err_notFind   : 'Aucune réservation pour ce catway',
        err_msg       : true,
        catway_num    : id
      })
    }
    return res.render('reservations', {
      title         : 'Réservations',
      current       : 'reservations',
      reservations  : [],        
      err_notFind   : 'Catway non trouvé',
      err_msg       : true,
      catway_num    : ''
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur suppression'})
  }
});


module.exports = router;
