const gastosModel = require("../models/gastos");

async function getAllGastos() {
    try {
        const gastos = await gastosModel.find();
        return gastos;
    } catch (error) {
        console.error('Error al obtener los gastos:', error);
        throw error;
    }
}


async function createGasto({ Empresa, Fecha, Concepto, Cantidad, TipoGasto, TipoPago }) {
    try {
        
        // Crear un nuevo gasto utilizando los datos proporcionados
        const nuevoGasto = new gastosModel({ Empresa, Fecha, Concepto, Cantidad, TipoGasto, TipoPago });
        await nuevoGasto.save();
        return nuevoGasto;
    } catch (error) {
        // Manejar errores
        console.error('Error al crear el gasto:', error);
        throw error;
    }
}

module.exports = { createGasto, getAllGastos };