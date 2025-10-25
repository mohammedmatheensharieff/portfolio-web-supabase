import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from '../models/User.js';
import sanitizeUser from '../utils/sanitizeUser.js';

export const ADMIN_COOKIE_NAME = 'admin_token';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'dev-admin-secret';
const ADMIN_TOKEN_EXPIRY = process.env.ADMIN_JWT_EXPIRES_IN || '1d';
const USER_JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const signAdminToken = (userId) =>
  jwt.sign({ sub: userId, scope: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: ADMIN_TOKEN_EXPIRY });

export const cookieMiddleware = cookieParser();

const resolveAdminFromToken = async (payload) => {
  const user = await User.findById(payload.sub).lean();
  if (!user || user.role !== 'admin') {
    return null;
  }
  return sanitizeUser(user);
};

const adminRequired = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.[ADMIN_COOKIE_NAME];

    if (cookieToken) {
      const payload = jwt.verify(cookieToken, ADMIN_JWT_SECRET);
      const admin = await resolveAdminFromToken(payload);
      if (!admin) {
        return res.status(403).json({ message: 'Admin privileges required' });
      }
      req.admin = admin;
      return next();
    }

    const header = req.headers.authorization || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!bearer) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }

    const payload = jwt.verify(bearer, USER_JWT_SECRET);
    const admin = await resolveAdminFromToken(payload);
    if (!admin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    console.error('Admin auth error', error);
    return res.status(401).json({ message: 'Invalid or expired admin session' });
  }
};

export default adminRequired;
