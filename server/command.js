const mongoose = require('mongoose');

// Komut Schema'sı
const commandSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true, 
    unique: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  guide: {
    type: String, 
    required: true,
  },
  category: {
    type: String, 
  },
  tags: {
    type: [String], 
  },
}, {
  timestamps: true, 
});

// Komut Modeli
const Commands = mongoose.model('Commands', commandSchema);

module.exports = Commands;