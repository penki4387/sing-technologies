const express = require("express");
const connection = require("../config/db"); // Ensure database connection is configured
const router = express.Router();

router.post("/prediction", async (req, res) => {
    try {
      console.log("================");
      const { userid, amount, color, number, period, mins } = req.body;
      if (!userid || !amount || !color || !number || !period || !mins) {
        return res.status(400).json({ error: "Enter required fields" });
      }
      const query =
        "INSERT INTO biddings (userid, amount,color, number, period, mins) VALUES (?, ?, ?, ?, ?,?)";
      connection.query(
        query,
        [userid, amount,color, number, period, mins],
        (err, result) => {
            console.log(err);
            
          if (err) return res.status(500).json({ error: "Database insertion error" });
          res.status(201).json({
            message: "Bidding placed successfully",
            id: result.insertId, // This returns the auto-incremented id
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Error placing bidding" });
    }
  });
  

  router.get("/prediction/:userid", async (req, res) => {
    try {
      const { userid } = req.params;
      const query = "SELECT * FROM biddings WHERE userid = ? ORDER BY id DESC"; // Change 'id' to 'created_at' if needed
      connection.query(query, [userid], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query error" });
        if (results.length === 0)
          return res.status(404).json({ error: "User not found" });
        res.json(results);
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user history" });
    }
  });
  

module.exports = router;
