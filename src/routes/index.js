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

//Accès Tableau de bord
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

//Crud reservation
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
      catway_num    : '',
      dateMin       : new Date().toISOString().split('T')[0],
      succ_msg      : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur reservations'})
  }
});
//All réservation par catway
router.get('/catways/:id/reservations', private.checkJWT, async (req, res) => {
  const id = parseInt(req.params.id)
  const success  = req.query.success === 'true'
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
        catway_num    : id,
        dateMin       : new Date().toISOString().split('T')[0],
        succ_msg      : success
      })
    }
    return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : [],
        err_notFind   : `le catway${id} n'existe pas`,
        err_msg       : true,
        catway_num    : id,
        dateMin       : new Date().toISOString().split('T')[0],
        succ_msg      : false
    })
  } catch (error) {
      console.error(error)
      return res.status(500).json({message : 'erreur serveur reservations list'})
  }
});

// Suppression d'une réservation d'un catway
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
        catway_num    : id,
        dateMin       : new Date().toISOString().split('T')[0],
        succ_msg      : false
      })
    }
    return res.render('reservations', {
      title         : 'Réservations',
      current       : 'reservations',
      reservations  : [],        
      err_notFind   : 'Catway non trouvé',
      err_msg       : true,
      catway_num    : '',
      dateMin       : new Date().toISOString().split('T')[0],
      succ_msg      : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur suppression'})
  }
});

// affichage d'une réservation
router.get('/catways/:id/reservation/:idReservation', private.checkJWT, async (req, res) => {
  const id            = parseInt(req.params.id)
  const idReservation = req.params.idReservation
  try {
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway) {
      const reservation = await Reservation.findById(idReservation)
      if (reservation) {
        return res.render('oneReservation', {
          title         : 'Réservation n°' + idReservation.toString().slice(0, 5).toUpperCase(),
          current       : 'reservations',
          reservationNum: idReservation.toString().slice(0, 5).toUpperCase(),
          reservation   : reservation,
          catway_num    : id,
          dateMin       : new Date().toISOString().split('T')[0]

        })
      }
      return res.render('erreur', {
        title         : 'Réservations',
        current       : 'reservations',
        err_notFind   : 'Cette réservation n\'existe pas',
        err_msg       : true
      })
    }
    return res.render('erreur', {
      title         : 'Réservations',
      current       : 'reservations',      
      err_notFind   : 'Ce catway n\'existe trouvé',
      err_msg       : true
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur update'})
  }
});

// modiffication d'une réservation
router.put('/catways/:id/reservation/:idReservation', private.checkJWT, async (req, res) => {
  const id            = parseInt(req.params.id)
  const idReservation = req.params.idReservation
  const temp = ({
        catwayNumber    : req.body.catwayNumber,
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,
        startDate       : req.body.startDate,
        endDate         : req.body.endDate
    })

  try {
    const catway = await Catway.findOne({catwayNumber : id})

    if (catway) {
      const reservation = await Reservation.findById(idReservation)
      if (reservation) {
        Object.keys(temp).forEach((key) => {
          if (!!temp[key]) {
            reservation[key] = temp[key]
          };
        });
        await reservation.save()
        console.log('N° _id : ' + reservation)
        return res.render('oneReservation', {
          title         : 'Réservation n°' + idReservation.toString().slice(0, 5).toUpperCase(),
          current       : 'reservations',
          reservationNum: idReservation.toString().slice(0, 5).toUpperCase(),
          reservation   : reservation,
          catway_num    : id,
          dateMin       : new Date().toISOString().split('T')[0]
        })
      }
      return res.render('oneReservation', {
        title         : 'Réservations',
        current       : 'reservations',
        err_notFind   : 'Cette réservation n\'existe pas',
        err_msg       : true
      })
    }
    return res.render('oneReservation', {
      title         : 'Réservations',
      current       : 'reservations',      
      err_notFind   : 'Ce catway n\'existe trouvé',
      err_msg       : true
    })
  } catch (error) {
    
    console.error(error)
    return res.status(500).json({message : 'erreur serveur update'})
  }
})

// Ajout d'une réservation d'un catway
router.post('/catways/:id/reservations', private.checkJWT, async (req, res) => {
  const id            = parseInt(req.params.id)
  const temp = ({
    catwayNumber    : req.body.catwayNumber,
    clientName      : req.body.clientName,
    boatName        : req.body.boatName,
    startDate       : req.body.startDate,
    endDate         : req.body.endDate
  })

  try {
    let succ_msg = true
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway) {
      const reservation = await Reservation.create(temp)
      if (reservation) {
        return res.redirect(`/catways/${id}/reservations?success=true`)
      }
      
    }
    return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : [],
        err_notFind   : `le catway${id} n'existe pas`,
        err_msg       : true,
        catway_num    : id,
        dateMin       : new Date().toISOString().split('T')[0],
        succ_msg      : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur add'})
  }
})

module.exports = router;
