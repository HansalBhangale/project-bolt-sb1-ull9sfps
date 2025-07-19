import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 Environment Variables Check:');
console.log('================================');

console.log('📁 .env file location:', path.join(__dirname, '.env'));

console.log('\n📧 Email Configuration:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
console.log('- CONTACT_EMAIL:', process.env.CONTACT_EMAIL ? '✅ Set' : '❌ Missing');

console.log('\n🔧 Server Configuration:');
console.log('- PORT:', process.env.PORT || '3001 (default)');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

console.log('\n📋 Current Values:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER || 'Not set');
console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'Not set');
console.log('- CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'Not set');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('\n❌ Email configuration is incomplete!');
  console.log('Please check your .env file and ensure EMAIL_USER and EMAIL_PASS are set.');
} else {
  console.log('\n✅ Email configuration looks good!');
} 