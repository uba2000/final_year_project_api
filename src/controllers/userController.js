const bcrypt = require('bcrypt');

const { validateUser, validateUserLogin, User } = require('../models/User');
const generateToken = require('../utils/GenerateToken');
const verifyAuth = require('../utils/VerifyAuth');

module.exports = {
  async registerUser(req, res) {
    try {
      let { value, error } = validateUser(req.body);

      if (error) return res.status(500).send({ status: "error", message: "Invalid data given", validationErrors: error });

      const getUser = await User.findOne({ email: value.email });
      if (getUser) {
        res.status(409).send({
          status: "error",
          message: "User already exists",
          validationErrors: {
            email: "Email already exist"
          }
        });
      }

      const password = await bcrypt.hash(value.password, 12);
      const registerUser = await User.create({
        ...value,
        password,
        createdAt: new Date().toISOString()
      });

      const token = await generateToken(registerUser);

      return res.status(200).send({
        status: "error",
        message: "Successful",
        token: token
      });
    } catch (error) {
      return res.status(500).send({ status: "error", message: "An error occured", validateError: error });
    }
  },

  async loginUser(req, res) {
    try {
      const { error, value } = validateUserLogin(req.body);

      if (error) return res.status(400).send({ status: "error", message: "Invalid data given", validationErrors: error });

      const user = await User.findOne({ email: valiue.email });

      if (!user) {
        return res.send({ status: "error", message: "User does not exist" });
      }

      const passwordValid = await bcrypt.compare(value.password, user.password);
      if (!passwordValid) {
        return res.send({ status: "error", message: "Account password incorrect" });
      }

      const token = await generateToken(user);

      return res.status(200).send({ status: "success", message: "Successful", token: token });
    } catch (error) {
      return res.status(500).send({ status: "error", message: "An error occured" });
    }
  },

  async getUser(req, res) {
    try {
      const userAuth = verifyAuth({ req });

      const user = await User.findById(userAuth._id)
      return res.status(200).send({ status: "success", message: "Successful", user });
    } catch (error) {
      return res.status(500).send({ status: "error", message: "An error occured" });
    }
  },
}