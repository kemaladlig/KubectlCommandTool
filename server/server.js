const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const getAllCommands = require('./service/getAllCommands');

const app = express();

// Allow only the frontend domain to access the API
const corsOptions = {
  origin: 'https://kubectl-command-tool.duckdns.org', // Replace with your frontend domain
  methods: 'GET,POST', // Adjust according to the methods your frontend uses
  allowedHeaders: 'Content-Type,Authorization', // Adjust based on your needs
};

app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with the specific configuration

// MongoDB connection
connectDB();

app.get('/', (req, res) => {
  res.send('Running...');
});

app.get('/commands', async (req, res) => {
  try {
    const commands = await getAllCommands();
    res.json(commands);
  } catch (error) {
    console.log("Error occurred while fetching data.", error);
    res.status(500).json({ message: 'Error fetching commands' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
