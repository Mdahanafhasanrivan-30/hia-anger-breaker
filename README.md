# 💕 Anger-Breaker Website for Raisa Islam Hia 💕

A personalized, romantic, and hilarious web application designed to turn Raisa's anger into smiles. Built with React, Express, and deployed on Vercel.

**Created by:** Ahanaf Hasan Rivan ❤️

---

## 🎯 Project Overview

This is a full-stack MERN application (minus MongoDB for simplicity) consisting of three magical screens:

1. **🔐 Lock Screen** - Only Raisa can enter by answering a personalized question
2. **🎮 Funny Game** - An interactive game with an escaping button that gets progressively harder
3. **💌 Love Revelation** - A beautiful timeline revealing 10 reasons why Rivan loves Hia

---

## 📁 Project Structure

```
Hia/
├── api/
│   └── index.js                 # Express backend (Vercel serverless)
├── public/
│   └── index.html               # HTML entry point
├── src/
│   ├── index.js                 # React entry point
│   ├── index.css                # Global styles
│   ├── App.js                   # Main app logic
│   └── components/
│       ├── LockScreen.jsx       # Login screen component
│       ├── FunnyGame.jsx        # Interactive game component
│       └── LoveRevelation.jsx   # Romantic finale component
├── package.json                 # Dependencies
├── vercel.json                  # Vercel deployment config
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── README.md                    # This file

```

---

## 🛠 Technologies Used

- **Frontend:** React 18, Tailwind CSS, Lucide Icons
- **Backend:** Express.js (Node.js)
- **Deployment:** Vercel (Serverless Functions)
- **Styling:** Tailwind CSS with custom animations
- **Authentication:** JWT (JSON Web Tokens)
- **Storage:** Hardcoded data (ready for MongoDB upgrade)

---

## 🚀 Quick Start (5-Minute Setup)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- GitHub account
- Vercel account (free)

### Step 1: Clone / Initialize the Project

```bash
cd d:\Rivanprojects\Hia
git init
git add .
git commit -m "Initial commit: Anger-Breaker website"
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `react`, `react-dom` - Frontend framework
- `react-scripts` - React build tools
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `lucide-react` - Icon library
- `cors` - Cross-Origin Resource Sharing
- `jsonwebtoken` - JWT authentication
- `express` - Backend framework

### Step 3: Customize the Lock Screen Question & Answer

Edit [api/index.js](api/index.js) around line 18:

```javascript
const CUSTOM_PASSWORD_ANSWER = "raisa"; // ← Change this to your secret answer
```

Change `"raisa"` to any answer Raisa would know (e.g., `"pizza"`, `"2024-06-14"`, etc.).

### Step 4: Customize the Love Reasons

Edit [api/index.js](api/index.js) around line 20-30 to modify the `LOVE_REASONS` array:

```javascript
const LOVE_REASONS = [
  "Your smile is my favorite thing in the entire world",
  "The way you get angry about tiny things is absolutely adorable",
  // ... more reasons
];
```

### Step 5: Test Locally

```bash
npm start
```

This starts the React development server at `http://localhost:3000`.

**For the backend to work locally**, you'll need to start the Express server in a separate terminal:

```bash
npm install -g serve
node api/index.js
```

Or use a tool like `nodemon` for better development experience:

```bash
npm install --save-dev nodemon
npx nodemon api/index.js
```

Then in your browser:
1. Go to `http://localhost:3000`
2. Enter the answer (default: `raisa`)
3. Play the game
4. See the love messages!

---

## 🌍 Deploy to Vercel (3 Steps)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Anger-breaker website for Hia"

# Create a new repository on GitHub
# Then:
git remote add origin https://github.com/YOUR_USERNAME/hia-anger-breaker.git
git branch -M main
git push -u origin main
```

### Step 2: Import on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repo URL
5. Click **"Import"**

### Step 3: Environment Variables

1. In the Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add:
   - **Key:** `JWT_SECRET` | **Value:** `@HiaIsAwesome2024!` (or your custom secret)

3. Click **"Save"**
4. Redeploy (Vercel will automatically redeploy)

### Step 4: Deploy

Click the **"Deploy"** button. Vercel will:
- Build the React frontend
- Set up the Express API as serverless functions
- Deploy to a global CDN

**Your site will be live at:** `https://your-project-name.vercel.app`

---

## ⚙️ Configuration Details

### Backend Routes

**POST `/api/verify`**
- Verifies the answer to the custom question
- Returns a JWT token if correct
- Request body: `{ "answer": "user's answer" }`
- Response: `{ "success": true/false, "token": "jwt_token", "message": "..." }`

**GET `/api/love-reasons`**
- Returns the list of 10 reasons
- Requires: Authorization header with Bearer token
- Response: `{ "success": true, "reasons": [...] }`

