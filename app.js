const winston = require('winston');
const express = require('express');
var cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     });
// }

//creating environment variable
const port = process.env.PORT || 7000;

app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }));