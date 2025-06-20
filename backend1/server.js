const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth API Running...');
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
