import Joi from "joi";

export const signupValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
    walletAddress: Joi.string().required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message
    });
  }

  next();
}

export const loginValidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message
    });
  }

  next();
}
