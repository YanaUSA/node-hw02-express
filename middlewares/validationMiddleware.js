const Joi = require("joi");

const postContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[0-9-()+ ]+$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `missing required '${validationError}' field` });
  }

  next();
};

const putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    phone: Joi.string().min(3).max(15),
  }).min(1);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: "missing field",
    });
  }

  next();
};

module.exports = {
  postContactValidation,
  putContactValidation,
};
