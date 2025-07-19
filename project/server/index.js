require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { db, initializeDatabase } = require('./db');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Multer storage for resume upload
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public'));
  },
  filename: function (req, file, cb) {
    cb(null, 'Hansal Bhangale Resume.pdf');
  }
});
const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin login route
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login attempt:', { username, adminEmail: db.data.admin?.email });

    // Check if credentials match hardcoded admin
    if (username !== db.data.admin.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, db.data.admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: db.data.admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// About routes
app.get('/api/about', (req, res) => {
  res.json(db.data.about);
});

app.put('/api/about', authenticateToken, async (req, res) => {
  try {
    db.data.about = { ...db.data.about, ...req.body };
    await db.write();
    res.json(db.data.about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Skills routes
app.get('/api/skills', (req, res) => {
  res.json(db.data.skills);
});

app.post('/api/skills', authenticateToken, async (req, res) => {
  try {
    console.log('Creating new skill:', req.body);
    
    // Validate required fields
    const { category, icon, skills } = req.body;
    
    if (!category || !icon) {
      return res.status(400).json({ 
        message: 'Category and icon are required',
        received: { category, icon, skillsCount: skills?.length }
      });
    }
    
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ 
        message: 'Skills array is required and must not be empty',
        received: { category, icon, skills }
      });
    }
    
    // Validate each skill has name and level
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      if (!skill.name || typeof skill.level !== 'number') {
        return res.status(400).json({ 
          message: `Skill ${i + 1} must have name and level`,
          skill: skill
        });
      }
    }
    
    const newSkill = { 
      id: Date.now().toString(), 
      category,
      icon,
      skills,
      order: db.data.skills.length
    };
    
    console.log('New skill object:', newSkill);
    
    db.data.skills.push(newSkill);
    await db.write();
    
    console.log('Skill created successfully');
    res.json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Updating skill:', req.params.id, req.body);
    
    const skillId = req.params.id;
    const skillIndex = db.data.skills.findIndex(skill => skill.id === skillId);
    
    if (skillIndex === -1) {
      console.log('Skill not found:', skillId);
      return res.status(404).json({ message: 'Skill not found' });
    }

    db.data.skills[skillIndex] = { ...db.data.skills[skillIndex], ...req.body };
    await db.write();
    
    console.log('Skill updated successfully');
    res.json(db.data.skills[skillIndex]);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skillId = parseInt(req.params.id);
    const skillIndex = db.data.skills.findIndex(skill => skill.id === skillId);
    
    if (skillIndex === -1) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    db.data.skills.splice(skillIndex, 1);
    await db.write();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Projects routes
app.get('/api/projects', (req, res) => {
  res.json(db.data.projects);
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const newProject = { id: Date.now(), ...req.body };
    db.data.projects.push(newProject);
    await db.write();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = db.data.projects.findIndex(project => project.id === projectId);
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    db.data.projects[projectIndex] = { ...db.data.projects[projectIndex], ...req.body };
    await db.write();
    res.json(db.data.projects[projectIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = db.data.projects.findIndex(project => project.id === projectId);
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    db.data.projects.splice(projectIndex, 1);
    await db.write();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Achievements routes
app.get('/api/achievements', (req, res) => {
  res.json(db.data.achievements);
});

app.post('/api/achievements', authenticateToken, async (req, res) => {
  try {
    const newAchievement = { id: Date.now(), ...req.body };
    db.data.achievements.push(newAchievement);
    await db.write();
    res.json(newAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/achievements/:id', authenticateToken, async (req, res) => {
  try {
    const achievementId = parseInt(req.params.id);
    const achievementIndex = db.data.achievements.findIndex(achievement => achievement.id === achievementId);
    
    if (achievementIndex === -1) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    db.data.achievements[achievementIndex] = { ...db.data.achievements[achievementIndex], ...req.body };
    await db.write();
    res.json(db.data.achievements[achievementIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/achievements/:id', authenticateToken, async (req, res) => {
  try {
    const achievementId = parseInt(req.params.id);
    const achievementIndex = db.data.achievements.findIndex(achievement => achievement.id === achievementId);
    
    if (achievementIndex === -1) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    db.data.achievements.splice(achievementIndex, 1);
    await db.write();
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact routes
app.get('/api/contact', (req, res) => {
  res.json(db.data.settings);
});

app.put('/api/contact', authenticateToken, async (req, res) => {
  try {
    db.data.settings = { ...db.data.settings, ...req.body };
    await db.write();
    res.json(db.data.settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('Contact form submission:', { name, email, message });
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }
    
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration not found, logging message only');
      return res.json({ message: 'Message received successfully' });
    }
    
    // Create email transporter
    const transporter = createTransporter();
    
    // Email to portfolio owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Message</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', process.env.CONTACT_EMAIL || process.env.EMAIL_USER);
    
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      error: error.message 
    });
  }
});

// Settings routes
app.get('/api/settings', (req, res) => {
  res.json(db.data.settings);
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    db.data.settings = { ...db.data.settings, ...req.body };
    await db.write();
    res.json(db.data.settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only endpoint to upload/replace resume
app.post('/api/admin/upload-resume', authenticateToken, uploadResume.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
  }
  res.json({ message: 'Resume uploaded successfully.' });
});

// Key Metrics routes
app.get('/api/key-metrics', (req, res) => {
  res.json(db.data.keyMetrics || []);
});

app.put('/api/key-metrics', authenticateToken, async (req, res) => {
  try {
    db.data.keyMetrics = req.body;
    await db.write();
    res.json(db.data.keyMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test skill creation endpoint
app.post('/api/test-skill', (req, res) => {
  try {
    console.log('Test skill creation:', req.body);
    res.json({ 
      message: 'Test successful', 
      received: req.body,
      skillsCount: req.body.skills?.length || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Test failed', error: error.message });
  }
});

// Start server function
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();