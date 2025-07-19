import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'server', 'db.json');

async function resetDatabase() {
  try {
    // Delete existing database file
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('✅ Deleted existing database file');
    }

    // Create new admin password hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create new database structure
    const newDb = {
      admin: {
        email: 'admin@portfolio.com',
        password: hashedPassword,
        createdAt: new Date().toISOString()
      },
      about: {
        title: 'About Me',
        content: `I'm a passionate Data Scientist with over 5 years of experience in transforming complex data into actionable insights. My expertise spans across artificial intelligence, machine learning, and deep learning, with a strong focus on developing scalable solutions that drive business growth.

I hold a Master's degree in Computer Science with a specialization in Machine Learning from Stanford University. Throughout my career, I've worked with Fortune 500 companies to implement AI-driven solutions that have resulted in millions of dollars in cost savings and revenue generation.

My approach combines technical excellence with strategic thinking, ensuring that every solution I develop not only solves the immediate problem but also contributes to long-term business objectives.`
      },
      skills: [
        {
          id: '1',
          category: 'Programming Languages',
          icon: 'Code',
          skills: [
            { name: 'Python', level: 95 },
            { name: 'R', level: 90 },
            { name: 'SQL', level: 88 },
            { name: 'JavaScript', level: 85 },
            { name: 'Java', level: 80 },
            { name: 'C++', level: 75 },
          ],
          order: 0
        },
        {
          id: '2',
          category: 'Machine Learning',
          icon: 'Brain',
          skills: [
            { name: 'TensorFlow', level: 92 },
            { name: 'PyTorch', level: 90 },
            { name: 'Scikit-learn', level: 95 },
            { name: 'Keras', level: 88 },
            { name: 'XGBoost', level: 85 },
            { name: 'OpenCV', level: 82 },
          ],
          order: 1
        }
      ],
      projects: [
        {
          id: '1',
          title: 'Predictive Analytics Platform',
          description: 'A comprehensive ML platform for real-time customer behavior prediction using ensemble methods. Achieved 94% accuracy in churn prediction.',
          image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['Python', 'TensorFlow', 'AWS', 'React'],
          category: 'Machine Learning',
          github: 'https://github.com/HansalBhangale/predictive-analytics',
          demo: 'https://demo.example.com',
          featured: true,
          createdAt: new Date().toISOString()
        }
      ],
      achievements: [
        {
          id: '1',
          type: 'award',
          title: 'Best AI Innovation Award',
          organization: 'Tech Excellence Awards 2023',
          date: '2023',
          description: 'Recognized for developing a groundbreaking computer vision solution that revolutionized quality control in manufacturing.',
          url: 'https://example.com/award',
          createdAt: new Date().toISOString()
        }
      ],
      settings: {
        githubUrl: 'https://github.com/HansalBhangale',
        linkedinUrl: 'https://www.linkedin.com/in/hansal-bhangale',
        contactEmail: 'bhangalehansal@gmail.com',
        phoneNumber: '+91 9004127241',
        location: 'Mumbai, India'
      },
      contact: {
        githubUrl: 'https://github.com/HansalBhangale',
        linkedinUrl: 'https://www.linkedin.com/in/hansal-bhangale',
        contactEmail: 'bhangalehansal@gmail.com',
        phoneNumber: '+91 9004127241',
        location: 'Mumbai, India'
      }
    };

    // Write new database file
    fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2));
    console.log('✅ Created new database file with proper admin credentials');
    console.log('📧 Admin Email: admin@portfolio.com');
    console.log('🔑 Admin Password: admin123');
    console.log('🚀 You can now start the server and login!');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
  }
}

resetDatabase(); 