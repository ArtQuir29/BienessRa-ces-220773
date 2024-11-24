import express from 'express';
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './db/config.js';
import dotenv from 'dotenv';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

dotenv.config({ path: '.env' });

const app = express();

// Configurar Templeate Engine - PUG
app.set('view engine', 'pug');
app.set('views', './views');

// Definir la carpeta pública de recursos estáticos (assets)
app.use(express.static('./public'));

// Conexión a la BD
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión exitosa a la base de datos.');
} catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
}

// Habilitar lectura de datos desde formularios antes de CSRF
app.use(express.urlencoded({ extended: true }));

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF - después de Cookie Parser
app.use(csrf({ cookie: true }));

// Middleware para manejar el token CSRF y enviarlo a las vistas
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Routing
app.use('/', generalRoutes);
app.use('/auth', userRoutes);

// Configuración del servidor
const port = process.env.BACKEND_PORT || 3002;
app.listen(port, () => {
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);
});
