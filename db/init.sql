-- Copilot:
-- Create minimal SQL schema for MVP:
-- users(id, phone, created_at, deleted_at, token_version)
-- health_logs(id, user_id, log_type, payload, created_at)
-- chat_logs(id, user_id, user_message, assistant_message, created_at)

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
