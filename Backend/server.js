require('dotenv').config();
const express = require('express');
const cors = require('cors');

//configuracion
const app = express();
const port = 3000;

//middleware


//server
app.listen(port,()=>{
    console.log("server running on poart" + port);
})
