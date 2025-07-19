# 🚀 AI/ML Portfolio Website - Complete Setup Guide

## ✅ What's Been Fixed

### 1. **Removed All Hardcoded Content**
- ✅ About page - Now fetches from database
- ✅ Skills page - Now fetches from database with dynamic icons
- ✅ Projects page - Now fetches from database with dynamic categories
- ✅ Achievements page - Now fetches from database with dynamic icons
- ✅ Contact page - Now fetches contact info and social links from database

### 2. **Fixed Server Endpoints**
- ✅ Added `/api/settings` endpoint for admin dashboard
- ✅ Added `/api/contact` POST endpoint for contact form
- ✅ Fixed contact routes to use settings data
- ✅ All CRUD operations working for skills, projects, achievements

### 3. **Fixed Admin Authentication**
- ✅ Fixed admin login to use `username` instead of `email`
- ✅ Admin credentials: `admin@portfolio.com` / `admin123`

### 4. **Database Structure**
- ✅ JSON-based database with LowDB
- ✅ Automatic initialization with default data
- ✅ Proper data structure for all sections

## 🛠️ Step-by-Step Setup

### **Step 1: Install Dependencies**
```bash
cd project
npm install
cd server
npm install
cd ..
```

### **Step 2: Create Environment File**
Create `.env` file in the project root:
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com
```

### **Step 3: Start the Application**
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### **Step 4: Access Admin Panel**
1. Go to http://localhost:5173/admin
2. Login with:
   - **Username**: `admin@portfolio.com`
   - **Password**: `admin123`

## 🎯 Admin Dashboard Features

### **About Section**
- ✅ Edit title and content
- ✅ Real-time updates

### **Skills Management**
- ✅ **Create** new skill categories
- ✅ **Edit** existing categories
- ✅ **Delete** categories
- ✅ **Add/Remove** individual skills
- ✅ **Set skill levels** (0-100%)
- ✅ **Choose icons** from predefined set

### **Projects Management**
- ✅ **Create** new projects
- ✅ **Edit** existing projects
- ✅ **Delete** projects
- ✅ **Add/Remove** technologies
- ✅ **Set project categories**
- ✅ **Add GitHub/Demo links**
- ✅ **Toggle featured status**

### **Achievements Management**
- ✅ **Create** new achievements
- ✅ **Edit** existing achievements
- ✅ **Delete** achievements
- ✅ **Set achievement types** (award, certification, education)
- ✅ **Add URLs** for certificates/links

### **Settings Management**
- ✅ **Update contact email**
- ✅ **Update phone number**
- ✅ **Update location**
- ✅ **Update GitHub URL**
- ✅ **Update LinkedIn URL**

## 📊 Database Structure

The application uses a JSON file (`server/db.json`) with this structure:

```json
{
  "admin": {
    "username": "admin@portfolio.com",
    "password": "hashed-password"
  },
  "about": {
    "title": "About Me",
    "content": "Your about content..."
  },
  "skills": [
    {
      "id": "1",
      "category": "Programming Languages",
      "icon": "Code",
      "skills": [
        { "name": "Python", "level": 95 }
      ],
      "order": 0
    }
  ],
  "projects": [
    {
      "id": "1",
      "title": "Project Title",
      "description": "Project description...",
      "image": "image-url",
      "technologies": ["Python", "React"],
      "category": "Machine Learning",
      "github": "github-url",
      "demo": "demo-url",
      "featured": true
    }
  ],
  "achievements": [
    {
      "id": "1",
      "type": "award",
      "title": "Achievement Title",
      "organization": "Organization Name",
      "date": "2023",
      "description": "Achievement description...",
      "url": "certificate-url"
    }
  ],
  "settings": {
    "githubUrl": "https://github.com/username",
    "linkedinUrl": "https://linkedin.com/in/username",
    "contactEmail": "email@example.com",
    "phoneNumber": "+1234567890",
    "location": "City, Country"
  }
}
```

## 🔧 Available Scripts

```bash
npm run dev          # Start both frontend and backend
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run server       # Start only backend server
```

## 🌟 Features

### **Frontend Features**
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations
- ✅ Neural network background animation
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Dynamic content loading

### **Backend Features**
- ✅ Express.js server
- ✅ JWT authentication
- ✅ LowDB (JSON database)
- ✅ Contact form with email
- ✅ RESTful API endpoints
- ✅ CORS enabled

### **Admin Features**
- ✅ Secure login system
- ✅ Complete CRUD operations
- ✅ Real-time updates
- ✅ Form validation
- ✅ Toast notifications

## 🚨 Important Notes

1. **Change Default Credentials**: After first login, change the admin password
2. **Environment Variables**: Update the `.env` file with your actual values
3. **Email Setup**: For contact form to work, set up Gmail app password
4. **Database**: The JSON database will be created automatically on first run

## 🔍 Troubleshooting

### **Common Issues:**

1. **Port already in use**: Change PORT in `.env` file
2. **Email not working**: Check Gmail app password setup
3. **Database errors**: Delete `server/db.json` and restart
4. **CORS errors**: Check if both servers are running
5. **Login issues**: Make sure to use `admin@portfolio.com` as username

### **Reset Database:**
```bash
rm server/db.json
npm run dev
```

## 🎉 You're Ready!

Your portfolio website is now fully functional with:
- ✅ No hardcoded content
- ✅ Full CRUD operations from admin dashboard
- ✅ Dynamic content loading
- ✅ Professional UI/UX
- ✅ Responsive design
- ✅ Production ready

Start customizing your portfolio through the admin dashboard at http://localhost:5173/admin! 