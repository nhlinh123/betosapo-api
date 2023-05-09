const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const create = (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    companyName: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.string().required(),
    number: Joi.number().required(),
    position: Joi.string().required(),
    jobType: Joi.string().required(),
    status: Joi.string().required(),
    userId: Joi.number().required(),
    categoryId: Joi.number().required(),
    picturePath: Joi.array().required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  create,
};
