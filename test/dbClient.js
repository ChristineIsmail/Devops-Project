const redis = require('redis');

// Use the Redis URL from environment variables (e.g., from Render)
const client = redis.createClient({
  url: process.env.REDIS_URL, // The Redis URL is set through the environment variable
});

// Add event listeners for Redis connection
client.on('connect', () => {
  console.log('Connected to Redis');
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
