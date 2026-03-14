import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get conversations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END)
        CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END as other_user_id,
        m.* FROM messages m
       WHERE sender_id = $1 OR receiver_id = $1
       ORDER BY CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END, created_at DESC`,
      [req.user.id]
    );

    const conversations = await Promise.all(
      result.rows.map(async (msg) => {
        const userId = msg.sender_id === req.user.id ? msg.receiver_id : msg.sender_id;
        const user = await pool.query('SELECT id, name FROM users WHERE id = $1', [userId]);
        return { 
          user: user.rows[0], 
          lastMessage: msg.message,
          lastMessageTime: msg.created_at 
        };
      })
    );

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Get messages with user
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [req.user.id, userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { receiver_id, message, car_id } = req.body;

    const result = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, car_id, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, receiver_id, car_id, message]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
