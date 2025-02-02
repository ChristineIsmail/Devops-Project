const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

// POST: Create User
userRouter.post('/', (req, resp) => {
  userController.create(req.body, (err, res) => {
    let respObj;
    if (err) {
      respObj = {
        status: "error",
        msg: err.message,
      };
      return resp.status(400).json(respObj);
    }
    respObj = {
      status: "success",
      msg: res,
    };
    resp.status(201).json(respObj);
  });
});

// GET: Get User by username
userRouter.get('/:username', (req, resp) => {
  const username = req.params.username;
  userController.get(username, (err, user) => {
    let respObj;
    if (err) {
      respObj = {
        status: "error",
        msg: err.message,
      };
      return resp.status(400).json(respObj);
    }
    respObj = {
      status: "success",
      user: user,
    };
    resp.status(200).json(respObj);
  });
});

// PUT: Update User by username
userRouter.put('/:username', (req, resp) => {
  const username = req.params.username;
  const userData = req.body;
  userController.update(username, userData, (err, res) => {
    let respObj;
    if (err) {
      respObj = {
        status: "error",
        msg: err.message,
      };
      return resp.status(400).json(respObj);
    }
    respObj = {
      status: "success",
      msg: res,
    };
    resp.status(200).json(respObj);
  });
});

// DELETE: Delete User by username
userRouter.delete('/:username', (req, resp) => {
  const username = req.params.username;
  userController.delete(username, (err, res) => {
    let respObj;
    if (err) {
      respObj = {
        status: "error",
        msg: err.message,
      };
      return resp.status(400).json(respObj);
    }
    respObj = {
      status: "success",
      msg: res,
    };
    resp.status(200).json(respObj);
  });
});

module.exports = userRouter;
