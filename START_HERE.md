# 🚀 GETTING STARTED NOW - 5 MINUTE SETUP

> **You're here. Let's deploy this TODAY.** ⚡

---

## ⏱️ THIS WILL TAKE 5 MINUTES

Follow these exact steps. Don't skip anything.

---

## STEP 1: Install Dependencies (2 minutes)

Open terminal in this folder and run:

```bash
npm install
```

Wait for it to finish. You'll see:
```
added 1500+ packages in 2m
```

✅ Done! Move to Step 2.

---

## STEP 2: Customize (1 minute)

### Change the SECRET ANSWER

Open file: `api/index.js`

Find line 18:
```javascript
const CUSTOM_PASSWORD_ANSWER = "raisa";
```

Change to something Raisa knows:
```javascript
const CUSTOM_PASSWORD_ANSWER = "pizza"; // Example!
```

**Good examples:**
- `"2024-06-14"` (your anniversary)
- `"princess"` (pet name)
- `"i love you"` (inside joke)

### Add LOVE REASONS

In same file `api/index.js`, find lines 20-31 (the `LOVE_REASONS` array).

Replace ALL 10 reasons with YOUR reasons. Example:

```javascript
const LOVE_REASONS = [
  "You make me happier than anyone else ever could",
  "Your smile is my favorite thing",
  "You're the strongest and kindest person I know",
  "The way you laugh makes my heart skip",
  "You believe in me when I don't believe in myself",
  "Your presence is my peace",
  "I love your weird and wonderful personality",
  "You make every moment special",
  "You're my safe place",
  "I fall for you more every single day"
];
```

✅ Done! Now test it.

---

## STEP 3: Test Locally (1 minute)

**Terminal 1:**
```bash
npm start
```

Wait until you see:
```
Compiled successfully!
Local: http://localhost:3000
```

Open `http://localhost:3000` in your browser.

**You should see:**
- Purple/pink background
- Lock screen with floating hearts
- "Raisa Islam Hia" at the top
- Input field asking for answer

✅ Try entering your secret answer!

---

## STEP 4: Deploy to GitHub (30 seconds)

Open terminal and run:

```bash
git init
git add .
git commit -m "Anger-breaker site for Raisa"
```

Now create a GitHub repo:

1. Go to [github.com/new](https://github.com/new)
2. Name it: `hia-anger-breaker`
3. Click **"Create repository"**
4. Copy the command they show you
5. Run it in your terminal

Example:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hia-anger-breaker.git
git branch -M main
git push -u origin main
```

✅ Your code is on GitHub!

---

## STEP 5: Deploy to Vercel (30 seconds)

1. Go to [vercel.com](https://vercel.com/signup) and sign up (or sign in)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repo URL
5. Click **"Import"**
6. Vercel auto-fills settings (leave as default)
7. Under **"Environment Variables"**, add:
   - **Name:** `JWT_SECRET`
   - **Value:** `@HiaIsAwesome2024!`
8. Click **"Deploy"**

**Wait 2-5 minutes...**

When done, you'll see:
```
✓ Deployment successful!
Your live URL: https://something.vercel.app
```

✅ Copy that URL!

---

## 🎉 YOU'RE DONE!

Your site is live at that URL!

**Next:**
1. **Test it** - Visit that URL in browser
2. **Test on mobile** - Ask your friend to test
3. **Send to Raisa** - Share the URL! 💕

---

## 🧪 TEST CHECKLIST

Before sending to Raisa, test:

- [ ] Wrong answer shows error
- [ ] Correct answer works
- [ ] Game loads
- [ ] Button escapes when you hover (first 3 times)
- [ ] Button fills screen on 4th attempt
- [ ] Game completes at 100% happiness
- [ ] Love reasons display beautifully
- [ ] Works on mobile phone
- [ ] All animations are smooth

---

## 💬 SAMPLE MESSAGE TO SEND

Copy this and send to Raisa:

> "I made something special for you. Go answer the question and let me know what you think 💕"
> 
> [PASTE YOUR VERCEL URL HERE]

---

## 🆘 SOMETHING BROKE?

### "npm install failed"
- Install Node.js from nodejs.org
- Close terminal, open new one
- Try again

### "npm start shows errors"
- `Ctrl+C` to stop
- Run `npm install` again
- Run `npm start`

### "Vercel deployment failed"
- Check Vercel build logs (they show the error)
- Common fix: Restart from Step 5

### "Can't find secret answer"
- Make sure `api/index.js` line 18 is changed
- Make sure you ran `npm install` after editing
- Try a different answer

---

## 📚 WANT MORE DETAILS?

Read these files:
- **Full setup:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Customization:** [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Everything:** [MASTER_INDEX.md](MASTER_INDEX.md)

---

## ✨ TIPS

💡 **Tip 1:** The more personal the love reasons, the more impact!

💡 **Tip 2:** Use something only SHE knows for the answer

💡 **Tip 3:** Test on mobile before sending

💡 **Tip 4:** Screenshot her reaction! 📸

---

## 🎁 THAT'S IT!

You just built a personalized anger-breaker website in 5 minutes. 

Go make her smile! 😊💕

---

**Questions?** Open [MASTER_INDEX.md](MASTER_INDEX.md) or [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

**Ready for more?** [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) shows how to make it even more personal.

---

Made with ❤️ for Raisa Islam Hia by Ahanaf Hasan Rivan

**Go deploy it!** 🚀✨
