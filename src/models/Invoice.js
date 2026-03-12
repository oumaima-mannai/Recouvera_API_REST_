const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    montant: {
        type: Number,
        required: true,
    },
    dateEmission: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateEcheance: {
        type: Date,
        required: true,
    },
    statut: {
        type: String,
        required: true,
        enum: ['unpaid', 'partially_paid', 'paid'],
        default: 'unpaid',
    },
}, {
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
