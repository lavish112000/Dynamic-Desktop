
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'app')));

// Handle all routes with index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(PORT, () => {
  console.log('🚀 Dynamic Desktop is running on http://localhost:' + PORT);
  
  // Auto-open in default browser
  const start = process.platform === 'darwin' ? 'open' : 
                process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(start + ' http://localhost:' + PORT);
});
