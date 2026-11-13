const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.URL;

mongoose.connect(URL)
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.error(err);
})

module.exports = mongoose;