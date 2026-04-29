const express = require("express");
const service = require('../services/reservations');
const router = express.Router();
const private = require('../middlewares/private')

router.get('/:id/reservations', private.checkJWT, service.getAll)
router.get('/:id/reservations/:idReservation', private.checkJWT, service.getById)
router.post('/:id/reservations', private.checkJWT, service.add)
router.put('/:id/reservations/:idReservation', private.checkJWT, service.updates)
router.delete('/:id/reservations/:idReservation', private.checkJWT, service.delete)

module.exports = router