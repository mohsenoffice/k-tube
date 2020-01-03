const mongoose = require('mongoose');
const {Schema} = mongoose;

const searchSchema = new Schema({
    term: String,
    user: String,
    time:Date
})

mongoose.model('searches', searchSchema);  