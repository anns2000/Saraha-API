const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().min(3).max(25).required(),
  phone: joi
    .string()
    .min(11)
    .max(11)
    .required()
    .pattern(/^([0-9]{11})/),
  password: joi
    .string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
  age: joi.number().min(18).max(40).required(),
});
module.exports.userValidation = (req, res, next) => {
  const errorList = [];
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.map((e) => {
      errorList.push(e.message);
    });
    res.json({ message: "Unconfirmed Data: Verify your data.", errors: errorList });
  } else {
    next();
  }
};
