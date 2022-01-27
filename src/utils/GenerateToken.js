const jwt = require('jsonwebtoken')

async function generateToken(context) {
  return await jwt.sign({
    _id: context._id,
    role: context.role,
  }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
}

module.exports = generateToken