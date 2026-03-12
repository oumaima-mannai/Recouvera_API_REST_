const Joi = require('joi');

const validateClient = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(2).required(),
        prenom: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        telephone: Joi.string().min(8).required(),
        adresse: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateClientUpdate = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(2),
        prenom: Joi.string().min(2),
        email: Joi.string().email(),
        telephone: Joi.string().min(8),
        adresse: Joi.string(),
    });
    return schema.validate(data);
};

module.exports = { validateClient, validateClientUpdate };
