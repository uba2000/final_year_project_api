
const verifyAuth = require('../utils/VerifyAuth');
const { User } = require('../models/User');
const { Transaction } = require('../models/Transaction');

module.exports = {
  async getTransactions(req, res) {
    try {
      const studentAuth = verifyAuth({ req });

      // const student = await User.findById(studentAuth._id)
      const studentTransactions;
      if (studentAuth.role == 'S') {
        studentTransactions = await Transaction.find({ user: studentAuth._id });
      }
      return res.status(200).send({ status: "success", message: "Successful", userTransactions });
    } catch (error) {
      return res.status(500).send({ status: "error", message: "An error occured" });
    }

  }
}