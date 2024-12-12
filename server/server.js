const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Running...');
});

app.get('/deneme', (req, res) => {
  res.json({ "users": ["user1", "user2"] })
})

app.listen(3000, () => console.log('Server is running on port 3000')); 