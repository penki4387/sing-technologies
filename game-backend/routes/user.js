const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password, phoneNumber, dob, referalCode } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, password, phone, dob, code) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [name, email, hashedPassword, phoneNumber, dob, referalCode], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });}
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: user.username, fundingWallet: user.fundingWallet, supportWallet: user.supportWallet });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Get all users
router.get('/allusers', async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    connection.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

//Get one user by name
router.get('/user/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [name], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });
      res.json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});
module.exports = router;
