# 📡 API DOCUMENTATION

## Backend API Reference for Anger-Breaker Website

---

## 🚀 Base URL

**Local:** `http://localhost:3001`
**Production:** `https://your-domain.vercel.app`

---

## 🔐 Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

---

## 📋 ENDPOINTS

### 1. Health Check

**GET** `/api/health`

Check if the server is running.

**Request:**
```bash
curl http://localhost:3001/api/health
```

**Response:**
```json
{
  "status": "Server is running, Rivan loves Hia! ❤️"
}
```

**Status Code:** `200 OK`

---

### 2. Verify Custom Password

**POST** `/api/verify`

Verify the custom answer and get a JWT token.

**Request:**
```bash
curl -X POST http://localhost:3001/api/verify \
  -H "Content-Type: application/json" \
  -d '{"answer":"raisa"}'
```

**Request Body:**
```json
{
  "answer": "user's answer"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Welcome back, Hia! 💕",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Wrong answer! Try again, silly! 😄"
}
```

**Status Codes:**
- `200` - Correct answer
- `401` - Wrong answer
- `400` - Missing answer parameter

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| answer | string | Yes | The user's answer to the security question |

**Notes:**
- Answer is case-insensitive
- Whitespace is trimmed
- Returns a JWT token valid for 7 days

---

### 3. Get Love Reasons

**GET** `/api/love-reasons`

Fetch the list of 10 reasons why Rivan loves Hia.

**Request:**
```bash
curl http://localhost:3001/api/love-reasons \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "reasons": [
    "Your smile is my favorite thing in the entire world",
    "The way you get angry about tiny things is absolutely adorable",
    "Your laugh is contagious and makes even my worst days better",
    "You're the strongest person I know, yet so tender-hearted",
    "Your kindness to others shows me what a beautiful soul you have",
    "The way you care about people you love is inspiring",
    "Your creativity and imagination amaze me every single day",
    "You make me want to be a better version of myself",
    "Your presence is my safe place, my home",
    "Loving you is the easiest and best decision I've ever made"
  ]
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized"
}
```

**or**

```json
{
  "message": "Invalid token"
}
```

**Status Codes:**
- `200` - Success
- `401` - No token or invalid token

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer `<jwt_token>` | Yes |

**Notes:**
- Requires valid JWT token from `/api/verify`
- Returns exactly 10 reasons (one per card)
- Reasons are strings displayed in order

---

### 4. Game Configuration

**GET** `/api/game-config`

Get metadata about the game.

**Request:**
```bash
curl http://localhost:3001/api/game-config
```

**Response (200 OK):**
```json
{
  "gameName": "Make Hia Smile",
  "description": "Help Rivan make Hia's anger disappear!",
  "hiaName": "Raisa Islam Hia",
  "rivanName": "Ahanaf Hasan Rivan"
}
```

**Status Codes:**
- `200` - Success

**Notes:**
- No authentication required
- Returns game metadata
- Can be used to customize frontend messages

---

## 🔄 Request/Response Flow

```
┌─────────────────────────────────────────────────────┐
│  USER VISITS SITE                                   │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────────┐
         │  LockScreen Shows         │
         │  (GET /api/game-config)   │
         └───────────────────────────┘
                     │
         USER ENTERS ANSWER
                     │
                     ▼
         ┌───────────────────────────┐
         │  POST /api/verify         │
         │  {answer: "..."}          │
         └───────────────┬───────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
           WRONG               CORRECT
              │                     │
              ▼                     ▼
         Show Error        GET JWT TOKEN
                                   │
                          ┌────────┴──────────┐
                          │                   │
                    Store in         Load Game
                  localStorage       (FunnyGame)
                          │
                    PLAY GAME
                          │
                    METER → 100%
                          │
                          ▼
                  GET /api/love-reasons
                  (with Bearer token)
                          │
                          ▼
                   LoveRevelation
                    (Show reasons)
```

---

## 🔧 Token Format (JWT)

The token is a JWT with the following payload:

```json
{
  "user": "hia",
  "timestamp": "2024-06-14T10:30:00.000Z",
  "iat": 1718355000,
  "exp": 1718960800
}
```

**Token Details:**
- **Algorithm:** HS256
- **Expires in:** 7 days
- **Secret:** `JWT_SECRET` environment variable

---

## ⚠️ Error Handling

### Common Errors

**400 Bad Request** - Missing required parameters
```json
{
  "message": "Answer is required"
}
```

**401 Unauthorized** - Invalid credentials or token
```json
{
  "message": "Wrong answer! Try again, silly! 😄"
}
```

**401 Unauthorized** - Expired or invalid token
```json
{
  "message": "Invalid token"
}
```

**500 Internal Server Error** - Server issue
```json
{
  "message": "Internal server error"
}
```

---

## 🔐 Environment Variables

Required for production deployment:

```env
JWT_SECRET=@HiaIsAwesome2024!
```

Change in Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add `JWT_SECRET` with a strong value
3. Redeploy

---

## 📝 Example Usage

### Complete Flow (Frontend)

```javascript
// 1. User enters answer and clicks button
const answer = "raisa";

// 2. Verify answer
const verifyResponse = await fetch('/api/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ answer })
});

const data = await verifyResponse.json();

if (data.success) {
  // 3. Store token
  localStorage.setItem('hiaToken', data.token);
  
  // 4. Fetch love reasons with token
  const reasonsResponse = await fetch('/api/love-reasons', {
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });
  
  const reasonsData = await reasonsResponse.json();
  
  // 5. Display reasons
  console.log(reasonsData.reasons);
}
```

---

## 🧪 Testing with cURL

```bash
# 1. Check server status
curl http://localhost:3001/api/health

# 2. Get game config
curl http://localhost:3001/api/game-config

# 3. Verify answer (wrong)
curl -X POST http://localhost:3001/api/verify \
  -H "Content-Type: application/json" \
  -d '{"answer":"wrong"}'

# 4. Verify answer (correct)
curl -X POST http://localhost:3001/api/verify \
  -H "Content-Type: application/json" \
  -d '{"answer":"raisa"}'

# 5. Get token from response, then:
curl http://localhost:3001/api/love-reasons \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Deployment Notes

### Local Development
- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:3000`
- CORS is enabled for development

### Vercel Production
- Both frontend and backend deployed together
- API routes accessed via `/api/*` paths
- Environment variables set in Vercel dashboard
- Automatic HTTPS enabled

---

## 📊 Rate Limiting

Currently not implemented, but can be added:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## 📞 Support

For API issues:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Test with cURL commands
4. Verify environment variables are set

---

**API Documentation v1.0 | Made with ❤️ for Raisa Islam Hia**
