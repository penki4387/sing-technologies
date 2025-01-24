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
    const query = "SELECT * FROM biddings WHERE userid = ? ORDER BY id DESC"; 
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



//result
router.post("/result", async (req, res) => {
  try {
    const { period, mins } = req.body;

    // Generate a random number between 0 and 9
    const number = Math.floor(Math.random() * 10);

    // Determine the small_big value based on the generated number
    const small_big = number <= 4 ? "small" : "big";

    // Determine the color based on the generated number
    let color = "";
    if (number === 0) {
      color = "linear-gradient(135deg, #ef4444 50%, #8b5cf6 50%)";
    } else if (number === 5) {
      color = "linear-gradient(135deg, #10B981 50%, #8b5cf6 50%)";
    } else if ([1, 3, 7, 9].includes(number)) {
      color = "red";
    } else if ([2, 4, 6, 8].includes(number)) {
      color = "green";
    }

    const query =
      "INSERT INTO results (number, color, small_big, mins, period) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      query,
      [number, color, small_big, mins, period],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        // Respond with a success message
        res.status(201).json({ message: "Result added successfully", results });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding result" });
  }
});



router.get("/result/:name",async(req,res)=>{
  const Tablename = req.params.name
  try {
    const query = "SELECT * FROM results WHERE mins = ? ";
    connection.query(query,[Tablename],(err,result)=>{
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (result.length === 0) return res.status(404).json({ error: 'no data found' });
      res.json(result);
    })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
})

module.exports = router;
