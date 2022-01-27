const jwt = require('jsonwebtoken')

module.exports = ({ req }) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired Token', {
          authenticationError: error
        })
      }
    }
    throw new Error('Authentication Token must be \'Bearer <token>\'')
  }
  throw new Error('Authorization header must be provided')
}