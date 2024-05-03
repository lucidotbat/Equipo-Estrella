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

module.exports = { getAllIngresos, createIngreso };