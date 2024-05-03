const express = require('express');
const router = express.Router();

const { getAllIngresos, createIngreso } = require('../controllers/ingresos_handler');
router.get('/api/ingresos', async (req, res) => {
    try 
    {
        const ingresos = await getAllIngresos();
        res.json(ingresos);
    } 
    catch (error) 
    {
        console.error('Error al obtener los ingresos:', error);
        res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
});

router.post('/nuevo-ingreso', async (req, res) => {
    try 
    {
        const { descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago } = req.body;
        
        const ingresoCreado = await createIngreso({ descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago });
        console.log("dentro cons");
        res.status(201).json(ingresoCreado);
    } 
    catch (error) 
    {
        console.error('Error al crear el ingreso:', error);
        res.status(500).json({ error: 'Error al crear el ingreso' });
    }
});

module.exports = router;
