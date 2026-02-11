import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    // support `Authorization: Bearer <token>` or `token: <token>` header
    let token = req.headers.authorization || req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    if (token.startsWith('Bearer ')) token = token.slice(7);

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload || !payload.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    // attach admin info to request if needed
    req.admin = { email: payload.email };

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

export default adminAuth
