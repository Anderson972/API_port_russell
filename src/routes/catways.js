const express = require("express");
const router = express.Router();

const service = require('../services/catways');
//const private = require('../middleware/private')

router.get('/catways', /* private.checkJWT, */ service.getAll)
router.get('/catways/:id', /* private.checkJWT, */ service.getById)
router.post('/catways', /* private.checkJWT, */ service.add)
router.put('/catways/:id', /* private.checkJWT, */ service.updates)
router.delete('/catways/:id', /* private.checkJWT, */ service.delete)

module.exports = router;