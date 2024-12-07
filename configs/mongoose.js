const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DB_PATH);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to DB"));

db.once('open',function(){
    console.log(`Connection to MongoDB successfull.`)
})

module.exports = db;
