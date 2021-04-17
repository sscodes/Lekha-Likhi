const express = require('express');
const signIn = require('../routes/auth');
const users = require('../routes/users');
const blogs = require('../routes/blogs');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    
    app.use('/api/signup', users);
    app.use('/api/signin', signIn);
    app.use('/api/blogs', blogs);

    app.use(error);
}