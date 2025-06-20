const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
require('dotenv').config();

const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: 'User already exists' });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, username: user.username } });

  });
});



// Protected route
// router.get('/profile', authenticateToken, (req, res) => {
//   const { id, username } = req.user;
//   res.json({ id, username, message: "This is your protected profile" });
// });

// Profile route (Protected)
router.get("/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;

  // Query the user by ID to fetch the profile
  db.get(`SELECT id, username FROM users WHERE id = ?`, [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ error: "User not found" });

    // Return user profile data (e.g., username)
    res.json({
      id: user.id,
      username: user.username,
    });
  });
});





module.exports = router;
