const express = require('express');
const app = express();

let housieNumbers = [];
let calledNumbers = [];

// Route to get the current Housie numbers
app.get('/numbers', (req, res) => {
  const maxNumber = 90;
  const numbers = [];

  // Generate 90 numbers (1 to 90)
  for (let i = 1; i <= maxNumber; i++) {
    numbers.push(i);
  }

  // Shuffle the numbers
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Divide the numbers into 9 groups of 10
  const groups = [];
  for (let i = 0; i < maxNumber; i += 10) {
    groups.push(numbers.slice(i, i + 10));
  }

  housieNumbers = groups;
  calledNumbers = [];

  res.json(housieNumbers);
});

// Route to get all called Housie numbers
app.get('/called', (req, res) => {
  res.json(calledNumbers);
});

// Route to reset the game and generate new Housie numbers
app.get('/reset', (req, res) => {
  const maxNumber = 90;
  const numbers = [];

  // Generate 90 numbers (1 to 90)
  for (let i = 1; i <= maxNumber; i++) {
    numbers.push(i);
  }

  // Shuffle the numbers
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Divide the numbers into 9 groups of 10
  const groups = [];
  for (let i = 0; i < maxNumber; i += 10) {
    groups.push(numbers.slice(i, i + 10));
  }

  housieNumbers = groups;
  calledNumbers = [];

  res.send('Housie numbers reset');
});

// Route to call a Housie number
app.post('/call/:number', (req, res) => {
  const number = parseInt(req.params.number);

  if (calledNumbers.includes(number)) {
    res.send(`Number ${number} already called`);
  } else {
    calledNumbers.push(number);
    res.send(`Number ${number} called`);
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});