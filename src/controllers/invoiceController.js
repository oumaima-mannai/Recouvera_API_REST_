const Invoice = require('../models/Invoice');
const Client = require('../models/Client');
const { validateInvoice, validateInvoiceUpdate } = require('../validators/invoiceValidator');

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
    const { error } = validateInvoice(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { clientId, montant, dateEmission, dateEcheance, statut } = req.body;

    try {
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const invoice = await Invoice.create({
            clientId,
            montant,
            dateEmission,
            dateEcheance,
            statut,
        });

        res.status(201).json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('clientId', 'nom prenom email');
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get invoice by ID
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('clientId', 'nom prenom email');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
    const { error } = validateInvoiceUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        if (req.body.clientId) {
            const client = await Client.findById(req.body.clientId);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
        }

        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json({ message: 'Invoice removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
