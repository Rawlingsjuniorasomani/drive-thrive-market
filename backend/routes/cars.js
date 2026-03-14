import express from 'express';
import pool from '../db.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all cars with filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { make, model, bodyType, fuelType, transmission, condition, priceMin, priceMax, search, sortBy, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM cars WHERE is_active = TRUE';
    const params = [];
    let paramCount = 1;

    if (make) {
      query += ` AND make = $${paramCount++}`;
      params.push(make);
    }
    if (model) {
      query += ` AND model = $${paramCount++}`;
      params.push(model);
    }
    if (bodyType) {
      query += ` AND body_type = $${paramCount++}`;
      params.push(bodyType);
    }
    if (fuelType) {
      query += ` AND fuel_type = $${paramCount++}`;
      params.push(fuelType);
    }
    if (transmission) {
      query += ` AND transmission = $${paramCount++}`;
      params.push(transmission);
    }
    if (condition) {
      query += ` AND condition = $${paramCount++}`;
      params.push(condition);
    }
    if (priceMin) {
      query += ` AND price >= $${paramCount++}`;
      params.push(priceMin);
    }
    if (priceMax) {
      query += ` AND price <= $${paramCount++}`;
      params.push(priceMax);
    }
    if (search) {
      query += ` AND (make ILIKE $${paramCount++} OR model ILIKE $${paramCount++} OR description ILIKE $${paramCount++})`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      paramCount += 3;
    }

    if (sortBy === 'price-asc') query += ' ORDER BY price ASC';
    else if (sortBy === 'price-desc') query += ' ORDER BY price DESC';
    else if (sortBy === 'mileage') query += ' ORDER BY mileage ASC';
    else if (sortBy === 'newest') query += ' ORDER BY created_at DESC';
    else query += ' ORDER BY featured DESC, created_at DESC';

    query += ` LIMIT $${paramCount++} OFFSET $${paramCount++}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    
    // Get images for each car
    const cars = await Promise.all(
      result.rows.map(async (car) => {
        const images = await pool.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
        return { ...car, images: images.rows.map(img => img.image_url) };
      })
    );

    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// Get single car
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const carResult = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    
    if (carResult.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const car = carResult.rows[0];
    const images = await pool.query('SELECT image_url FROM car_images WHERE car_id = $1', [id]);
    const seller = await pool.query('SELECT id, name, rating, total_sales FROM users WHERE id = $1', [car.seller_id]);

    res.json({ 
      ...car, 
      images: images.rows.map(img => img.image_url),
      seller: seller.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
});

// Create car listing
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { year, make, model, bodyType, fuelType, transmission, condition, mileage, price, description, engine, horsepower, color, vin, location, listingType } = req.body;
    
    const result = await pool.query(
      'INSERT INTO cars (seller_id, year, make, model, body_type, fuel_type, transmission, condition, mileage, price, description, engine, horsepower, color, vin, location, listing_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
      [req.user.id, year, make, model, bodyType, fuelType, transmission, condition, mileage, price, description, engine, horsepower, color, vin, location, listingType]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// Update car listing
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const car = await pool.query('SELECT seller_id FROM cars WHERE id = $1', [id]);
    
    if (car.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    if (car.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updates = Object.entries(req.body).filter(([key]) => !['id', 'seller_id', 'created_at'].includes(key));
    let query = 'UPDATE cars SET ';
    const params = [];
    
    updates.forEach(([ key, value], idx) => {
      const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      query += `${dbKey} = $${idx + 1}${idx < updates.length - 1 ? ', ' : ''}`;
      params.push(value);
    });
    
    query += `, updated_at = NOW() WHERE id = $${updates.length + 1} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update car' });
  }
});

// Delete car listing
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const car = await pool.query('SELECT seller_id FROM cars WHERE id = $1', [id]);
    
    if (car.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    if (car.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await pool.query('DELETE FROM cars WHERE id = $1', [id]);
    res.json({ message: 'Car deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

export default router;
