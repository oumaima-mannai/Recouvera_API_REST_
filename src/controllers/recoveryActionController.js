const RecoveryAction = require('../models/RecoveryAction');
const Client = require('../models/Client');
const Invoice = require('../models/Invoice');
const { validateRecoveryAction } = require('../validators/recoveryActionValidator');

// @desc    Record a new recovery action
// @route   POST /api/recovery-actions
// @access  Private
const createRecoveryAction = async (req, res) => {
    const { error } = validateRecoveryAction(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { clientId, factureId, typeAction, note, date } = req.body;

    try {
        const client = await Client.findById(clientId);
        const invoice = await Invoice.findById(factureId);

        if (!client || !invoice) {
            return res.status(404).json({ message: 'Client or Invoice not found' });
        }

        const action = await RecoveryAction.create({
            clientId,
            factureId,
            typeAction,
            note,
            date,
        });

        res.status(201).json(action);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get recovery actions (with optional filter by clientId)
// @route   GET /api/recovery-actions
// @access  Private
const getRecoveryActions = async (req, res) => {
    try {
        const filter = {};

        if (req.query.clientId) {
            filter.clientId = req.query.clientId;
        }

        const actions = await RecoveryAction.find(filter)
            .populate('clientId', 'nom prenom')
            .populate('factureId', 'montant statut');

        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createRecoveryAction,
    getRecoveryActions,
};
