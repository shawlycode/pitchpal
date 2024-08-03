export const isAuthenticated = async (req, res, next) => {

  // check if session has user
  if (req.session.user) {
    next()
  }
  else {
    res.status(401).json('User not authenticated');
  }
}