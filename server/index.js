require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.json({ message: 'API Running!' }));
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
