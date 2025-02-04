const redis = require('redis');

// Use the Redis URL from environment variables for Render
const client = redis.createClient({
  url: process.env.REDIS_URL,  
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
client.connect();

module.exports = client;
