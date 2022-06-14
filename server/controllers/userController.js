// TODO: Refactor the entire Controller to Async/Await

const User = require('../models/userModels');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  // const username = req.body.username;
  // const password = req.body.password;
  //console.log(username,password);

  // console.log(req.body);
  User.create({ username, password })
    .then((doc) => {
      // res.locals.createdUser = doc;
      console.log(doc);
      next();
    })
    .catch((err) => {
      next({
        log: `userController.createUser: ERROR: ${err}`,
        message: { err: 'Error occurred in userController.createUser.' },
      });
    });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body;

  console.log(req.body);
  User.find({ username: username, password: password })
    .then((doc) => {
      console.log('this is doc', doc);
      if (doc.length === 0) res.locals.found = false;
      else {
        res.locals.found = true;
      }
      next();
    })
    .catch((err) => {
      next({
        log: `userController.verifyUser: ERROR: ${err}`,
        message: { err: 'Error occurred in userController.verifyUser.' },
      });
    });
};

// user.populate() add new instance of items in array    api/user/sell

userController.updateProductList = (req, res, next) => {
  // get id from params
  const { userId } = req.params;
  User.updateOne(
    { id: userId },
    { $push: { products: res.locals.newItem._id } }
  )
    .then((updatedItem) => {
      res.locals = updatedItem;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.updateProductList: ERROR: ${err}`,
        message: { err: 'Error occurred in userController.updateProductList.' },
      });
    });
};

userController.updateFavList = (req, res, next) => {
  const { itemId, userId } = req.body;
  console.log(itemId, userId);
  User.updateOne({ id: userId }, { $push: { favs: itemId } })
    .then((updatedItem) => {
      res.locals = updatedItem;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.updateFavList: ERROR: ${err}`,
        message: { err: 'Error occurred in userController.updateFavList.' },
      });
    });
};
// user.getAllItems()   api/items/getAll

module.exports = userController;
