const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');

// Import the health route
const healthRouter = require('./routes/health.route'); 

const app = express();
const port = process.env.PORT || 3000;

const db = require('./dbClient');
db.on("error", (err) => {
  console.error(err);
});

// Use middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Health check route
app.use(healthRouter); // Mount the health check route

// Default route for testing
app.get('/', (req, res) => res.send('Hello World!'));

// Mount user routes
app.use('/user', userRouter);

// Start the server
const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port " + port);
});

module.exports = server;
