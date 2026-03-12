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
 *     responses:
 *       201:
 *         description: Paiement enregistré
 */
router.post('/', createPayment);
router.get('/', getPayments);

module.exports = router;
