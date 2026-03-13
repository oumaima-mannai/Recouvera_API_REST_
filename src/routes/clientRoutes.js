const express = require('express');
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply protect middleware to all client routes
router.use(protect);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste des clients
 *   post:
 *     summary: Ajouter un client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - telephone
 *               - adresse
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Dupont
 *               prenom:
 *                 type: string
 *                 example: Jean
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jean.dupont@example.com
 *               telephone:
 *                 type: string
 *                 example: "0612345678"
 *               adresse:
 *                 type: string
 *                 example: 123 Rue Example, 75001 Paris
 *     responses:
 *       201:
 *         description: Client créé
 */
router.route('/')
    .post(createClient)
    .get(getClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtenir un client par ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du client
 *   put:
 *     summary: Mettre à jour un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Dupont
 *               prenom:
 *                 type: string
 *                 example: Jean
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jean.dupont@example.com
 *               telephone:
 *                 type: string
 *                 example: "0612345678"
 *               adresse:
 *                 type: string
 *                 example: 123 Rue Example, 75001 Paris
 *     responses:
 *       200:
 *         description: Client mis à jour
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client supprimé
 */
router.route('/:id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);

module.exports = router;
