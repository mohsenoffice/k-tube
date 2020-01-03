const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new Schema({
    mail: {type: String, unique: true, index: true, required: true},
    password: String,
    isAdmin: String,
    time:Date
})

mongoose.model('users', usersSchema);  