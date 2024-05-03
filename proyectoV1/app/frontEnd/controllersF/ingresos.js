// Function to fetch income data from the server
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

// Function to display income data in the HTML
async function displayIngresos() {
    const ingresos = await fetchIngresos();
    const containerIngresos = document.getElementById('containerIngresos');

    if (ingresos.length === 0) {
        containerIngresos.innerHTML = '<p>No se encontraron ingresos.</p>';
    } else {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Descripción', 'Empresa', 'Ingreso Mensual', 'Fecha de Inicio', 'Día de Pago'];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        ingresos.forEach(ingreso => {
            const row = document.createElement('tr');

            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = ingreso.descripcion;
            row.appendChild(descripcionCell);

            const empresaCell = document.createElement('td');
            empresaCell.textContent = ingreso.empresa;
            row.appendChild(empresaCell);

            const ingresoMensualCell = document.createElement('td');
            ingresoMensualCell.textContent = '$ ' + ingreso.ingresoMensual;
            row.appendChild(ingresoMensualCell);

            const fechaDeInicioCell = document.createElement('td');
            fechaDeInicioCell.textContent = new Date(ingreso.fechaDeInicio).toLocaleDateString();
            row.appendChild(fechaDeInicioCell);

            const diaDePagoCell = document.createElement('td');
            diaDePagoCell.textContent = ingreso.diaDePago;
            row.appendChild(diaDePagoCell);

            const accionesCell = document.createElement('td');

            const editarButton = document.createElement('button');
            editarButton.textContent = 'Editar';
            editarButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
            editarButton.addEventListener('click', () => {
                // Lógica para editar el ingreso
                console.log('Editar ingreso:', ingreso);
            });

            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.classList.add('btn', 'btn-danger', 'btn-sm');
            eliminarButton.addEventListener('click', () => {
                // Lógica para eliminar el ingreso
                console.log('Eliminar ingreso:', ingreso);
            });

            accionesCell.appendChild(editarButton);
            accionesCell.appendChild(eliminarButton);
            row.appendChild(accionesCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        containerIngresos.appendChild(table);
    }
}

const agregarButton = document.querySelector('#modalIngresoFijo .btn-primary');
agregarButton.addEventListener('click', agregarIngreso);

async function agregarIngreso() {
    const descripcion = document.getElementById('descripcionInput').value;
    const empresa = document.getElementById('empresaInput').value;
    const ingresoMensual = document.getElementById('cantidadInput').value;
    const fechaDeInicio = document.getElementById('fechaInput').value;
    const diaDePago = document.getElementById('diaInput').value;

    const nuevoIngreso = {
        descripcion,
        empresa,
        ingresoMensual,
        fechaDeInicio,
        diaDePago
    };

    try {
        const response = await fetch('http://localhost:3000/api/ingresos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoIngreso)
        });

        if (response.ok) {
            // El ingreso se agregó correctamente
            console.log('Ingreso agregado');
            // Actualizar la lista de ingresos en la página
            displayIngresos();
            // Cerrar el modal
            const modal = document.getElementById('modalIngresoFijo');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload(true);
        } else {
            console.error('Error al agregar el ingreso');
        }
    } catch (error) {
        console.error('Error al agregar el ingreso:', error);
    }
}

// Call the function to display income data when the page loads
window.addEventListener('DOMContentLoaded', displayIngresos);