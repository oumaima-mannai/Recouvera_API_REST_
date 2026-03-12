const mongoose = require('mongoose');

const recoveryActionSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    factureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invoice',
    },
    typeAction: {
        type: String,
        required: true,
        enum: ['appel', 'email', 'courrier', 'visite'],
    },
    note: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const RecoveryAction = mongoose.model('RecoveryAction', recoveryActionSchema);
module.exports = RecoveryAction;
