const express = require('express');
const router = express.Router();

const { getAllIngresos, createIngreso, actualizarIngreso, eliminarIngreso } = require('../controllers/ingresos_handler');

router.get('/api/ingresos', async (req, res) => {
    try {
        const ingresos = await getAllIngresos();
        res.json(ingresos);
    } 
    catch (error) {
        console.error('Error al obtener los ingresos:', error);
        res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
});

router.post('/api/ingresos', async (req, res) => {
    try {
        const { descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago } = req.body;
        
        const ingresoCreado = await createIngreso({ descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago });
        console.log("dentro cons");
        res.status(201).json(ingresoCreado);
    } 
    catch (error) {
        console.error('Error al crear el ingreso:', error);
        res.status(500).json({ error: 'Error al crear el ingreso' });
    }
});

router.put('/api/ingresos/:id', async (req, res) => {
    try {
        const ingresoId = req.params.id;
        const ingresoActualizado = req.body;
        const resultado = await actualizarIngreso(ingresoId, ingresoActualizado);
        res.json(resultado);
    } catch (error) {
        console.error('Error al actualizar el ingreso:', error);
        res.status(500).json({ error: 'Error al actualizar el ingreso' });
    }
});

router.delete('/api/ingresos/:id', async (req, res) => {
    try {
        const ingresoId = req.params.id;
        await eliminarIngreso(ingresoId);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar el ingreso:', error);
        res.status(500).json({ error: 'Error al eliminar el ingreso' });
    }
});

module.exports = router;
