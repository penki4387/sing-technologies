const express = require('express');
const connection = require('../config/db'); // Ensure database connection is configured
const router = express.Router();

// Create a new withdrawal entry
router.post('/withdrawl', async (req, res) => {
  const { userId, balance, cryptoname, status } = req.body;

  if (!userId || !cryptoname) {
    return res.status(400).json({ error: 'userId and cryptoname are required fields.' });
  }

  try {
    const query = `
      INSERT INTO withdrawl (userId, balance, cryptoname, status)
      VALUES (?, ?, ?, ?)
    `;
    connection.query(
      query,
      [userId, balance || 0, cryptoname, status || 0],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Withdrawal entry created successfully', id: results.insertId });
      }
    );
  } catch (error) {
    console.error('Error creating withdrawal entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all withdrawal entries with username from the user table


router.get('/withdrawl', async (req, res) => {
  try {
    const query = 'SELECT * FROM withdrawl';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching withdrawal entries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single withdrawal entry by ID
router.get('/withdrawl/:id', async (req, res) => {
  const withdrawlId = req.params.id;

  try {
    const query = 'SELECT * FROM withdrawl WHERE id = ?';
    connection.query(query, [withdrawlId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Withdrawal entry not found' });
      }
      res.json(results[0]);
    });
  } catch (error) {
    console.error('Error fetching withdrawal entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a withdrawal entry by ID
router.put('/withdrawl/:id', async (req, res) => {
  const withdrawlId = req.params.id;
  const { balance, cryptoname, status } = req.body;
  console.log(req.body);

  if (!balance || !cryptoname) {
    return res.status(400).json({ error: 'Balance and cryptoname are required fields.' });
  }

  try {
    const query = `
      UPDATE withdrawl
      SET balance = ?, cryptoname = ?, status = ?
      WHERE id = ?
    `;
    connection.query(
      query,
      [balance, cryptoname, status || 0, withdrawlId],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database query error' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Withdrawal entry not found' });
        }
        res.json({ message: 'Withdrawal entry updated successfully' });
      }
    );
  } catch (error) {
    console.error('Error updating withdrawal entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a withdrawal entry by ID
router.delete('/withdrawl/:id', async (req, res) => {
  const withdrawlId = req.params.id;

  try {
    const query = 'DELETE FROM withdrawl WHERE id = ?';
    connection.query(query, [withdrawlId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Withdrawal entry not found' });
      }
      res.json({ message: 'Withdrawal entry deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting withdrawal entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
