const http = require('http');

// Delay function that returns a promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Create the HTTP server
const server = http.createServer(async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api_lenta') {
    await delay(5000); // Wait for 5 seconds
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('SLOOOOOW'); // Return true
  } else if (req.method === 'GET' && req.url === '/api_fast') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('fast!'); // Return server status
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
