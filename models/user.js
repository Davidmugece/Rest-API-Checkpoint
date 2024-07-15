const mongoose = require('mongoose');

// Connect to MongoDB
const UserSchema = new mongoose.Schema({
name: String,
email: String,
phone_number: String
});

module.exports = mongoose.model("User", UserSchema)