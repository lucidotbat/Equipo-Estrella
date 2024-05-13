const express = require('express');
const cors = require('cors');
const router = require('./app/backEnd/controllers/router');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));

let mongoConnection = "mongodb+srv://admin:kalikali@myapp.zjzkunw.mongodb.net/MyAppDB";
let db = mongoose.connection;
db.on('connecting', () => {
    console.log('conectando...');
    console.log(mongoose.connection.readyState);
});

db.on('connected', () => {
    console.log('conectao');
    console.log(mongoose.connection.readyState);
});
mongoose.connect(mongoConnection, {useNewUrlParser: true});

app.use(router);

app.use((req, res, next) => {
    res.sendStatus(404);
}); 
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

// app.post('/login', (req, res) => {
//     // Aquí recibirías el nombre de usuario y la contraseña desde el cuerpo de la solicitud
//     const { username, password } = req.body;

//     // Aquí verificarías las credenciales (simulado por propósitos de ejemplo)
//     if (username === 'pao' && password === '123') {
//         // Si las credenciales son válidas, crea un token JWT
//         const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });

//         // Envía el token de vuelta al cliente
//         res.json({ token });
//     } else {
//         // Si las credenciales no son válidas, responde con un error
//         res.status(401).json({ error: 'Credenciales inválidas' });
//     }
// });

// function verificarToken(req, res, next) {
//     const token = req.headers['authorization'];

//     if (typeof token !== 'undefined') {
//         jwt.verify(token, 'secreto', (err, authData) => {
//             if (err) {
//                 res.sendStatus(403); // Token no válido
//             } else {
//                 req.authData = authData;
//                 next(); // Continuar con la siguiente función del middleware
//             }
//         });
//     } else {
//         res.sendStatus(401); // No se proporcionó token
//     }
// }

// // Ejemplo de cómo proteger una ruta con el middleware de verificación de token
// app.get('/ruta-protegida', verificarToken, (req, res) => {
//     // Si el token es válido, el usuario está autenticado y puedes continuar con la lógica de la ruta
//     res.json({ mensaje: 'Acceso permitido', usuario: req.authData.username });
// });
