const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^(\+380)\d{9}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
      unique: true,
    },
    city: {
      // required, validation ?
      type: String,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  password: Joi.string().min(8).max(32).required(),
  phone: Joi.alternatives([Joi.string(), Joi.number()]),
  // required, validation ?
  city: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  password: Joi.string().min(7).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
};

const User = model("users", userSchema);

module.exports = {
  User,
  schemas,
};
