const mongoose = require('mongoose');

const connectDB= ()=>{
    console.log("cannected");
return mongoose.connect('mongodb://127.0.0.1:27017/Webservices');
}

module.exports = connectDB;