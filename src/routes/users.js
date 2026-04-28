const express = require("express");
const router = express.Router();
const service = require('../services/users');
const private = require('../middlewares/private')

router.get('/users/', private.checkJWT, service.getAll);
router.get('/users/:email', private.checkJWT, service.getByMail);
router.post('/users/', service.add);
router.put('/users/:email', private.checkJWT, service.updates);
router.delete('/users/:email', private.checkJWT, service.delete);

//Gestion de la connexion
router.post('/login', service.authenticate);
router.get('/logout', service.logout);

module.exports = router;