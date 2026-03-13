const express = require('express');
const { createPayment, getPayments } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Obtenir tous les paiements
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Liste des paiements
 *   post:
 *     summary: Enregistrer un paiement (met à jour le statut de la facture)
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - factureId
 *               - montant
 *             properties:
 *               factureId:
 *                 type: string
 *                 description: ID de la facture (ObjectId MongoDB)
 *                 example: "69b3b80e184301a41b789cd9"
 *               montant:
 *                 type: number
 *                 minimum: 0
 *                 example: 500.00
 *               datePaiement:
 *                 type: string
 *                 format: date
 *                 description: Date du paiement (optionnelle, défaut aujourd'hui)
 *                 example: "2026-03-13"
 *               commentaire:
 *                 type: string
 *                 example: Paiement partiel
 *     responses:
 *       201:
 *         description: Paiement enregistré
 */
router.post('/', createPayment);
router.get('/', getPayments);

module.exports = router;
