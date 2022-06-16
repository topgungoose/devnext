const Item = require('../models/itemModels');

const itemController = {};

itemController.getAllItems = async (req, res, next) => {
  try {
    // store retrieved users into res.locals and move on to next middleware
    const items = await Item.find({}).exec();
    res.locals.items = items;
    return next();
  }
  catch (err) {
    // if an error occurs in the database, call next with the error message passed in
    // for the express global error handler to catch
    return next({
      log: 'Error in itemController.getAllItems',
      status: 500,
      message: { err: JSON.stringify(err) }
    })
  }
};

itemController.postItem = async (req, res, next) => {
  try {
    const { name, price, details, url, type, username } = req.body;
    const newItem = await Item.create({
      name,
      price,
      details,
      url,
      type,
      username
    });
    res.locals.newItem = newItem;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error occurred in itemController.postItem',
      status: 500,
      message: { err: JSON.stringify(err) },
    });
  }
};


itemController.findItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const foundItem = await Item.findById(itemId).exec();
    res.locals.foundItem = foundItem;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error occurred in itemController.findItem',
      status: 500,
      message: { err: JSON.stringify(err) }
    });
  }
};

itemController.updateItem = async (req, res, next) => {
  try {
    const { name, price, details, url, type, username } = req.body;
    await Item.updateOne({ name, price, details, url, type, username }).exec()
    return next();
  }
  catch (err) {
    return next({
      log: 'Error occurred in itemController.updateItem',
      status: 500,
      message: { err: JSON.stringify(err) }
    });
  }
};

// itemController.deleteItem = async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     await Item.deleteOne({ name }).exec();
//     return next()
//   }
//   catch (err) {
//     return next({
//       log: 'Error occurred in itemController.deleteItem',
//       status: 500,
//       message: { err: JSON.stringify(err) }
//     });
//   }
// }

module.exports = itemController;
