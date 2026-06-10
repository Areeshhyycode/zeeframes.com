const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { chunkText } = require('../lib/retrieval');

const router = express.Router();

// Keep uploads in memory — we only persist the extracted text, not the binary.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Extract plain text from a supported upload (PDF / TXT / MD).
async function extractText(file) {
  const name = (file.originalname || '').toLowerCase();
  if (name.endsWith('.pdf') || file.mimetype === 'application/pdf') {
    const pdfParse = require('pdf-parse');
    const parsed = await pdfParse(file.buffer);
    return parsed.text || '';
  }
  // txt / md / plain text
  return file.buffer.toString('utf-8');
}

// POST /api/documents — upload a knowledge-base document (admin only).
router.post('/', requireAuth, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const text = (await extractText(req.file)).trim();
    if (!text) {
      return res.status(400).json({ success: false, error: 'Could not extract any text from this file' });
    }

    const chunks = chunkText(text);
    const doc = await Document.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      text,
      chunks,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: doc._id,
        name: doc.name,
        chunkCount: doc.chunks.length,
        createdAt: doc.createdAt,
      },
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to process the document. Please try again.' });
  }
});

// GET /api/documents — list uploaded documents (admin only).
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const docs = await Document.find().select('name type chunks createdAt').sort({ createdAt: -1 });
    const data = docs.map((d) => ({
      _id: d._id,
      name: d.name,
      type: d.type,
      chunkCount: d.chunks.length,
      createdAt: d.createdAt,
    }));
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('List documents error:', err.message);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// DELETE /api/documents/:id — remove a document from the knowledge base.
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete document error:', err.message);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

module.exports = router;
