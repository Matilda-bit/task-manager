const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Your API routes
server.use('/tasks', router);

// Start the server
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
