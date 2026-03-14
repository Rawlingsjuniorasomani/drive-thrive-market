import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Request test drive
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { car_id, preferred_date, buyer_name, buyer_phone } = req.body;

    const result = await pool.query(
      'INSERT INTO test_drive_requests (car_id, buyer_id, preferred_date, buyer_name, buyer_phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [car_id, req.user.id, preferred_date, buyer_name, buyer_phone]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to request test drive' });
  }
});

// Get test drive requests for seller
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, c.make, c.model, c.year, u.name, u.phone FROM test_drive_requests t
       JOIN cars c ON t.car_id = c.id
       JOIN users u ON t.buyer_id = u.id
       WHERE c.seller_id = $1
       ORDER BY t.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch test drive requests' });
  }
});

// Update test drive status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE test_drive_requests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update test drive' });
  }
});

export default router;
