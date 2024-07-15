const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/userdb";

const connect_database = async () => {
    await mongoose
    .connect(connectionString)
    .then (() => console.log("Connected to database successfully"))
    .catch ((error) => console.log(error.message))
}

module.exports = connect_database;