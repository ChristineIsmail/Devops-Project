const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL, // Using environment variable for Redis connection URL
});

// Connect to Redis (with async/await)
async function connectRedis() {
  try {
    await client.connect(); // Use 'await' to connect
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis error:', err);
  }
}

// Call the connection function
connectRedis();

// Handle errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Export client to use in other parts of the application
module.exports = client;
