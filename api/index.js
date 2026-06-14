// Vercel Serverless Function for Express API
// Deploy this as a backend on Vercel

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============ HARDCODED DATA (Skip MongoDB for speed!) ============
const CUSTOM_PASSWORD_ANSWER = "smile"; // Change to your custom answer
const JWT_SECRET = process.env.JWT_SECRET || "@HiaIsAwesome2024!";

const LOVE_REASONS = [
  "Your smile is my favorite thing in the entire world",
  "The way you get angry about tiny things is absolutely adorable",
  "Your laugh is contagious and makes even my worst days better",
  "You're the strongest person I know, yet so tender-hearted",
  "Your kindness to others shows me what a beautiful soul you have",
  "The way you care about people you love is inspiring",
  "Your creativity and imagination amaze me every single day",
  "You make me want to be a better version of myself",
  "Your presence is my safe place, my home",
  "Loving you is the easiest and best decision I've ever made",
  "I am so grateful for every moment we share together. You light up my life in ways I never thought possible.",
  "You make my heart race every time you look at me. I can't imagine my life without you.",
  "I am sorry for the times I've made you upset, but please know that I will always do my best to make you happy and see that beautiful smile of yours.",
  "I am a human being with flaws, but my love for you is perfect and unconditional. I will always cherish and adore you, no matter what.",
  "I am the luckiest person alive to have you in my life. You are my everything, and I will love you forever and always."
];

// ============ ROUTES ============

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running, Rivan loves Hia! ❤️" });
});

// POST: Verify custom password
app.post("/api/verify", (req, res) => {
  const { answer } = req.body;

  // Normalize and check answer
  if (!answer || answer.toLowerCase().trim() !== CUSTOM_PASSWORD_ANSWER.toLowerCase()) {
    return res.status(401).json({
      success: false,
      message: "Wrong answer! Try again, silly! 😄"
    });
  }

  // Create JWT token
  const token = jwt.sign(
    { user: "hia", timestamp: new Date().toISOString() },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    message: "Welcome back, Hia! 💕",
    token: token
  });
});

// GET: Fetch love reasons
app.get("/api/love-reasons", (req, res) => {
  // Simple auth check (token in header)
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    res.json({
      success: true,
      reasons: LOVE_REASONS
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// GET: Get game config
app.get("/api/game-config", (req, res) => {
  res.json({
    gameName: "Make Hia Smile",
    description: "Help Rivan make Hia's anger disappear!",
    hiaName: "Raisa Islam Hia",
    rivanName: "Ahanaf Hasan Rivan"
  });
});

// Default export for Vercel
module.exports = app;

// If running locally:
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/health`);
  });
}
