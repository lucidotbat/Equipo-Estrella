const { default: mongoose } = require("mongoose");
const ingresoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    empresa: {
        type: String,
        required: true
    },
    ingresoMensual: {
        type: String,
        required: true
    },
    fechaDeInicio: {
        type: Date,
        required: true
    },
    diaDePago: {
        type: Number,
        required: true
    }
});

const ingresoModel = mongoose.model('ingreso', ingresoSchema);
module.exports = ingresoModel;