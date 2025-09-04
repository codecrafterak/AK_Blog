// Node.js Express backend for comments
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let comments = [];

app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const { name, comment } = req.body;
  if (name && comment) {
    comments.push({ name, comment, date: new Date().toISOString() });
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Name and comment required.' });
  }
});

app.listen(PORT, () => {
  console.log(`Comments server running on http://localhost:${PORT}`);
});
