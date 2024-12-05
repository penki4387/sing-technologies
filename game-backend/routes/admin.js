const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../config/db'); // Ensure your DB connection is set up

// Admin login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "SELECT * FROM admins WHERE username = ?";
    connection.query(query, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.length === 0) return res.status(404).json({ error: 'Admin not found' });

      const admin = results[0];
      if (admin.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: admin.id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in admin' });
  }
});

module.exports = router;
