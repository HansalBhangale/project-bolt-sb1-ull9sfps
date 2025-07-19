const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'db.json');

function fixAchievementIds() {
  if (!fs.existsSync(dbPath)) {
    console.error('❌ db.json not found!');
    return;
  }
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let changed = false;
  if (Array.isArray(db.achievements)) {
    db.achievements.forEach((achievement, idx) => {
      let id = achievement.id;
      if (typeof id === 'string' && id.startsWith('"') && id.endsWith('"')) {
        id = id.slice(1, -1);
      }
      if (typeof id !== 'string') {
        id = String(id);
      }
      if (achievement.id !== id) {
        console.log(`Fixing achievement at index ${idx}: setting id to '${id}'`);
        achievement.id = id;
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      console.log('✅ All achievement ids are now clean strings.');
    } else {
      console.log('✅ All achievement ids were already valid strings.');
    }
  } else {
    console.log('No achievements array found in db.json');
  }
}

fixAchievementIds();