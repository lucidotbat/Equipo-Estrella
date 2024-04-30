
const { default: mongoose } = require("mongoose");
const gastosSchema = new mongoose.Schema({
    Empresa: {
        type: String,
        required: true
    },
    Fecha: {
        type: String,
        required: true
    },
    Concepto: {
        type: String,
        required: true
    },
    Cantidad: {
        type: Number,
        required: true
    },
    TipoGasto: {
        type: String,
        required: true,
        enum: ["Comida", "Transporte", "Alojamiento", "Entretenimiento", "Salud", "Servicios"]
    },
    TipoPago: {
        type: String,
        required: true,
        enum: ["Único", "Semanal", "Mensual", "Anual"]
    }

});

const gastoModel = mongoose.model('gastos', gastosSchema);
module.exports = gastoModel;