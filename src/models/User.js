const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    minlengh: 5,
    maxlengh: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  matnumber: {
    type: String,
    required: true,
    minlengh: 3,
    maxlength: 11,
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    required: true
  },
  level: {
    type: String,
  },
  paymentStatus: {
    type: String,
    default: 'N'
  },
  createdAt: String,
});

const User = mongoose.model('User', schema)

const validateUser = (user) => {
  return Joi.object({
    username: Joi.string().min(1).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(1).max(50).required(),
    matnumber: Joi.string().alphanum().min(3).max(10).required(),
    role: Joi.string().required()
  }).validate(user)
}

const validateUserLogin = (user) => {
  return Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(1).max(50).required(),
  }).validate(user)
}

exports.User = User
exports.validateUser = validateUser
exports.validateUserLogin = validateUserLogin