**GET `/api/game-config`**
- Returns game metadata
- Response: `{ "gameName": "...", "description": "...", ... }`

### Frontend Components

**LockScreen.jsx**
- Displays the lock screen with Raisa's name
- Beautiful floating hearts animation
- Input field for the custom question answer
- Sends POST request to `/api/verify`

**FunnyGame.jsx**
- Interactive game with escaping button
- Happiness meter (0-100%)
- Button runs away from cursor (first 3 attempts)
- Then fills entire screen
- Tracks clicks and happiness level

**LoveRevelation.jsx**
- Displays 10 reasons with card-based UI
- Click each card to reveal a reason
- Final romantic message when all are revealed
- Share functionality for mobile devices

---

## 🎨 Customization Guide

### Change Colors

Edit [src/index.css](src/index.css) to customize the gradient:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Or modify Tailwind classes in the JSX files:

```jsx
// Change from pink-500 to blue-500
className="bg-pink-500" → className="bg-blue-500"
```

### Change the Game Mechanics

Edit [src/components/FunnyGame.jsx](src/components/FunnyGame.jsx):

- **Change happiness increment:** `const CLICK_INCREMENT = 10;` (line 19)
- **Change target:** `const TARGET_HAPPINESS = 100;` (line 18)
- **Change button escape attempts:** `if (escapeAttempts >= 2)` (line 55)

### Add More Love Reasons

Add more entries to the `LOVE_REASONS` array in [api/index.js](api/index.js):

```javascript
const LOVE_REASONS = [
  "...",
  "Your smile is my favorite thing in the entire world",
  "...",
];
```

The frontend will display them all with click-to-reveal cards.

---

## 📱 Mobile Optimization

The app is fully responsive:
- Mobile-first design
- Touch-friendly buttons
- Optimized for all screen sizes
- Works on iOS and Android

---

## 🔐 Security Notes

1. **JWT Secret:** Change `@HiaIsAwesome2024!` to something random in production
2. **Answer:** The custom answer is case-insensitive and trimmed
3. **Token Expiry:** Tokens expire after 7 days
4. **CORS:** Enabled for all origins (fine for this use case)

---

## 🐛 Troubleshooting

### "Backend not responding"

If the game doesn't load after login:
1. Check that the backend is running (`npm run dev` or `node api/index.js`)
2. Check browser console for CORS errors
3. Make sure your `.env` file has the correct `JWT_SECRET`

### "Button not responding"

Clear browser cache and refresh:
```
Ctrl + Shift + Delete (or Cmd + Shift + Delete on Mac)
```

### "Vercel deployment failed"

1. Check that all dependencies are in `package.json`
2. Ensure `vercel.json` is configured correctly
3. Check Vercel build logs for errors
4. Redeploy from the Vercel dashboard

---

## 📦 Dependencies Breakdown

| Package | Purpose |
|---------|---------|
| `react` | Frontend framework |
| `react-dom` | React DOM rendering |
| `react-scripts` | CRA build tools |
| `tailwindcss` | Utility-first CSS |
| `axios` | HTTP client |
| `lucide-react` | Icon library |
| `jsonwebtoken` | JWT authentication |
| `express` | Backend framework |
| `cors` | CORS middleware |

---

## 📝 How the Flow Works

1. **User opens site** → Sees LockScreen with floating hearts
2. **User answers question** → Answer sent to `/api/verify`
3. **Server validates** → Returns JWT token if correct
4. **Token stored** → In browser localStorage
5. **Game loads** → FunnyGame component renders
6. **User plays** → Button escapes, meter fills
7. **Game complete** → Transitions to LoveRevelation
8. **Love reasons display** → Click to reveal each one
9. **Final message** → Romantic conclusion

---

## 🎁 Pro Tips

- **Customize the question:** Use something personal (anniversary date, favorite memory, inside joke)
- **Add more reasons:** The more personalized, the more impact
- **Mobile deployment:** Test on mobile before sending (Vercel URL works on phones!)
- **Share easily:** Send the Vercel URL to Raisa directly

---

## 📄 License

Made with ❤️ by Ahanaf Hasan Rivan for Raisa Islam Hia

---

## 🤝 Support

If something breaks:
1. Check the browser console (F12 → Console tab)
2. Check Vercel logs
3. Check that all environment variables are set
4. Redeploy from scratch

---

## 🎉 Deployment Checklist

- [ ] Changed custom password answer
- [ ] Customized love reasons
- [ ] Pushed to GitHub
- [ ] Imported into Vercel
- [ ] Set JWT_SECRET environment variable
- [ ] Tested on local machine
- [ ] Tested on mobile
- [ ] Deployed successfully
- [ ] Shared with Raisa 💕

---

**Happy coding! Make her smile! 😊💕**
