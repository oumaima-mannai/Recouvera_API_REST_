const express = require('express');
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Obtenir toutes les factures
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Liste des factures
 *   post:
 *     summary: Créer une facture
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - montant
 *               - dateEcheance
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID du client (ObjectId MongoDB)
 *                 example: "69b3b80e184301a41b789cd9"
 *               montant:
 *                 type: number
 *                 minimum: 0
 *                 example: 1500.00
 *               dateEmission:
 *                 type: string
 *                 format: date
 *                 description: Date d'émission (optionnelle, défaut aujourd'hui)
 *                 example: "2026-03-13"
 *               dateEcheance:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-13"
 *               statut:
 *                 type: string
 *                 enum: [unpaid, partially_paid, paid]
 *                 default: unpaid
 *                 example: unpaid
 *     responses:
 *       201:
 *         description: Facture créée
 */
router.route('/')
    .post(createInvoice)
    .get(getInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Obtenir une facture par ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la facture
 *   put:
 *     summary: Mettre à jour une facture
 *     tags: [Invoices]
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
 *               clientId:
 *                 type: string
 *                 example: "69b3b80e184301a41b789cd9"
 *               montant:
 *                 type: number
 *                 minimum: 0
 *                 example: 1500.00
 *               dateEmission:
 *                 type: string
 *                 format: date
 *               dateEcheance:
 *                 type: string
 *                 format: date
 *               statut:
 *                 type: string
 *                 enum: [unpaid, partially_paid, paid]
 *     responses:
 *       200:
 *         description: Facture mise à jour
 *   delete:
 *     summary: Supprimer une facture
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facture supprimée
 */
router.route('/:id')
    .get(getInvoiceById)
    .put(updateInvoice)
    .delete(deleteInvoice);

module.exports = router;
