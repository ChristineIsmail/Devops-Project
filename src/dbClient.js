const redis = require('redis');

// Get the Redis URL from environment variables
const redisURL = process.env.REDIS_URL;

// Create the Redis client using the connection URL
const client = redis.createClient({
  url: redisURL
});

// Connect to Redis
client.connect();

// Event listeners for Redis connection
client.on('connect', () => {
  console.log('Connected to Redis...');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Export the Redis client
module.exports = client;
