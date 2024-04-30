const express = require('express');
const path = require('path');
const gastosRouter = require('../routes/gastosRoutes');

const router = express.Router();
router.use('/', gastosRouter);

router.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/home', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/gastos', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/gastos.html'))
});
router.get('/consultar', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/consultar.html'))
});

router.get('/ingresos', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/ingresos.html'))
});
router.get('/fin-de-mes', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/fin-de-mes.html'))
});
router.get('/resumen', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/resumen.html'))
});
module.exports = router ;