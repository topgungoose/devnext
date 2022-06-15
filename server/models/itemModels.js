const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String },
  url: { type: String },
  type: { type: String },
  username: { type: String },
});

/**
 * @desc Items document model, can query the Items collection and use CRUD methods
 */
const itemsModel = mongoose.model('Items', itemSchema);

module.exports = itemsModel;

// Each Item Model in the Items Collection is based off of the schema:
// {name, price, details, url, type, username}
