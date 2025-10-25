import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const authRequired = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub).lean();

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = sanitizeUser(user);
    return next();
  } catch (error) {
    console.error('Auth middleware error', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authRequired;
