const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const getAllCommands = require('./service/getAllCommands');

const app = express();

// Express'in JSON parser'ını kullanıyoruz
app.use(express.json());

app.use(cors());
/* app.use(cors({
  origin: 'http://localhost:5000' 
}));
 */

// MongoDB bağlantısını başlatıyoruz
connectDB();

// Ana rota
app.get('/', (req, res) => {
  res.send('Running...');
});

app.get('/commands', async (req,res) => {
  try {
    const commands= await getAllCommands();
    res.json(commands);

  } catch (error) {
    console.log("Veriler çekilirken hata oluştu. ", error);
  }

});


// Sunucuyu başlatıyoruz
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});