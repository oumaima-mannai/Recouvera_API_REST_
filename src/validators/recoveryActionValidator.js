const Joi = require('joi');

const validateRecoveryAction = (data) => {
    const schema = Joi.object({
        clientId: Joi.string().required(),
        factureId: Joi.string().required(),
        typeAction: Joi.string().valid('appel', 'email', 'courrier', 'visite').required(),
        note: Joi.string().required(),
        date: Joi.date(),
    });
    return schema.validate(data);
};

module.exports = { validateRecoveryAction };
