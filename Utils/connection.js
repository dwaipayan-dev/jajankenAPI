require('dotenv').config();

const mongoose = require('mongoose');

const connectURI = process.env.CONN_URI || 'mongodb://localhost:27017/jajankenDB';

const connectDb = ()=>{
    mongoose.connect(connectURI);
};

module.exports = connectDb;