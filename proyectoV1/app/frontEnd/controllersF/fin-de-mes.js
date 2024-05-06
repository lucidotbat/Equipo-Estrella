async function fetchIngresos() {
    try {
        const response = await fetch('http://localhost:3000/api/ingresos');
        const ingresos = await response.json();
        return ingresos;
    } catch (error) {
        console.error('Error fetching ingresos:', error);
        return [];
    }
}

async function fetchGastos() {
    try {
        const response = await fetch('http://localhost:3000/api/gastos');
        const gastos = await response.json();
        return gastos;
    } catch (error) {
        console.error('Error fetching gastos:', error);
        return [];
    }
}

async function sumarIngresos() {
    const ingresos = await fetchIngresos();
    const containerIngresos = document.getElementById('sumaIngreos');

    if (ingresos.length != 0) 
    {
        ingresos.forEach(ingreso => {
            sumaIngresos += parseFloat(ingreso.ingresoMensual);
        });
    }
    console.log("SUMA DE INGRESOS MENSUALES: " + sumaIngresos);
}

async function sumarGastosMesActual() {
    const gastos = await fetchGastos();
    let sumaGastos = 0;

    if (gastos.length != 0) {
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1;
        const anioActual = fechaActual.getFullYear();

        gastos.forEach(gasto => {
            const fechaGasto = new Date(gasto.Fecha);
            const mesGasto = fechaGasto.getMonth() + 1;
            const anioGasto = fechaGasto.getFullYear();

            if (mesGasto === mesActual && anioGasto === anioActual) {
                sumaGastos += parseFloat(gasto.Cantidad);
            }
        });
    }
    console.log("SUMA DE GASTOS DEL MES ACTUAL: " + sumaGastos);
}

function obtenerMesActual() {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    return meses[mesActual];
}

function imprimirMesActualEnHTML() {
    const mesActual = obtenerMesActual();
    const mesActualElement = document.getElementById('mes-actual');
    mesActualElement.textContent = mesActual;
}

let res = 0;
function imprimirImagen(){
    let img = new Image();
    if(res < 0)
        img.src = "https://i.postimg.cc/zGBqvF0j/mrMalo.gif";
    else
        img.src = "https://i.postimg.cc/xTsSwbnb/mrBueno.jpg";
    
    let contenedor = document.getElementById("contenedor");
    contenedor.appendChild(img);
}

async function calcularResultado() {
    const ingresos = await fetchIngresos();
    const gastos = await fetchGastos();

    let sumaIngresos = 0;
    let sumaGastos = 0;

    if (ingresos.length != 0) {
        ingresos.forEach(ingreso => {
            sumaIngresos += parseFloat(ingreso.ingresoMensual);
        });
    }

    if (gastos.length != 0) {
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1;
        const anioActual = fechaActual.getFullYear();

        gastos.forEach(gasto => {
            const fechaGasto = new Date(gasto.Fecha);
            const mesGasto = fechaGasto.getMonth() + 1;
            const anioGasto = fechaGasto.getFullYear();

            if (mesGasto === mesActual && anioGasto === anioActual) {
                sumaGastos += parseFloat(gasto.Cantidad);
            }
        });
    }

    const resultado = sumaIngresos - sumaGastos;

    document.getElementById('sumaIngresos').textContent = sumaIngresos.toFixed(2);
    document.getElementById('sumaGastos').textContent = sumaGastos.toFixed(2);
    document.getElementById('diferencia').textContent = resultado;
    document.getElementById('resultado').textContent = resultado >= 0 ? 'Números verdes' : 'Números rojos';

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = resultado >= 0 ? 'Números verdes' : 'Números rojos';

    // Cambiar el color del texto según el resultado
    resultadoElement.style.color = resultado >= 0 ? 'green' : 'red';

    res = resultado;
    imprimirImagen();
}

window.addEventListener('DOMContentLoaded', () => {
    calcularResultado();
    imprimirMesActualEnHTML();
});


/* console.log("SI SE ESTA EJECUTANDO EL FIN DE MES.JS");
fetch('http://localhost:3000/api/fin-de-mes')
.then(response => response.json())
.then(data => {
    document.getElementById('totalGastos').textContent = data.totalGastos;
    document.getElementById('totalIngresos').textContent = data.totalIngresos;
    document.getElementById('resultado').textContent = data.resultado >= 0 ? 'Números verdes' : 'Números rojos';
})
.catch(error => {
    console.error('Error al obtener los datos de fin de mes:', error);
}); */