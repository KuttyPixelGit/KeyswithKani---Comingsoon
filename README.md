# 🏠 KeyswithKani - Real Estate Coming Soon Page

<div align="center">

![KeyswithKani](https://img.shields.io/badge/KeyswithKani-Real%20Estate-00C8C8?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

**Your Trusted Real Estate Partner in Ontario, Canada**

[Live Demo](https://keyswithkani.vercel.app) · [Report Bug](https://github.com/yourusername/keyswithkani/issues) · [Request Feature](https://github.com/yourusername/keyswithkani/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contact](#contact)

---

## 🌟 About

KeyswithKani is a modern, elegant coming soon page for a real estate business based in Ontario, Canada. Built with React and TypeScript, it features a beautiful dark/light mode toggle, animated effects, and a functional contact form that sends emails via Gmail SMTP.

### Key Highlights:
- 🎨 **Modern UI/UX** with smooth animations and transitions
- 🌓 **Dark/Light Mode** toggle for user preference
- 📧 **Working Contact Form** with Gmail SMTP integration
- 📊 **Visitor Tracking** to monitor website traffic
- 📱 **Fully Responsive** design for all devices
- ⚡ **Optimized Performance** with Vite and React 19
- 🚀 **Vercel Deployment** ready with serverless functions

---

## ✨ Features

### 🎯 Core Features
- **Elegant Landing Page**: Professional design with animated background effects
- **Theme Toggle**: Seamless dark/light mode switching with persistent user preference
- **Contact Form**: Functional email form with validation and success/error states
- **Social Media Links**: Direct links to Instagram, LinkedIn, and Facebook
- **Business Information**: Contact details, location, and business hours
- **Kani Spotlight**: Meet the owner section with profile and bio

### 🛠️ Technical Features
- **Email Integration**: Gmail SMTP for sending contact form submissions
- **Visitor Analytics**: Track website visits via serverless API
- **SEO Optimized**: Meta tags and structured data for search engines
- **Fast Loading**: Optimized assets and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation support
- **Type-Safe**: Full TypeScript implementation

---

## 🔧 Tech Stack

### Frontend
- **React 19.1** - UI library
- **TypeScript 5.8** - Type safety
- **Vite 6.3** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with animations

### Backend / APIs
- **Vercel Serverless Functions** - API endpoints
- **Nodemailer 7.0** - Email sending
- **Gmail SMTP** - Email service provider

### Deployment
- **Vercel** - Hosting and continuous deployment
- **GitHub** - Version control and CI/CD

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Vite Plugin API** - Local development API handler

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.0 or higher
- **npm** or **yarn** or **pnpm**
- **Gmail account** with 2-Step Verification enabled
- **Gmail App Password** for SMTP access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KuttyPixelGit/KeywithKani---Comingsoon.git
   cd KeyswithKani
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔐 Environment Variables

### Required for Production (Vercel)

Add these in your Vercel dashboard → Settings → Environment Variables:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM=your-gmail@gmail.com
EMAIL_TO=contact@keyswithkani.ca
```

### How to Get Gmail App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "KeyswithKani" as the name
6. Copy the 16-character password (remove spaces)
7. Use this as `SMTP_PASS` in your environment variables

### Local Development

For local development, create a `.env` file in the project root:

```env
# Application Configuration
NODE_ENV=development

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password-here
EMAIL_FROM=your-gmail@gmail.com
EMAIL_TO=contact@keyswithkani.ca
```

**⚠️ Never commit `.env` file to Git!** It's already in `.gitignore`.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: GitHub Integration (Easiest)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables (see above)
6. Click "Deploy"

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment Checklist

- ✅ Add all environment variables in Vercel
- ✅ Test contact form on live site
- ✅ Verify emails are being sent to `contact@keyswithkani.ca`
- ✅ Check that all social media links work
- ✅ Test dark/light mode toggle
- ✅ Verify mobile responsiveness
- ✅ Check page load performance

---

## 📁 Project Structure

```
KeyswithKani/
├── api/                      # Vercel Serverless Functions
│   ├── contact.ts           # Contact form email handler
│   └── visitor.ts           # Visitor tracking API
├── components/              # React Components
│   ├── EffectsBackground.tsx
│   ├── Footer.tsx           # Contact form & footer
│   ├── LoadingScreen.tsx
│   └── icons/               # SVG icon components
├── hooks/                   # Custom React Hooks
│   └── useTheme.ts         # Dark/light mode hook
├── public/                  # Static assets
├── src/                    # Source files
│   ├── fonts.css
│   └── vite-env.d.ts
├── styles/                 # Global styles
│   └── globals.css
├── App.tsx                 # Main App component
├── index.tsx              # Entry point
├── vite.config.ts         # Vite configuration
├── vite-plugin-api.ts     # Local dev API handler
├── tsconfig.json          # TypeScript config
├── vercel.json            # Vercel deployment config
├── package.json           # Dependencies
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

---

## 📧 Contact Form

The contact form is integrated with Gmail SMTP to send emails directly to your business email.

### How It Works

1. **User fills out the form** with name, email, and message
2. **Frontend validates** the input
3. **API endpoint** (`/api/contact`) receives the submission
4. **Nodemailer** sends email via Gmail SMTP
5. **Email arrives** at `contact@keyswithkani.ca`
6. **User receives** success/error message

### Email Template

Emails are sent with a beautiful HTML template that includes:
- Sender's name and email
- Message content
- Reply-to functionality (you can reply directly)
- Timestamp

---

## 📊 Visitor Tracking

Simple visitor tracking is implemented to monitor website traffic.

### API Endpoint

```
GET  /api/visitor  - Get total visitor count
POST /api/visitor  - Increment visitor count
```

### Features

- Counts page visits
- Simple in-memory storage (resets on deployment)
- Can be upgraded to persistent storage (Vercel KV, database, etc.)

---

## 🎨 Customization

### Changing Colors

The primary color scheme uses cyan (`#00C8C8`). To change it:

1. Update colors in `App.tsx` and component files
2. Search for `#00C8C8` and replace with your color
3. Update hover states and gradients accordingly

### Changing Social Media Links

Update links in `components/Footer.tsx`:

```typescript
<SocialLink href="https://instagram.com/your-handle" icon={InstagramIcon} />
<SocialLink href="https://linkedin.com/company/your-company" icon={LinkedinIcon} />
<SocialLink href="https://facebook.com/your-page" icon={FacebookIcon} />
```

### Changing Business Information

Update contact details in `components/Footer.tsx`:
- Email address
- Phone number
- Location
- Business hours

---

## 🐛 Troubleshooting

### Contact Form Not Working

1. **Check environment variables** in Vercel
2. **Verify Gmail app password** is correct (no spaces)
3. **Ensure 2-Step Verification** is enabled on Google account
4. **Check Vercel function logs** for errors
5. **Test email delivery** to the recipient address

### Local Development Issues

1. **Port 5173 in use**: Kill the process or change port in `vite.config.ts`
2. **Module not found**: Run `npm install` again
3. **TypeScript errors**: Run `npm run build` to check for real errors
4. **Environment variables not loading**: Check `.env` file exists and has correct format

### Deployment Issues

1. **Build fails**: Check TypeScript errors with `npm run build`
2. **API not working**: Verify environment variables in Vercel
3. **Email not sending**: Test Gmail credentials locally first
4. **404 errors**: Check `vercel.json` routing configuration

---

## 📝 License

This project is proprietary and confidential. All rights reserved.

© 2025 KeyswithKani. All rights reserved.

---

## 🤝 Contributing

This is a private project. If you'd like to suggest improvements, please contact the owner.

---

## 📞 Contact

**KeyswithKani Real Estate**

- 📧 Email: [contact@keyswithkani.ca](mailto:contact@keyswithkani.ca)
- 📱 Instagram: [@keyswithkani](https://instagram.com/keyswithkani)
- 💼 LinkedIn: [KeyswithKani](https://www.linkedin.com/company/keyswithkani)
- 👤 Facebook: [KeyswithKani](https://www.facebook.com/profile.php?id=61581206012026)
- 📍 Location: 70 Wayside Lane, St Thomas, Ontario, Canada N5P 0G5

**Website**: [https://keyswithkani.vercel.app](https://keyswithkani.vercel.app)

---

<div align="center">
  <p><strong>Built with ❤️ by KuttyPixel</strong></p>
  <p>Your Trusted Real Estate Partner in Ontario</p>
</div>
