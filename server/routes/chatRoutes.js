const express = require('express');
const Document = require('../models/Document');
const { requireAuth } = require('../middleware/auth');
const { retrieve, generateAnswer, HANDOFF } = require('../lib/retrieval');

const router = express.Router();

// POST /api/chat — answer a question grounded in the uploaded knowledge base.
// Requires the user to be logged in.
router.post('/', requireAuth, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || !String(message).trim()) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Pull every chunk from the knowledge base and find the relevant ones.
    const docs = await Document.find().select('chunks');
    const allChunks = docs.flatMap((d) => d.chunks || []);
    const top = retrieve(message, allChunks, 4);

    const reply = await generateAnswer(message, top, Array.isArray(history) ? history : []);
    const handoff = reply.trim() === HANDOFF;

    res.json({ success: true, reply, handoff, sources: top.length });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

module.exports = router;
