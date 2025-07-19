import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'server', 'db.json');

function checkDatabase() {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      const db = JSON.parse(data);
      
      console.log('✅ Database file exists');
      console.log('📊 Database structure:');
      console.log('- Admin:', db.admin ? '✅ Exists' : '❌ Missing');
      console.log('- About:', db.about ? '✅ Exists' : '❌ Missing');
      console.log('- Skills count:', db.skills ? db.skills.length : 0);
      console.log('- Projects count:', db.projects ? db.projects.length : 0);
      console.log('- Achievements count:', db.achievements ? db.achievements.length : 0);
      console.log('- Settings:', db.settings ? '✅ Exists' : '❌ Missing');
      
      if (db.admin) {
        console.log('👤 Admin details:');
        console.log('- Email:', db.admin.email);
        console.log('- Password hash exists:', !!db.admin.password);
      }
      
      if (db.skills && db.skills.length > 0) {
        console.log('💻 Sample skill:');
        console.log('- Category:', db.skills[0].category);
        console.log('- Icon:', db.skills[0].icon);
        console.log('- Skills count:', db.skills[0].skills?.length || 0);
      }
      
    } else {
      console.log('❌ Database file does not exist');
    }
  } catch (error) {
    console.error('❌ Error reading database:', error.message);
  }
}

checkDatabase(); 