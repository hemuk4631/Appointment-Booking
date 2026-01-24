require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Testing connection to:', uri ? uri.split('@')[1] : 'UNDEFINED');

if (!uri) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Try forcing IPv4 first as a common fix
    });
    console.log('✅ Connection SUCCESSFUL!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection FAILED:', error.message);
    if (error.cause) console.error('Cause:', error.cause);
    process.exit(1);
  }
}

testConnection();
