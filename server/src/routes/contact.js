import express from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    await Promise.all([
      body('name').trim().notEmpty().withMessage('Name is required').run(req),
      body('email').isEmail().withMessage('Valid email is required').run(req),
      body('message').trim().isLength({ min: 3, max: 2000 }).withMessage('Message should be at least 3 characters').run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      const message = await ContactMessage.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });

      res.status(201).json({ message: 'Message received', data: message.toJSON() });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
