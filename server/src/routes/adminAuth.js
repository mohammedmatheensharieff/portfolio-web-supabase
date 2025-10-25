import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sanitizeUser from '../utils/sanitizeUser.js';
import adminRequired, { ADMIN_COOKIE_NAME, signAdminToken } from '../middleware/admin.js';

const router = express.Router();

const withValidation = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  return next();
};

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
};

router.post(
  '/login',
  withValidation([
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || user.role !== 'admin') {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }

      const token = signAdminToken(user._id.toString());
      res.cookie(ADMIN_COOKIE_NAME, token, cookieOptions);
      res.json({ admin: sanitizeUser(user) });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
  res.json({ message: 'Logged out' });
});

router.get('/me', adminRequired, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
