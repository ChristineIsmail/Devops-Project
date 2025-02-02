// src/routes/health.route.js

const express = require('express');
const router = express.Router();

// A sample function to simulate checking Redis connection (you can replace this with your actual Redis check)
const checkDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    // Simulate database check
    const isDatabaseConnected = true; // Simulate the check result
    if (isDatabaseConnected) resolve();
    else reject('Database connection failed');
  });
};

// GET: Health Check
router.get('/health', async (req, res) => {
  try {
    // Perform health checks
    await checkDatabaseConnection();

    res.status(200).json({
      status: 'success',
      message: 'API is running smoothly',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed: ' + error,
    });
  }
});

module.exports = router;
