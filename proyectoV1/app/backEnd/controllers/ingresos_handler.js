const ingresosModel = require("../models/ingresos");

async function getAllIngresos() {
    try 
    {
        const ingresos = await ingresosModel.find();
        return ingresos;
    } 
    catch(error) 
    {
        console.error('Error al obtener los ingresos: ', error);
        throw error;
    }
}

async function createIngreso({ descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago }) {
    try 
    {
        const nuevoIngreso = new ingresosModel({ descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago });
        await nuevoIngreso.save();
        return nuevoIngreso;
    } 
    catch (error) 
    {
        console.error('Error al crear el ingreso: ', error);
        throw error;
    }
}

async function actualizarIngreso(ingresoId, ingresoActualizado) {
    try {
        const resultado = await ingresosModel.findByIdAndUpdate(ingresoId, ingresoActualizado, { new: true });
        return resultado;
    } catch (error) {
        console.error('Error al actualizar el ingreso:', error);
        throw error;
    }
}

async function eliminarIngreso(ingresoId) {
    try {
        await ingresosModel.findByIdAndDelete(ingresoId);
    } catch (error) {
        console.error('Error al eliminar el ingreso:', error);
        throw error;
    }
}

module.exports = { getAllIngresos, createIngreso, actualizarIngreso, eliminarIngreso };