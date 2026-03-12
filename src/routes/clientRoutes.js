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
