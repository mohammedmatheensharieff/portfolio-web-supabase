import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import sanitizeUser from '../utils/sanitizeUser.js';
import authRequired from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (userId, email) =>
  jwt.sign({ sub: userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const withValidation = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  return next();
};

router.post(
  '/register',
  withValidation([
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').optional().isLength({ min: 2 }).withMessage('Username should be at least 2 characters'),
  ]),
  async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email: email.toLowerCase(),
        password: passwordHash,
        username,
      });

      const token = signToken(user._id.toString(), user.email);
      res.status(201).json({ token, user: sanitizeUser(user) });
    } catch (error) {
      next(error);
    }
  }
);

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
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signToken(user._id.toString(), user.email);
      res.json({ token, user: sanitizeUser(user) });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/me', authRequired, (req, res) => {
  res.json({ user: req.user });
});

router.put(
  '/profile',
  authRequired,
  withValidation([
    body('username').optional({ checkFalsy: true }).isLength({ min: 2, max: 40 }).withMessage('Username should be 2-40 characters'),
    body('fullName').optional({ checkFalsy: true }).isLength({ min: 2, max: 80 }).withMessage('Full name should be 2-80 characters'),
    body('avatarUrl').optional({ checkFalsy: true }).isURL().withMessage('Avatar must be valid URL'),
  ]),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (typeof req.body.username === 'string') user.username = req.body.username.trim() || undefined;
      if (typeof req.body.fullName === 'string') user.fullName = req.body.fullName.trim() || undefined;
      if (typeof req.body.avatarUrl === 'string') user.avatarUrl = req.body.avatarUrl.trim() || undefined;

      await user.save();
      res.json({ user: sanitizeUser(user) });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/forgot-password',
  withValidation([body('email').isEmail().withMessage('Valid email required')]),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res.json({ message: 'If that email exists, a reset link has been sent.' });
      }

      await ResetToken.deleteMany({ user: user._id });

      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

      await ResetToken.create({ user: user._id, tokenHash, expiresAt });

      console.log(`Password reset token for ${email}: ${rawToken}`);

      res.json({
        message: 'Password reset instructions sent.',
        token: rawToken,
        resetUrl: `${process.env.CLIENT_ORIGIN?.split(',')[0] || 'http://localhost:5173'}/reset-password?token=${rawToken}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/reset-password',
  withValidation([
    body('token').notEmpty().withMessage('Reset token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ]),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      const resetRecord = await ResetToken.findOne({ tokenHash, consumed: false }).populate('user');
      if (!resetRecord || resetRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Reset token invalid or expired' });
      }

      resetRecord.consumed = true;
      await resetRecord.save();

      resetRecord.user.password = await bcrypt.hash(password, 10);
      await resetRecord.user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
