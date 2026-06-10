const mongoose = require('mongoose');

// A knowledge-base document the admin uploads. We store the extracted plain
// text plus pre-split overlapping chunks so the chat endpoint can retrieve the
// most relevant passages to ground its answers (a lightweight RAG setup).
const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    chunks: {
      type: [String],
      default: [],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
