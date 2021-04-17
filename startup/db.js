const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    //the package mongoose returns a Promise
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.4iaih.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true,  useCreateIndex: true })
    .then(() => winston.info('Connected to MongoDB...'));
}

