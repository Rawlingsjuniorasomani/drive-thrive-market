import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create offer
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { car_id, offer_amount, message } = req.body;

    const result = await pool.query(
      'INSERT INTO offers (car_id, buyer_id, offer_amount, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [car_id, req.user.id, offer_amount, message]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create offer' });
  }
});

// Get offers for seller's cars
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, c.make, c.model, c.year, u.name, u.email FROM offers o
       JOIN cars c ON o.car_id = c.id
       JOIN users u ON o.buyer_id = u.id
       WHERE c.seller_id = $1
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// Update offer status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE offers SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update offer' });
  }
});

export default router;
