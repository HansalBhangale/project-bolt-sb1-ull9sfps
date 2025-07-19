# 📧 Email Setup Guide for Portfolio Contact Form

## ✅ What's Been Implemented

The contact form now has full email functionality! When someone submits a contact form, you'll receive a beautifully formatted email with their message.

## 🛠️ Setup Steps

### **Step 1: Create Gmail App Password**

1. **Go to your Google Account settings**: https://myaccount.google.com/
2. **Enable 2-Factor Authentication** (if not already enabled)
3. **Go to Security → App passwords**
4. **Select "Mail"** and click "Generate"
5. **Copy the 16-character app password** (you'll only see it once!)

### **Step 2: Update Environment Variables**

Create or update your `.env` file in the project root:

```env
# Server Configuration
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (REQUIRED for email functionality)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=your-contact-email@gmail.com
```

**Important Notes:**
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-character app password (NOT your regular Gmail password)
- `CONTACT_EMAIL`: Where you want to receive contact form messages (can be same as EMAIL_USER)

### **Step 3: Test the Email Functionality**

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Go to your portfolio:** http://localhost:5173
3. **Navigate to Contact page**
4. **Fill out the contact form:**
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test message"
5. **Click Send**

### **Step 4: Check Your Email**

You should receive a beautifully formatted email with:
- ✅ Sender's name and email
- ✅ Their message
- ✅ Professional styling
- ✅ Timestamp

## 📧 Email Features

### **What You'll Receive:**
- **Subject**: "New Contact Message from [Name]"
- **From**: Your Gmail address
- **To**: Your contact email
- **Content**: Professional HTML email with sender details and message

### **Email Template Includes:**
- ✅ Sender's name and email address
- ✅ Formatted message content
- ✅ Professional styling with blue accent
- ✅ Responsive design
- ✅ Clear identification as portfolio contact

## 🔧 Troubleshooting

### **Common Issues:**

**1. "Email configuration not found"**
- Check your `.env` file has `EMAIL_USER` and `EMAIL_PASS`
- Make sure you're using the app password, not your regular password

**2. "Authentication failed"**
- Verify your Gmail app password is correct
- Make sure 2-Factor Authentication is enabled
- Check that you're using the correct Gmail address

**3. "Message sent successfully" but no email received**
- Check your spam/junk folder
- Verify the `CONTACT_EMAIL` address is correct
- Check server console for error messages

**4. "Failed to send message"**
- Check server console for detailed error messages
- Verify your Gmail account allows "less secure app access" or use app password
- Make sure your Gmail account isn't locked

### **Server Console Messages:**

**Success:**
```
Contact form submission: { name: 'Test User', email: 'test@example.com', message: 'Hello' }
Email sent successfully to: your-email@gmail.com
```

**Configuration Missing:**
```
Email configuration not found, logging message only
```

**Error:**
```
Error sending email: [detailed error message]
```

## 🎯 Alternative Email Services

If you prefer not to use Gmail, you can modify the transporter configuration in `server/index.js`:

### **Outlook/Hotmail:**
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### **Custom SMTP:**
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🚀 Production Deployment

For production, consider using:
- **SendGrid** (recommended for high volume)
- **Mailgun** (good for developers)
- **AWS SES** (cost-effective for high volume)

## 📋 Email Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use app passwords** instead of regular passwords
3. **Enable 2-Factor Authentication** on your email account
4. **Regularly rotate** your app passwords
5. **Monitor** for unusual email activity

## 🎉 You're All Set!

Once configured, every contact form submission will:
1. ✅ Validate the input
2. ✅ Send you a professional email
3. ✅ Log the submission for debugging
4. ✅ Show success/error messages to users

Your portfolio contact form is now fully functional with email notifications! 📧✨ 