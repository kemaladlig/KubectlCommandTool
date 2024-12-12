const express = require('express');
const app = express();
const connectDB = require('./db');

// Express'in JSON parser'ını kullanıyoruz
app.use(express.json());

// MongoDB bağlantısını başlatıyoruz
connectDB();

// Ana rota
app.get('/', (req, res) => {
  res.send('Running...');
});

// Deneme rotası
app.get('/deneme', (req, res) => {
  res.json({ "users": ["user1", "user2"] });
});

// Sunucuyu başlatıyoruz
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});