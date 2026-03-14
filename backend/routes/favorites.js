import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user favorites
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.* FROM cars c
       JOIN favorites f ON c.id = f.car_id
       WHERE f.user_id = $1`,
      [req.user.id]
    );

    const cars = await Promise.all(
      result.rows.map(async (car) => {
        const images = await pool.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
        return { ...car, images: images.rows.map(img => img.image_url) };
      })
    );

    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add to favorites
router.post('/:carId', authenticateToken, async (req, res) => {
  try {
    const { carId } = req.params;
    
    const result = await pool.query(
      'INSERT INTO favorites (user_id, car_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, carId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove from favorites
router.delete('/:carId', authenticateToken, async (req, res) => {
  try {
    const { carId } = req.params;
    
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND car_id = $2',
      [req.user.id, carId]
    );

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

export default router;
