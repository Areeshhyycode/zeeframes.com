const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contacts — save a new contact/lead
router.post('/', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    const contact = await Contact.create({ name, email, company, service, message });
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    // Mongoose validation errors → 400, everything else → 500
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Error saving contact:', err.message);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// GET /api/contacts — list all submitted contacts (newest first)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
