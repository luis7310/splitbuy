require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//configuracion
const app = express();
const port = process.env.port;

//middleware


//server
app.listen(port,()=>{
    console.log("server running on poart " + port);
})
