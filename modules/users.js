const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new Schema({
    mail: {type: String, unique: true, index: true, required: true},
    password: String,
    isAdmin: {type: Boolean, default: false }
})

mongoose.model('users', usersSchema);  