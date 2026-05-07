const express = require("express");
const router = express.Router();
const service = require('../services/users');
const private = require('../middlewares/private')


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupèrer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
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
 *                   username:
 *                     type: string
 *                     example: john_123
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: john@mail.com
 *       404:
 *         description: Aucun utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/', private.checkJWT, service.getAll);


/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupèrer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *           example: john@mail.com
 *         description: Email de l'utilisateur
 *     responses:
 *       200:
 *         description: Un utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 username:
 *                   type: string
 *                   example: john_123
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@mail.com
 *       404:
 *         description: Aucun utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:email', private.checkJWT, service.getByMail);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_123
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@mail.com
 *               password:
 *                 type: string
 *                 example: Password123.
 *     responses:
 *       201:
 *         description: utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 username:
 *                   type: string
 *                   example: john_123
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@mail.com
 *       500:
 *         description: Erreur serveur
 */
router.post('/', service.add);


/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *           example: john@mail.com
 *         description: Email de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_123
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@mail.com
 *               password:
 *                 type: string
 *                 example: Password123.
 *     responses:
 *       200:
 *         description: utilisateur modifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7"
 *                 username:
 *                   type: string
 *                   example: john_123
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@mail.com
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun utilisateur trouvé avec cet email
 *       500:
 *         description: Erreur serveur
 */
router.put('/:email', private.checkJWT, service.updates);


/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *           example: john@mail.com
 *         description: Email de l'utilisateur
 *     responses:
 *       200:
 *         description: utilisateur supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun utilisateur trouvé avec cet email
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:email', private.checkJWT, service.delete);


module.exports = router;