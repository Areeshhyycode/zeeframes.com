const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { requireAuth, signToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register — create a customer account (or admin if the email
// matches the configured ADMIN_EMAIL).
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }

    const normalisedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: normalisedEmail });
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role =
      process.env.ADMIN_EMAIL && normalisedEmail === process.env.ADMIN_EMAIL.toLowerCase()
        ? 'admin'
        : 'customer';

    const user = await User.create({ name, email: normalisedEmail, passwordHash, role });
    const token = signToken(user);

    res.status(201).json({ success: true, token, user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// POST /api/auth/login — verify credentials and issue a JWT.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.json({ success: true, token, user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// GET /api/auth/me — return the current user (used to restore a session).
router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
