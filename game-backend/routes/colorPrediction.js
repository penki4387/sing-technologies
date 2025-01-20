const express = require("express");
const connection = require("../config/db"); // Ensure database connection is configured
const router = express.Router();

router.post("/prediction", async (req, res) => {
  try {
    console.log("================");
    let { userid, amount, color, number, period, mins, small_big } = req.body;
    
    // Check if all required fields are provided
    if (!userid || !amount || !color || !number || !period || !mins) {
      return res.status(400).json({ error: "Enter required fields" });
    }

    // Set default value for small_big if it is not provided
    small_big = small_big || "NA";

    // Convert the 'number' array to JSON string before inserting into the database
    const numberJson = JSON.stringify(number);

    // SQL query to insert into the 'biddings' table
    const query =
      "INSERT INTO biddings (userid, amount, color, number, period, mins, small_big) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [userid, amount, color, numberJson, period, mins, small_big],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database insertion error" });
        }
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
