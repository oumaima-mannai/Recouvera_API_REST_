const Joi = require('joi');

const validateInvoice = (data) => {
    const schema = Joi.object({
        clientId: Joi.string().required(), // expecting an ObjectId string
        montant: Joi.number().positive().required(),
        dateEmission: Joi.date(),
        dateEcheance: Joi.date().required(),
        statut: Joi.string().valid('unpaid', 'partially_paid', 'paid'),
    });
    return schema.validate(data);
};

const validateInvoiceUpdate = (data) => {
    const schema = Joi.object({
        clientId: Joi.string(),
        montant: Joi.number().positive(),
        dateEmission: Joi.date(),
        dateEcheance: Joi.date(),
        statut: Joi.string().valid('unpaid', 'partially_paid', 'paid'),
    });
    return schema.validate(data);
};

module.exports = { validateInvoice, validateInvoiceUpdate };
