const winston = require('winston');

function error(err, req, res, next) 
{
    winston.error(err.message, {metadata: err});

    res.status(500).send('Something Happened...');  
}

module.exports = error;