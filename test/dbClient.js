const redis = require('redis');

// Create Redis client using the environment variable for Redis URL
const client = redis.createClient({
  url: process.env.REDIS_URL,  // Get the Redis URL from environment variable
});

// Listen for connection event
client.on('connect', () => {
  console.log('Connected to Redis');
});

// Handle errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
