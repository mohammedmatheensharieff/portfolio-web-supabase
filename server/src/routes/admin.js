import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import adminRequired from '../middleware/admin.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const router = express.Router();

router.get('/users', adminRequired, async (req, res, next) => {
  try {
    const query = {};
    if (req.query.search) {
      const regex = new RegExp(String(req.query.search), 'i');
      query.$or = [{ email: regex }, { username: regex }, { fullName: regex }];
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    res.json({ users: users.map(sanitizeUser) });
  } catch (error) {
    next(error);
  }
});

const updateValidations = [
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
  body('username').optional({ checkFalsy: true }).isLength({ min: 2, max: 40 }).withMessage('Username must be 2-40 characters'),
  body('fullName').optional({ checkFalsy: true }).isLength({ min: 2, max: 80 }).withMessage('Full name must be 2-80 characters'),
  body('avatarUrl').optional({ checkFalsy: true }).isURL().withMessage('Avatar must be valid URL'),
  body('password').optional({ checkFalsy: true }).isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.patch('/users/:id', adminRequired, updateValidations, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (typeof req.body.role === 'string') user.role = req.body.role;
    if (typeof req.body.username === 'string') user.username = req.body.username.trim() || undefined;
    if (typeof req.body.fullName === 'string') user.fullName = req.body.fullName.trim() || undefined;
    if (typeof req.body.avatarUrl === 'string') user.avatarUrl = req.body.avatarUrl.trim() || undefined;
    if (typeof req.body.password === 'string' && req.body.password.trim()) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();
    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
