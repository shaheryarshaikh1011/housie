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


app.get('/stats', (req, res) => {
    const stats = {
      totalNumbersCalled: calledNumbers.length,
      averageTimeBetweenCalls: calculateAverageTimeBetweenCalls(),
    };
    res.json(stats);
  });
  
  function calculateAverageTimeBetweenCalls() {
    const callTimes = calledNumbers.map((call) => call.timestamp);
    const timeDifferences = [];
    for (let i = 0; i < callTimes.length - 1; i++) {
      const timeDifference = callTimes[i + 1] - callTimes[i];
      timeDifferences.push(timeDifference);
    }
    const totalDifference = timeDifferences.reduce((acc, curr) => acc + curr, 0);
    const averageDifference = totalDifference / timeDifferences.length;
    return averageDifference;
  }
  let autoCallInterval; // Global variable to store the auto-call interval

  // Route to start auto-calling
  app.post('/auto-call/start', (req, res) => {
    const intervalSeconds = req.body.intervalSeconds || 5; // Default interval of 5 seconds
    autoCallInterval = setInterval(callNextNumber, intervalSeconds * 1000);
    res.sendStatus(200);
  });
  
  // Route to stop auto-calling
  app.post('/auto-call/stop', (req, res) => {
    clearInterval(autoCallInterval);
    res.sendStatus(200);
  });
  
  function callNextNumber() {
    if (remainingNumbers.length > 0) {
      const nextNumber = remainingNumbers.shift();
      calledNumbers.push({ number: nextNumber, timestamp: Date.now() });
    } else {
      clearInterval(autoCallInterval);
    }
  }


// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});