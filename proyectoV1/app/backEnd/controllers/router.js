const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const gastosRouter = require('../routes/gastosRoutes');
const ingresosRouter = require('../routes/ingresosRoutes');
const usuariosRouter = require('../routes/usuariosRoutes');

const router = express.Router();
router.use('/', gastosRouter);
router.use('/', ingresosRouter);
router.use('/', usuariosRouter);

router.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/home', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/gastos', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/gastos.html'))
});
router.get('/consultar', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/consultar.html'))
});

router.get('/ingresos', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/ingresos.html'))
});
router.get('/fin-de-mes', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/fin-de-mes.html'))
});
router.get('/resumen', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/resumen.html'))
});


router.post('/login', (req, res) => {
    // Aquí recibirías el nombre de usuario y la contraseña desde el cuerpo de la solicitud
    const { username, password } = req.body;
    console.log("here");

    // Aquí verificarías las credenciales (simulado por propósitos de ejemplo)
    if (username == 'pao' && password === '123') {
        // Si las credenciales son válidas, crea un token JWT
        const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });

        // Envía el token de vuelta al cliente
        res.json({ token });
    } else {
        // Si las credenciales no son válidas, responde con un error
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (typeof token !== 'undefined') {
        jwt.verify(token, 'secreto', (err, authData) => {
            if (err) {
                res.sendStatus(403); // Token no válido
            } else {
                req.authData = authData;
                next(); // Continuar con la siguiente función del middleware
            }
        });
    } else {
        res.sendStatus(401); // No se proporcionó token
    }
}

// Ejemplo de cómo proteger una ruta con el middleware de verificación de token
router.get('/ruta-protegida', verificarToken, (req, res) => {
    // Si el token es válido, el usuario está autenticado y puedes continuar con la lógica de la ruta
    res.json({ mensaje: 'Acceso permitido', usuario: req.authData.username });
});

module.exports = router ;