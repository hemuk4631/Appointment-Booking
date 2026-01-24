require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  process.exit(1);
}

async function testConnection() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    if (error.cause) console.error('Cause:', error.cause);
    process.exit(1);
  }
}

testConnection();
