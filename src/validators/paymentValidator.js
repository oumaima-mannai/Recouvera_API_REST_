const Joi = require('joi');

const validatePayment = (data) => {
    const schema = Joi.object({
        factureId: Joi.string().required(),
        montant: Joi.number().positive().required(),
        datePaiement: Joi.date(),
        commentaire: Joi.string().allow('', null),
    });
    return schema.validate(data);
};

module.exports = { validatePayment };
