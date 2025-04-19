const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public_html")));

const db = mysql.createConnection({
  host: "localhost",
  user: "yogauser",
  password: "CSC543",
  database: "yoga_database"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err) => {
    if (err) return res.status(400).send("User already exists");
    res.send("Registered successfully");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
