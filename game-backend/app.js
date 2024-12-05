const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/db');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//const connectDB = require("./db/database");
//connectDB();




app.use(cors());

app.use(express.json());


app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});