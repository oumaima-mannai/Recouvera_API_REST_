const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const { validatePayment } = require('../validators/paymentValidator');

// @desc    Create a new payment and update invoice status
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is required' });
    }
    const { error } = validatePayment(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { factureId, montant, datePaiement, commentaire } = req.body;

    try {
        // Check if the invoice exists
        const invoice = await Invoice.findById(factureId);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Create the payment
        const payment = await Payment.create({
            factureId,
            montant,
            datePaiement,
            commentaire,
        });

        // Simple logic to update invoice status
        // If the payment amount exactly matches or exceeds the invoice amount, mark it 'paid'
        // Otherwise, mark it 'partially_paid'
        // For simplicity, we just check against the original invoice amount
        if (montant >= invoice.montant) {
            invoice.statut = 'paid';
        } else {
            invoice.statut = 'partially_paid';
        }

        await invoice.save();

        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('factureId');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createPayment,
    getPayments,
};
