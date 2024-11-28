const express = require('express');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Dummy student data
const students = [
  { id: 1, name: 'Alice', age: 20 },
  { id: 2, name: 'Bob', age: 22 },
  { id: 3, name: 'Charlie', age: 23 },
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
