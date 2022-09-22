const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: String,
    password: String,
    reviews:[{
        UserRating: Number,
        Description: String,
        Date: Date,
        Image:     {
            data: Buffer,
            contentType: String
        },
    }]
})

module.exports = mongoose.model('User', user);
