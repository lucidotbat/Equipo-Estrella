const express = require('express');
const router = express.Router();

const { getAllGastos, createGasto } = require('../controllers/gastos_handler');
router.get('/api/gastos', async (req, res) => {
    try {
        const gastos = await getAllGastos();
        res.json(gastos);
    } catch (error) {
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ error: 'Error al obtener los gastos' });
    }
});



router.post('/consultar', async (req, res) => {
    try {
        const { User, Empresa, Fecha, Concepto, Cantidad, TipoGasto, TipoPago } = req.body;
        
        const gastoCreado = await createGasto({ User, Empresa, Fecha, Concepto, Cantidad, TipoGasto, TipoPago });
        console.log("dentro cons");
        res.status(201).json(gastoCreado);
    } catch (error) {
        console.error('Error al crear el gasto:', error);
        res.status(500).json({ error: 'Error al crear el gasto' });
    }
});

module.exports = router;
