const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema ({
    Name : {type: String, required: true, unique: true},
    Price: {type: Number, required: true},
    Details: {type: String}
})

module.exports = mongoose.model('Items', itemSchema)