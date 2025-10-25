import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from '../models/User.js';
import sanitizeUser from '../utils/sanitizeUser.js';

export const ADMIN_COOKIE_NAME = 'admin_token';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'dev-admin-secret';
const ADMIN_TOKEN_EXPIRY = process.env.ADMIN_JWT_EXPIRES_IN || '1d';

export const signAdminToken = (userId) =>
  jwt.sign({ sub: userId, scope: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: ADMIN_TOKEN_EXPIRY });

export const cookieMiddleware = cookieParser();

const adminRequired = async (req, res, next) => {
  try {
    const token = req.cookies?.[ADMIN_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }

    const payload = jwt.verify(token, ADMIN_JWT_SECRET);
    const user = await User.findById(payload.sub).lean();

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    req.admin = sanitizeUser(user);
    return next();
  } catch (error) {
    console.error('Admin auth error', error);
    return res.status(401).json({ message: 'Invalid or expired admin session' });
  }
};

export default adminRequired;
