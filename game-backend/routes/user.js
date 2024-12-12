const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password, phoneNumber, dob, referalCode } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the 'users' table
    const query = "INSERT INTO users (username, email, password, phone, dob, code) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [name, email, hashedPassword, phoneNumber, dob, referalCode], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Get the newly created user's ID
      const userId = results.insertId;

      // List of cryptocurrencies
      const cryptocurrencies = ['BNB', 'USDC', 'APE', 'BUSD', 'CRO', 'DAI', 'LINK', 'SAND', 'SHIB', 'UNI', 'INR','CP'];

      // Generate wallet entries for the new user
      const walletQuery = "INSERT INTO wallet (userId, balance, cryptoname) VALUES ?";
      const walletValues = cryptocurrencies.map(crypto => [userId, 0, crypto]);

      // Insert wallet entries into the 'wallet' table
      connection.query(walletQuery, [walletValues], (err, walletResults) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error creating wallet entries' });
        }

        // Respond with a success message
        res.status(201).json({ message: 'User registered and wallet initialized successfully' });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});


// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find the user by email
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Fetch wallet details for the logged-in user
      const walletQuery = "SELECT * FROM wallet WHERE userId = ?";
      connection.query(walletQuery, [user.id], (err, walletResults) => {
        if (err) return res.status(500).json({ error: 'Error fetching wallet data' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the user profile and wallet data in the response
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            referalCode: user.code
            
          },
          wallet: walletResults, // Include wallet data
        });
      });
    });
  } catch (error) {
    console.error(error);
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



// Delete user by ID
router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Start a transaction to delete wallets and the user atomically
    connection.beginTransaction((err) => {
      if (err) return res.status(500).json({ error: 'Error starting transaction' });

      // Delete wallets associated with the user
      const deleteWalletsQuery = "DELETE FROM wallet WHERE userId = ?";
      connection.query(deleteWalletsQuery, [userId], (err, walletResults) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error deleting wallets' });
          });
        }

        // Delete the user
        const deleteUserQuery = "DELETE FROM users WHERE id = ?";
        connection.query(deleteUserQuery, [userId], (err, userResults) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: 'Error deleting user' });
            });
          }

          if (userResults.affectedRows === 0) {
            return connection.rollback(() => {
              res.status(404).json({ error: 'User not found' });
            });
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ error: 'Error committing transaction' });
              });
            }

            res.json({ message: 'User and associated wallets deleted successfully' });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user and wallets' });
  }
});


// Update user by ID
router.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, phone, dob } = req.body;
  try {
    const query = "UPDATE users SET username = ?, email = ?, phone = ?, dob = ? WHERE id = ?";
    connection.query(query, [username, email, phone, dob, userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});
module.exports = router;
