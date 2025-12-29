// Copilot:
// Create an Express.js server skeleton for an MVP API.
// Requirements:
// - Use express, helmet, express-rate-limit, jsonwebtoken, pg
// - Load env variables (PORT, DATABASE_URL, JWT_SECRET)
// - Connect to Postgres using pg Pool
// - Auto-create minimal tables: users, health_logs, chat_logs (if not exist)
// - Define empty route handlers (TODO) for:
//   POST /api/auth/verify
//   POST /api/mobile/logs
//   POST /api/mobile/chat
//   DELETE /api/auth/me
// - Add JWT auth middleware skeleton
// - Do NOT implement business logic yet
// - Focus on clean structure and comments

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Postgres connection pool
const pool = new Pool({ connectionString: DATABASE_URL });

// Auto-create tables if not exist
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      phone VARCHAR(32) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted_at TIMESTAMP,
      token_version INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS health_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      log_type VARCHAR(32),
      payload JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS chat_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      user_message TEXT,
      assistant_message TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

// JWT auth middleware skeleton
function authenticateJWT(req, res, next) {
  // TODO: Implement JWT verification
  next();
}

// Route handlers (TODO: implement logic)
app.post('/api/auth/verify', (req, res) => {
  // TODO: Auth verification logic
  res.status(501).json({ message: 'Not implemented' });
});

app.post('/api/mobile/logs', authenticateJWT, (req, res) => {
  // TODO: Log health data
  res.status(501).json({ message: 'Not implemented' });
});

app.post('/api/mobile/chat', authenticateJWT, (req, res) => {
  // TODO: Chat logic
  res.status(501).json({ message: 'Not implemented' });
});

app.delete('/api/auth/me', authenticateJWT, (req, res) => {
  // TODO: Delete user logic
  res.status(501).json({ message: 'Not implemented' });
});

// Start server after DB init
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
