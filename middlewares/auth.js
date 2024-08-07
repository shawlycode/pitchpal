import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {

  // check if session has user
  if (req.session.user) {
    next()
  }
  else if (req.headers.authorization) {
    try {
      //extract token from headers
      const token = req.headers.authorization.split('')[1];
      //verify token to get user and append req
      req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    } catch (error) {

    }
  }
  res.status(401).json('User not authenticated');
}