<div align="center">
  <h1>🏠 KeyswithKani Real Estate</h1>
  <p>Your trusted real estate partner in Ontario, transforming properties into dream homes with a personal touch.</p>
  
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js"></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0%2B-blue" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.0%2B-38B2AC" alt="Tailwind CSS"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployment-000000" alt="Vercel"></a>
</div>

---

## ✨ Features

- **Elegant Design:** Modern, responsive layout with beautiful animations
- **Interactive Elements:** Engaging user experience with smooth transitions
- **Contact Form:** Easy way for potential clients to get in touch
- **Mobile-First:** Fully responsive design for all devices
- **Performance Optimized:** Fast loading times and smooth animations
- **SEO Friendly:** Built with best practices for search engine visibility

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript 5
- **Styling:** Tailwind CSS, CSS Modules
- **Animations:** Framer Motion, CSS Transitions
- **Deployment:** Vercel (Recommended)
- **Form Handling:** React Hook Form
- **Icons:** Custom SVG Icons

---

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/yourusername/keyswithkani.git
cd keyswithkani
npm install
```

### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 3. Build for Production

```bash
npm run build
```

This will create an optimized production build of your application.

---

## ☁️ Vercel Deployment

### Deploy with Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and create a new project
3. Import your repository
4. Configure environment variables in the Vercel dashboard:
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASS` - Your Gmail app password
5. Deploy!

### Environment Variables for Vercel

Never commit your `.env` file to version control. Instead, set these environment variables in your Vercel project settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Gmail address for sending reports | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password (not regular password) | `your-app-password` |

To generate an app password:
1. Enable 2-factor authentication on your Gmail account
2. Go to your Google Account settings
3. Navigate to Security > 2-Step Verification > App passwords
4. Generate a new app password for "Mail"

---

## 📦 Project Structure

```
/
├── components/          # Reusable UI components
│   ├── Footer.tsx       # Footer component with contact form
│   ├── LoadingScreen.tsx # Animated loading screen
│   └── MainContent.tsx  # Main page content
│
├── public/             # Static assets (images, fonts, etc.)
│   └── keyswithKani.gif # Animated logo
│
├── styles/             # Global styles
│   └── globals.css     # Global CSS styles
│
├── .gitignore          # Git ignore file
├── next-env.d.ts       # TypeScript declarations
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── README.md           # This file
└── tsconfig.json      # TypeScript configuration
```

---

## 📝 Customization

- Update contact information in `components/Footer.tsx`
- Modify the color scheme in `tailwind.config.js`
- Update the animated logo in `public/keyswithKani.gif`
- Edit the main content in `components/MainContent.tsx`

---

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/) and import your project
3. Configure build settings (Next.js is auto-detected)
4. Deploy!

### Other Hosting Options

You can also deploy to other platforms that support Next.js, such as:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Heroku](https://www.heroku.com/)
- Or any Node.js hosting provider

---

<p align="center">
  <b>🏡 Your Trusted Real Estate Partner in Ontario</b><br>
  <b>Contact Kanimozhi Sundaram:</b>
  <a href="mailto:contact@keyswithkani.ca">contact@keyswithkani.ca</a> |
  <a href="https://www.linkedin.com/company/keyswithkani/">LinkedIn</a> |
  <a href="http://facebook.com/keyswithkani">Facebook</a> |
  <a href="https://instagram.com/keyswithkani">@keyswithkani</a><br>
  <b>© 2025 KeyswithKani. All rights reserved.</b>
</p>