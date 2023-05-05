const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const signup = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    companyname: Joi.string().trim().max(500).required(),
    phonenumber: Joi.string().trim().alphanum().min(3).max(20).required(),
    type: Joi.string().trim().uppercase().required(),
  });
  validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  signup,
  signin,
};
