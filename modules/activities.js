const mongoose = require('mongoose');
const {Schema} = mongoose;

const activitiesSchema = new Schema({
    user: {type: String, unique: true, index: true, required: true},
    searches: [String],
    watched: Array,
    duration:{trype: Number, default:0}
})

mongoose.model('activities', activitiesSchema);  