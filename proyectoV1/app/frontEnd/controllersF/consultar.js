let ordenar = 0;
// 0 es no ordenado
// 1 es de antiguo a reciente
// 2 es de reciente a antiguo

let listFilter1 = []; 
let gastooos = [];
let gastos = [];
function showLoadingAnimation() {
    const loadingAnimationContainer = document.getElementById('loading-animation');
    lottie.loadAnimation({
        container: loadingAnimationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/b2152149-0842-425d-87dc-37d85dde24fe/3ZnkxqLM6V.json'
    });
}

// Función para ocultar la animación de carga
function hideLoadingAnimation() {
    const loadingAnimationContainer = document.getElementById('loading-animation');
    loadingAnimationContainer.style.display = 'none';
}

// Mostrar la animación de carga antes de cargar los ingresos
showLoadingAnimation();


document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById('containerConsultas');

    // Función para cargar los gastos
    function loadConsultas() {
        let url = `http://localhost:3000/api/gastos`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        console.log("here");
        xhr.onload = function() {
            if (xhr.status == 200) {
                gastos = JSON.parse(xhr.responseText);
                gastooos = [];
                for(let i =0; i < gastos.length; i++){
                    
                    if (gastos[i].User == sessionStorage.getItem('user')){
                        gastooos.push(gastos[i]);
                    }

                }
                console.log(gastooos);
                // Ordenar los gastos por fecha si es necesario
                if (ordenar == 1) {
                    gastooos.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));
                } else if (ordenar == 2) {
                    gastooos.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
                }

                // Filtrar los gastos si es necesario
              

                renderizarGastos(gastooos);
                renderizarModales(); 
            }
        }
        return new Promise(resolve => {
            setTimeout(() => {
                hideLoadingAnimation();
                resolve();
            }, 1000); // Retraso de 1 segundo antes de ocultar la animación
        });
    }

    // Función para renderizar los gastos en la interfaz
    function renderizarGastos(gastooos) {
        let cardsHTML = '';
        for (let i = 0; i < gastooos.length; i++) {
            let gasto = gastooos[i];
            let urlGasto;
            switch (gasto.TipoGasto) {
                case "Entretenimiento":
                    urlGasto = "https://i.pinimg.com/564x/a8/30/d5/a830d5ce33d163055920bd028e2f1fa3.jpg";
                    break;
                case "Comida":
                    urlGasto = "https://i.pinimg.com/564x/55/f8/af/55f8afd0d4c2224653f1ba467b6543e8.jpg";
                    break;
                case "Transporte":
                    urlGasto = "https://i.pinimg.com/736x/20/28/80/2028800f19993322c590eb3282532190.jpg";
                    break;
                case "Alojamineto":
                    urlGasto = "https://i.pinimg.com/564x/ea/64/30/ea64303d6ac1294ae6b0f64f63e733ba.jpg";
                    break;
                case "Salud":
                    urlGasto = "https://i.pinimg.com/564x/40/01/26/400126dcd18285f95fbf844fc07c381b.jpg";
                    break;
                default:
                    urlGasto = "https://i.pinimg.com/564x/11/73/e3/1173e32890c0f9fab846b7218c7f3aa9.jpg";
            }

            const modalId = `modalDetalles${i + 1}`;
            const modalHTML = `
                <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="${modalId}Label">Detalles del Gasto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h2>${gasto.Empresa}</h2>
                                <p>Fecha: ${gasto.Fecha}</p>
                                <p>Concepto: ${gasto.Concepto}</p>
                                <p>Cantidad: ${gasto.Cantidad}</p>
                                <p>Tipo de Gasto: ${gasto.TipoGasto}</p>
                                <p>Tipo de Pago: ${gasto.TipoPago}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            cardsHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12"> 
                <div class="card">
                    <h1 class="text-center" >${gasto.Fecha}</h1>
                    <figure>
                        <img src=${urlGasto} class="card-img-top img-fluid">
                    </figure>
                    <div class="contenido-card">
                        <h2>${gasto.Empresa}</h2>
                        <p class="precio">${gasto.Cantidad}</p>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#${modalId}">Detalles</a>
                    </div>
                </div>
            </div>
            `;
        }
        div.innerHTML = `<div class="row">${cardsHTML}</div>`;
       
    }

    function renderizarModales() {
        // Eliminar todos los modales existentes
        const existingModals = document.querySelectorAll('.modal');
        existingModals.forEach(modal => modal.remove());
    
        // Crear y renderizar nuevos modales
        for (let i = 0; i < gastooos.length; i++) {
            const gasto = gastooos[i];
            const modalId = `modalDetalles${i + 1}`;
            const modalHTML = `
                <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="${modalId}Label">Detalles del Gasto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h2>${gasto.Empresa}</h2>
                                <p>Fecha: ${gasto.Fecha}</p>
                                <p>Concepto: ${gasto.Concepto}</p>
                                <p>Cantidad: ${gasto.Cantidad}</p>
                                <p>Tipo de Gasto: ${gasto.TipoGasto}</p>
                                <p>Tipo de Pago: ${gasto.TipoPago}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    // Establecer event listeners para los botones de ordenar
    const btnAntiguo = document.getElementById('ordenarAntiguo');
    btnAntiguo.addEventListener('click', function() {
        ordenar = 1;
        console.log("ordenar antiguo");
        loadConsultas(); // Volver a cargar los gastos después de cambiar el criterio de ordenamiento
    });

    const btnReciente = document.getElementById('ordenarReciente');
    btnReciente.addEventListener('click', function() {
        ordenar = 2;
        console.log("ordenar reciente");
        loadConsultas(); // Volver a cargar los gastos después de cambiar el criterio de ordenamiento
    });
    const btnSearch = document.getElementById('search');
btnSearch.addEventListener('click', function(event) {
    event.preventDefault();
    listFilter1 = []; // Limpiar el array de resultados filtrados antes de comenzar la búsqueda
    const toFilter = document.getElementById("inputFilter").value.toLowerCase();

    if (toFilter !== '') { // Verificar si toFilter no está vacío
        for (let i = 0; i < gastooos.length; i++) {
            const empresa = gastooos[i].Empresa.toLowerCase();
            if (empresa.includes(toFilter)) {
                listFilter1.push(gastooos[i]);
            }
        }
    }


    renderizarGastos(listFilter1);
});


    loadConsultas();
});

