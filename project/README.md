# AI/ML Portfolio Website

A modern, full-stack portfolio website for Data Scientists, AI/ML professionals, and developers. Features a beautiful UI, dynamic content management, admin dashboard, and integrated contact form with email notifications.

---

## 🚀 Features

- **Beautiful, Animated UI**: Modern design with neural network animations and smooth transitions
- **Admin Dashboard**: Secure, JWT-authenticated dashboard for managing all content
- **Dynamic Content**: Manage About, Skills, Projects, Achievements, Key Metrics, and Contact Info
- **Contact Form**: Integrated email system for client communications
- **Resume Upload**: Admin can upload/replace the downloadable resume PDF
- **Responsive Design**: Optimized for all devices
- **Production Ready**: Built with React, Express, TypeScript, and best practices

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router

**Backend**
- Node.js + Express
- LowDB (JSON database)
- JWT for authentication
- Nodemailer for email
- Multer for file uploads

---

## 📦 Project Structure

```
project/
  ├── public/                # Static assets (resume PDF, etc.)
  ├── server/                # Express backend
  ├── src/                   # React frontend
  ├── .env                   # Environment variables (create this!)
  ├── package.json           # Project scripts and dependencies
  └── README.md              # This file
```

---

## ⚡️ Getting Started

### 1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd project
```

### 2. **Install Dependencies**

```bash
npm install
cd server
npm install
cd ..
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the `project` folder (not in `server`):

```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=your-gmail@gmail.com
```

- `EMAIL_USER`: Your Gmail address (used to send emails)
- `EMAIL_PASS`: [Gmail App Password](https://support.google.com/accounts/answer/185833?hl=en) (not your regular password)
- `CONTACT_EMAIL`: Where you want to receive contact form messages (can be the same as `EMAIL_USER`)

> For detailed email setup, see [EMAIL_SETUP.md](EMAIL_SETUP.md)

### 4. **Start the Application**

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3001

### 5. **Access the Admin Dashboard**

- Go to: http://localhost:5173/admin
- Default credentials:
  - **Username:** `admin@portfolio.com`
  - **Password:** `admin123`

> **Change the default password after first login!**

---

## 🖥️ Admin Dashboard Features

- **About Section**: Edit your bio and background
- **Skills**: Add, edit, remove skill categories and individual skills
- **Projects**: Manage your project portfolio
- **Achievements**: Add awards, certifications, education
- **Key Metrics**: Edit the “Key Metrics” shown on the About page
- **Contact Info**: Update email, phone, location, social links
- **Resume Upload**: Upload/replace the downloadable resume PDF

---

## 📄 Resume Upload/Replace

- Go to **Admin Dashboard → Settings**
- Use the “Upload/Replace Resume (PDF only)” form
- The new PDF will replace the old one at `/public/Hansal Bhangale Resume.pdf`
- The download button on the site will always serve the latest uploaded file

---

## 📧 Contact Form Email Setup

- The contact form sends emails to `CONTACT_EMAIL` using your Gmail account
- Requires a Gmail App Password (see [EMAIL_SETUP.md](EMAIL_SETUP.md) for details)
- All messages are logged in the server console for debugging

---

## 🗃️ Database

- Uses a JSON file (`server/db.json`) for all content
- Automatically initialized on first run
- No external database required

---

## 🔧 Scripts

```bash
npm run dev        # Start both frontend and backend (development)
npm run build      # Build frontend for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run server     # Start only backend server
```

---

## 🛡️ Security & Best Practices

- Change the default admin password after first login
- Never commit your `.env` file to version control
- Use Gmail App Passwords, not your regular password
- Enable 2FA on your Gmail account

---

## 🐞 Troubleshooting

- **Port already in use**: Change `PORT` in `.env`
- **Email not working**: Check Gmail App Password setup and `.env`
- **Database errors**: Delete `server/db.json` and restart
- **Login issues**: Use `admin@portfolio.com` as username

---

## 🎉 You’re Ready!

Your portfolio website is now fully functional, customizable, and production-ready.  
Start customizing your content through the admin dashboard at [http://localhost:5173/admin](http://localhost:5173/admin)!

---

**For more details on email setup, see [EMAIL_SETUP.md](EMAIL_SETUP.md).**  
**For a step-by-step guide, see [SETUP_GUIDE.md](SETUP_GUIDE.md).**