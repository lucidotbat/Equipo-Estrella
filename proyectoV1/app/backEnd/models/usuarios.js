const { default: mongoose } = require("mongoose");
let usuariosSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
});

const usuariosModel = mongoose.model('usuarios', usuariosSchema);
module.exports = usuariosModel;