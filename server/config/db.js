const mongoose = require('mongoose');
const dns = require('dns');

// The mongodb+srv:// connection uses an SRV DNS lookup via c-ares. On some
// networks the default DNS server refuses those queries (querySrv ECONNREFUSED),
// so point the resolver at public DNS servers that reliably answer SRV records.
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment variables');
  }

  const conn = await mongoose.connect(uri);
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  return conn;
}

module.exports = connectDB;
