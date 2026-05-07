var express = require('express');
var router = express.Router();
const private = require('../middlewares/private');
const service = require('../services/users')

const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const User = require('../models/user');

// Routes
const catwaysRouter = require('./catways');
const usersRouter = require('./users');
const reservationsRouter = require('./reservations');
const reservation = require('../models/reservation');




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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentification utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@mail.com"
 *               password:
 *                 type: string
 *                 example: "MonMotDePasse@123"
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "authenticate_success"
 *       403:
 *         description: Mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "wrong_credentials"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user_not_found"
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', service.authenticate);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnexion utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "logout_success"
 */
router.get('/logout', service.logout);


router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/catways',reservationsRouter);

//Accès Tableau de bord
router.get('/dashboard', private.checkJWT, async (req, res) => {
  
  
  try {
    
    const catway = await Catway.find() 
          
    const reservations = await Reservation.find().sort({ startDate: -1 })

    const now = new Date();
    const date_now = now.toLocaleString('fr-FR', {
      weekday   : 'long',
      day       : '2-digit',
      month     : 'long',
      year      : 'numeric'
    });
    return res.render('dashboard',{
      title           : 'Tableau de bord',
      current         : 'dashboard',
      username        : req.decoded.user.username,
      mail            : req.decoded.user.email,
      date_now        : date_now,
      reservations    : reservations
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur reservations'})
  }
  
});
// début Crud Réservation

//reservation
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
      succ_msg      : false,
      err_create    : false
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
  const error = req.query.error === 'true'
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
        succ_msg      : success,
        err_create    : error
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
        succ_msg      : false,
        err_create    : false
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
        succ_msg      : false,
        err_create    : error
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
      succ_msg      : false,
      err_create    : error
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
          dateMin       : new Date().toISOString().split('T')[0],
          err_notFind   : null,
          err_msg       : false

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
        return res.render('oneReservation', {
          title         : 'Réservation n°' + idReservation.toString().slice(0, 5).toUpperCase(),
          current       : 'reservations',
          reservationNum: idReservation.toString().slice(0, 5).toUpperCase(),
          reservation   : reservation,
          catway_num    : id,
          dateMin       : new Date().toISOString().split('T')[0],
          err_notFind   : null,
          err_msg       : false
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
      return res.redirect(`/catways/${id}/reservations?error=true`)
    }
    return res.render('reservations', {
        title         : 'Réservations',
        current       : 'reservations',
        reservations  : [],
        err_notFind   : `le catway${id} n'existe pas`,
        err_msg       : true,
        catway_num    : id,
        dateMin       : new Date().toISOString().split('T')[0],
        succ_msg      : false,
        err_create    : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur add'})
  }
})
// Fin Crud Féservation

// début Crud Catways
// ALL catways
router.get('/catways', private.checkJWT, async (req, res) => {
  const success = req.query.success === 'true'
  const error = req.query.error === 'true'
  try {
    const catways = await Catway.find().sort({catwayNumber : 1})
    if (catways) {
      return res.render('catways', {
      title         : 'Catways',
      current       : 'catways',
      catways       : catways,        
      err_notFind   : null,
      err_msg       : false,
      catway_num    : '',
      succ_msg      : success,
      err_create    : error
    })
    }
    return res.render('catways', {
      title         : 'Catways',
      current       : 'catways',
      catways       : [],        
      err_notFind   : 'Aucun catways enregistré',
      err_msg       : true,
      catway_num    : '',
      succ_msg      : false,
      err_create    : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur catways'})
  }
});

// create catway
router.post('/catways', private.checkJWT, async (req, res) => {
  const temp = ({
    catwayNumber    : req.body.catwayNumber,
    catwayType      : req.body.catwayType,
    catwayState     : req.body.catwayState
  });
  try {
    const catway = await Catway.create(temp)
    if (catway) {
      return res.redirect('/catways?success=true')
    }
    return res.redirect('/catways?error=true')
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur create catways'})
  }
});

// Get ONE catway
router.get('/catways/:id', private.checkJWT, async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway) {
      return res.render('oneCatway', {
        title       : 'Catway n° ' + id,
        current     : 'catways',
        catway      : catway,
        err_msg     : false,
        err_notFind : null
      })
    }
    return res.render('oneCatway', {
        title       : 'Catway n° ' + id,
        current     : 'catways',
        catway      : null,
        err_msg     : true,
        err_notFind : 'Ce catway n\'existe pas',
        
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur  onecatways'})
  }
});

// Update catway
router.put('/catways/:id', private.checkJWT, async (req, res) => {

  const id = parseInt(req.params.id)
  const {catwayState} = req.body
  try {
    const catway = await Catway.findOne({catwayNumber : id})
    if (catway) {
      if(catwayState){
        catway.catwayState = catwayState
      }
      await catway.save()
      return res.render('oneCatway', {
        title       : 'Catway n° ' + id,
        current     : 'catways',
        catway      : catway,
        err_msg     : false,
        err_notFind : '',
        
      })
    }
    return res.render('oneCatway', {
        title       : 'Catway n° ' + id,
        current     : 'catways',
        catway      : null,
        err_msg     : true,
        err_notFind : 'Ce catway n\'existe pas',
        
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur  update catways'})
  }
});

//Delete catway
router.delete('/catways/:id', private.checkJWT, async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const catway = await Catway.deleteOne({catwayNumber : id})
    return res.redirect('/catways')
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur  delete catways'})
  }
});
//Fin CRUD catway

//Début CRUD users
//All users
router.get('/users', private.checkJWT, async (req, res) => {
  
  const success = req.query.success === 'true'
  const error = req.query.error === 'true'
  try {
    const users = await User.find()
    if (users) {
      return res.render('users', {
      title         : 'Utilisateurs',
      current       : 'users',
      users         : users,        
      err_notFind   : null,
      err_msg       : false,
      succ_msg      : success,
      err_create    : error
    })
    }
    return res.render('users', {
      title         : 'Utilisateurs',
      current       : 'users',
      users         : [],        
      err_notFind   : 'Aucun utilisateurs enregistré',
      err_msg       : true,
      succ_msg      : false,
      err_create    : false
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur users'})
  }
});

// create user
router.post('/users', private.checkJWT, async (req, res) => {
  const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    });
  try {
    const user = await User.create(temp)
    return res.redirect('/users?success=true')
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur create user'})
  }
});

//get one user
router.get('/users/:email', private.checkJWT, async (req, res) => {
  const email = req.params.email
  try {
    const user = await User.findOne({email : email})
    if (user) {
      return res.render('oneUser', {
        title       : user.username,
        current     : 'users',
        user        : user,
        err_msg     : false,
        err_notFind : null
      })
    }
    return res.render('oneUser', {
        title       : user.username,
        current     : 'users',
        catway      : null,
        err_msg     : true,
        err_notFind : 'Cet utilisateur n\'existe pas',
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur  oneuser'})
  }
});

// update user
router.put('/users/:email', private.checkJWT, async (req, res) => {

  const email = req.params.email
  const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    })
  try {
    const user = await User.findOne({email : email})
    if (user) {
      Object.keys(temp).forEach((key) => {
          if (!!user[key]) {
          user[key] = temp[key]
        }
      });
      await user.save()
      return res.render('oneUser', {
        title       : user.username,
        current     : 'users',
        user        : user,
        err_msg     : false,
        err_notFind : '',
      })
    };
    return res.render('oneUser', {
        title       : user.username,
        current     : 'users',
        user        : null,
        err_msg     : true,
        err_notFind : 'Cet utilisateur n\'existe pas',
        
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur  update catways'})
  }
});

// delete user
router.delete('/users/:email', private.checkJWT, async (req, res) => {
  const email = req.params.email
  try {
    const user = await User.deleteOne({email : email})
    return res.redirect('/users')
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : 'erreur serveur delete users'})
  }
});
module.exports = router;
