const express = require('express');
const path = require('path');
const gastosRouter = require('../routes/gastosRoutes');

const router = express.Router();
router.use('/', gastosRouter);

router.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/home.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/home.html'))
});

router.get('/gastos.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/gastos.html'))
});
router.get('/consultar.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/consultar.html'))
});

router.get('/ingresos.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/ingresos.html'))
});
router.get('/fin-de-mes.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/fin-de-mes.html'))
});
router.get('/resumen.html', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../frontEnd/views/resumen.html'))
});
module.exports = router ;