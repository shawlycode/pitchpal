
export const adminAuthorization = (req, res, next) => {
  try {
    if (req.session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    } else {
      return res.status(200).json({ message: 'Access Granted' });
    }
  } catch (error) {
    next(error)

  }

};




