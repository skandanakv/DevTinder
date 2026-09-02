const mongoose = require('mongoose');

const connectDb = async function (){
await mongoose.connect
('mongodb+srv://skandanakv:uKCwv5pOZXs5WsGR@cluster0.lkqsupr.mongodb.net/DevTinder');
}

module.exports = connectDb;