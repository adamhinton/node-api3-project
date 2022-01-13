const User = require("../users/users-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

//async because we're calling to database
//we call this in users-router.js
async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "no such user",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    //req?
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    req.name = name.trim();
    next();
  }
}

//basically the same thing as validateUser except with text instead of name
function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    //req?
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    req.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
