const express = require("express");
const service = require('../services/reservations');
const router = express.Router();
const private = require('../middlewares/private')



/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations d'un catway
 *     tags: [Réservations]
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
 *         description: Liste des réservations du catway
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
 *                   clientName:
 *                     type: string
 *                     example: John Doe
 *                   boatName:
 *                     type: string
 *                     example: Mimosa
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2026-03-24"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2026-06-24"
 *       404:
 *         description: Catway ou réservation non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucune réservation trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/reservations', private.checkJWT, service.getAll)


/**
 * @swagger
 * /catways/{id}/reservations/{id}:
 *   get:
 *     summary: Récupère une réservation d'un catway
 *     tags: [Réservations]
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7"
 *         description: Numéro id de la reservation
 *     responses:
 *       200:
 *         description: réservation d'un catway
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f1a2b3c4d5e6f7"
 *                   catwayNumber:
 *                     type: number
 *                     example: 1
 *                   clientName:
 *                     type: string
 *                     example: John Doe
 *                   boatName:
 *                     type: string
 *                     example: Mimosa
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2026-03-24"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2026-06-24"
 *       404:
 *         description: Catway ou réservation non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucune réservation trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/reservations/:idReservation', private.checkJWT, service.getById)


/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Créer une réservation pour un catway
 *     tags: [Réservations]
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
 *               - catwayNumber
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 1
 *               clientName:
 *                 type: string
 *                 example: John Doe
 *               boatName:
 *                 type: string
 *                 example: Mimosa
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-24"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-24"
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
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
 *                 clientName:
 *                   type: string
 *                   example: John Doe
 *                 boatName:
 *                   type: string
 *                   example: Mimosa
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2026-03-24"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2026-06-24"
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
router.post('/:id/reservations', private.checkJWT, service.add)


/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifier une réservation pour un catway
 *     tags: [Réservations]
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7"
 *         description: Numéro id de la reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 1
 *               clientName:
 *                 type: string
 *                 example: John Doe
 *               boatName:
 *                 type: string
 *                 example: Mimosa
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-24"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-24"
 *     responses:
 *       200:
 *         description: Réservation modifiée avec succès
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
 *                 clientName:
 *                   type: string
 *                   example: John Doe
 *                 boatName:
 *                   type: string
 *                   example: Mimosa
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2026-03-24"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2026-06-24"
 *       404:
 *         description: Catway non trouvé ou réservation non trouvée
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
router.put('/:id/reservations/:idReservation', private.checkJWT, service.updates)


/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation pour un catway
 *     tags: [Réservations]
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
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7"
 *         description: Numéro id de la reservation
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
 *         description: Catway non trouvé ou réservation non trouvée
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
router.delete('/:id/reservations/:idReservation', private.checkJWT, service.delete)




module.exports = router