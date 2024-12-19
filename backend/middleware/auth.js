import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, 'your-jwt-secret'); // Replace with your actual secret
    req.user = await User.findById(decoded.user.id).select('-password'); 
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({msg:'Invalid token, authorization denied'});
  }
};

export default auth;