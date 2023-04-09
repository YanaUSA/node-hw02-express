const Joi = require("joi");

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

const postUserValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(PASSWD_REGEX).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `${validationError} field doesn't match the pattern` });
  }

  next();
};

const postUserLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(PASSWD_REGEX).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `${validationError} field doesn't match the pattern` });
  }

  next();
};

const patchAvatarValidation = (req, res, next) => {
  const schema = Joi.object({
    avatarURL: Joi.string().uri(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `${validationError} field doesn't match the pattern` });
  }

  next();
};

module.exports = {
  postUserValidation,
  postUserLoginValidation,
  patchAvatarValidation,
};
