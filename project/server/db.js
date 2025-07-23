const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const bcrypt = require('bcryptjs');
const path = require('path');

// Default database structure
const DEFAULT_DB_DATA = {
  admin: null,
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
    },
    {
      id: '3',
      category: 'Data Processing',
      icon: 'Database',
      skills: [
        { name: 'Pandas', level: 95 },
        { name: 'NumPy', level: 92 },
        { name: 'Apache Spark', level: 85 },
        { name: 'Hadoop', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 88 },
      ],
      order: 2
    },
    {
      id: '4',
      category: 'Visualization',
      icon: 'BarChart3',
      skills: [
        { name: 'Matplotlib', level: 90 },
        { name: 'Seaborn', level: 88 },
        { name: 'Plotly', level: 85 },
        { name: 'Tableau', level: 82 },
        { name: 'Power BI', level: 80 },
        { name: 'D3.js', level: 75 },
      ],
      order: 3
    },
    {
      id: '5',
      category: 'Cloud & DevOps',
      icon: 'Settings',
      skills: [
        { name: 'AWS', level: 88 },
        { name: 'Google Cloud', level: 85 },
        { name: 'Docker', level: 82 },
        { name: 'Kubernetes', level: 80 },
        { name: 'Git', level: 92 },
        { name: 'Jenkins', level: 78 },
      ],
      order: 4
    },
    {
      id: '6',
      category: 'Specializations',
      icon: 'Zap',
      skills: [
        { name: 'Deep Learning', level: 92 },
        { name: 'Computer Vision', level: 88 },
        { name: 'NLP', level: 90 },
        { name: 'Time Series', level: 85 },
        { name: 'MLOps', level: 82 },
        { name: 'A/B Testing', level: 86 },
      ],
      order: 5
    },
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
    },
    {
      id: '2',
      title: 'Computer Vision Quality Control',
      description: 'Deep learning solution for automated quality control in manufacturing. Reduced defect detection time by 75% while improving accuracy.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['PyTorch', 'OpenCV', 'Docker', 'FastAPI'],
      category: 'Computer Vision',
      github: 'https://github.com/HansalBhangale/cv-quality-control',
      demo: 'https://demo.example.com',
      featured: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'NLP Sentiment Analysis Engine',
      description: 'Real-time sentiment analysis system for social media monitoring. Processes 1M+ tweets daily with 96% accuracy.',
      image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'BERT', 'Kafka', 'MongoDB'],
      category: 'Natural Language Processing',
      github: 'https://github.com/HansalBhangale/nlp-sentiment',
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
    },
    {
      id: '2',
      type: 'certification',
      title: 'AWS Certified Machine Learning - Specialty',
      organization: 'Amazon Web Services',
      date: '2023',
      description: 'Advanced certification demonstrating expertise in building, training, and deploying ML models on AWS.',
      url: 'https://example.com/cert',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      type: 'education',
      title: 'Master of Science in Computer Science',
      organization: 'Stanford University',
      date: '2019',
      description: 'Specialized in Machine Learning and Artificial Intelligence. Graduated Magna Cum Laude.',
      url: 'https://example.com/degree',
      createdAt: new Date().toISOString()
    }
  ],
  keyMetrics: [
    { icon: 'User', value: '5+', label: 'Years Experience' },
    { icon: 'Code', value: '50+', label: 'Projects Completed' },
    { icon: 'Database', value: '1M+', label: 'Data Points Processed' },
    { icon: 'Brain', value: '15+', label: 'AI Models Deployed' },
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

// Database file path
const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/db.json'
  : path.join(__dirname, 'db.json');

// Initialize database
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, DEFAULT_DB_DATA);

// Initialize database with default data
const initializeDatabase = async () => {
  await db.read();

  // Create default admin user if it doesn't exist
  if (!db.data.admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.data.admin = {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
  }

  await db.write();
};

// Helper functions
const generateId = () => Date.now().toString();

module.exports = {
  db,
  initializeDatabase,
  generateId
};