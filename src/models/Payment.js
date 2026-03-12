const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    factureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invoice',
    },
    montant: {
        type: Number,
        required: true,
    },
    datePaiement: {
        type: Date,
        default: Date.now,
    },
    commentaire: {
        type: String,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
