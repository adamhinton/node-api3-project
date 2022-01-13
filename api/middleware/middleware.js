const User = require("../users/users-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

//async because we're calling to database
async function validateUserId(req, res, next) {
  try {
    //await because we're requesting from server
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "no such user",
      });
    } else {
      //this defines user for the next middleware
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
  console.log("logger middleware");
  next();
}

function validatePost(req, res, next) {
  console.log("logger middleware");
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
