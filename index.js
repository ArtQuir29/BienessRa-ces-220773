const router = express.Router();
import express from 'express';
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import db from './DB/config.js'
import dotenv from 'dotenv'
//const express = require(`express`); // Importar la libreria para crear un servidor web- CommonJS


// Instanciar nuestra aplicación web
const app = express() 

dotenv.config({path: '.env'})
//const express = require(`express`); // Importar la libreria para crear un servidor web- CommonJS


//Conexión a la base de datos
try {
    await db.authenticate(); //Verifico las credenciales del usuario
    db.sync(); // Sincroniza las tablas 
    console.log("Conexión establecida");

}catch (error) {
    console.log(error)
}

//Habilitando la lectura de datos del formulario
app.use(express.urlencoded({ encoded: true }));

//Habilitar PUG
app.set('view engine','pug');
app.set('views','./views')

//Definir la carpeta úbicada de recursos estáticos(assets)
app.use(express.static('./public'));

// Configuramos nuestro servidor web 
const port = 3000;
app.listen(port, ()=>{
   console.log(`La aplicación ha iniciado en el puerto: ${port}`);
})

//Carpeta Publica 
app.use(express.static('public'))

//Routing - Enrutamiento.
app.use('/',generalRoutes);
app.use('/auth',userRoutes);

// Probamos las rutas para poder presentar mensajes al usuario a través del navegador
app.get("/",function(req,res){
    res.send("Hola Mundo desde node, a traves del navegador")
})
app.use('/',generalRoutes)
app.use('/auth',userRoutes)

export default router;

//

