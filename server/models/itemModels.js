const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema ({
    name : {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    details: {type: String}
})

module.exports = mongoose.model('Items', itemSchema)