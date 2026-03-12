const Client = require('../models/Client');
const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');

// @desc    Get dashboard statistics
// @route   GET /api/statistics
// @access  Private
const getStatistics = async (req, res) => {
    try {
        // 1. nombre total clients
        const totalClients = await Client.countDocuments();

        // 2. nombre factures impayées (unpaid and partially_paid)
        const unpaidInvoicesCount = await Invoice.countDocuments({
            statut: { $in: ['unpaid', 'partially_paid'] }
        });

        // 3. montant total dû
        // Sum of all invoices
        const allInvoices = await Invoice.find();
        let totalInvoiced = 0;
        allInvoices.forEach(inv => {
            totalInvoiced += inv.montant;
        });

        // 4. montant payé
        // Sum of all payments
        const allPayments = await Payment.find();
        let totalPaid = 0;
        allPayments.forEach(pay => {
            totalPaid += pay.montant;
        });

        // The total due is the difference
        const totalDueRemaining = totalInvoiced - totalPaid;

        res.json({
            nombreTotalClients: totalClients,
            nombreFacturesImpayees: unpaidInvoicesCount,
            montantTotalDu: totalDueRemaining,
            montantPaye: totalPaid,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = { getStatistics };
