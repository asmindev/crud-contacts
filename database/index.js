// import  mongoose from 'mongoose'
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();
const URI = process.env.MONGODB_URI
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(URI,connectionParams)
