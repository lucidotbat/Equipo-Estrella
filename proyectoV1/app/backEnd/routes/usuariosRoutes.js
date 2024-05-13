const express = require('express');
const router = express.Router();

const { getAllUsuarios, registerUsuario } = require('../controllers/usuarios_handler');
router.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener los users:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});



router.post('/registrar', async (req, res) => {
    try {
        const { usuario, password, correo } = req.body;
        
        const usuarioCreado = await registerUsuario({ usuario, password, correo });
        console.log("dentro cons");
        res.status(201).json(usuarioCreado);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

module.exports = router;
