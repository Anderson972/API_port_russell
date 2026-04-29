const express = require("express");
const router = express.Router();
const service = require('../services/users');
const private = require('../middlewares/private')

router.get('/', private.checkJWT, service.getAll);
router.get('/:email', private.checkJWT, service.getByMail);
router.post('/', service.add);
router.put('/:email', private.checkJWT, service.updates);
router.delete('/:email', private.checkJWT, service.delete);

//Gestion de la connexion
router.post('/login', service.authenticate);
router.get('/logout', service.logout);

module.exports = router;