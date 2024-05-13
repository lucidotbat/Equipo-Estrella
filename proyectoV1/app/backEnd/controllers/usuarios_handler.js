const usuariosModel = require("../models/usuarios");

async function getAllUsuarios() {
    try {
        const usuarios = await usuariosModel.find();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


async function registerUsuario({ usuario, password, correo }) {
    try {
        
        const nuevoUusario = new usuariosModel({usuario, password, correo});
        await nuevoUusario.save();
        return nuevoUusario;

    } catch (error) {
        // Manejar errores
        console.error('Error al registrar el usuario :', error);
        throw error;
    }
}

module.exports = { registerUsuario, getAllUsuarios };