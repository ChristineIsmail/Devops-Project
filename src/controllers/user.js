const db = require('../dbClient')

module.exports = {
  // Create User
  create: (user, callback) => {
    if (!user.username) {
      return callback(new Error("Wrong user parameters"), null);
    }

    // Check if user already exists
    db.exists(user.username, (err, res) => {
      if (err) return callback(err, null);
      
      if (res === 1) {
        return callback(new Error("User already exists"), null); // User exists
      }
      
      // Create User schema
      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname,
      };
      
      // Save to DB
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null);
        callback(null, res); // Return callback with success
      });
    });
  },

  // Get User
  get: (username, callback) => {
    // Fetch user data by username from Redis
    db.hgetall(username, (err, res) => {
      if (err) return callback(err, null);
      
      if (!res) {
        return callback(new Error("User not found"), null); // User doesn't exist
      }

      callback(null, res); // Return user data
    });
  },

  // Update User
  update: (username, user, callback) => {
    // Check if user exists
    db.exists(username, (err, res) => {
      if (err) return callback(err, null);

      if (res === 0) {
        return callback(new Error("User not found"), null); // User doesn't exist
      }

      // Update user data
      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname,
      };

      db.hmset(username, userObj, (err, res) => {
        if (err) return callback(err, null);
        callback(null, res); // Return success
      });
    });
  },

  // Delete User
  delete: (username, callback) => {
    // Check if user exists
    db.exists(username, (err, res) => {
      if (err) return callback(err, null);

      if (res === 0) {
        return callback(new Error("User not found"), null); // User doesn't exist
      }

      // Delete the user
      db.del(username, (err, res) => {
        if (err) return callback(err, null);
        callback(null, res); // Return success
      });
    });
  }
};
