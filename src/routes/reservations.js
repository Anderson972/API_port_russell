const express = require("express");
const service = require('../services/reservations');
const router = express.Router();
const private = require('../middlewares/private')

router.get('/catways/:id/reservations', private.checkJWT, service.getAll)
router.get('/catways/:id/reservations/:idReservation', private.checkJWT, service.getById)
router.post('/catways/:id/reservations', private.checkJWT, service.add)
router.put('/catways/:id/reservations/:idReservation', private.checkJWT, service.updates)
router.delete('/catways/:id/reservations/:idReservation', private.checkJWT, service.delete)

module.exports = router