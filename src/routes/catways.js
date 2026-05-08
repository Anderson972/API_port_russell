const express = require("express");
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private')



/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f1a2b3c4d5e6f7"
 *                   catwayNumber:
 *                     type: number
 *                     example: 1
 *                   catwayType:
 *                     type: string
 *                     example: long
 *                   catwayState:
 *                     type: string
 *                     example: Bon état
 *       404:
 *         description: Aucun catway trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun catway trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/catways', private.checkJWT, service.getAll)

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 catwayNumber:
 *                   type: number
 *                   example: 1
 *                 catwayType:
 *                   type: string
 *                   example: long
 *                 catwayState:
 *                   type: string
 *                   example: Bon état
 *       404:
 *         description: Catway non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/catways/:id', private.checkJWT, service.getById)

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 1
 *               catwayType:
 *                 type: string
 *                 enum: [short, long]
 *                 example: long
 *               catwayState:
 *                 type: string
 *                 example: Bon état
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 catwayNumber:
 *                   type: number
 *                   example: 1
 *                 catwayType:
 *                   type: string
 *                   example: long
 *                 catwayState:
 *                   type: string
 *                   example: Bon état
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur serveur
 */
router.post('/catways', private.checkJWT, service.add)

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifier l'état d'un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: Bon état
 *     responses:
 *       200:
 *         description: Catway modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 catwayNumber:
 *                   type: number
 *                   example: 1
 *                 catwayType:
 *                   type: string
 *                   example: long
 *                 catwayState:
 *                   type: string
 *                   example: Bon état
 *       404:
 *         description: Catway non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/catways/:id', private.checkJWT, service.updates)

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway par son numéro
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/catways/:id', private.checkJWT, service.delete)

module.exports = router;