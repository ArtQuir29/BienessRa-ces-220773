
import express from 'express';

// const express = require ()
const app = express();
// Routing 
app.get('/', function(req,res){
    res.send('Hola mundo desde Express')
});


// configuramos nuestro servidor web

const port = 3000;
app.listen(port , ()=> {
    console.log(`La aplicacion ha iniciado en el puerto : ${port}`);
});

