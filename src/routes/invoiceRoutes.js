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
