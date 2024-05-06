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
            editarButton.style = 'background-color:rgb(38, 51, 54);border-color:rgb(100, 120, 54)'
            editarButton.textContent = 'Editar';
            editarButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
            editarButton.addEventListener('click', () => {
                cargarDatosEditarIngreso(ingreso);
                const modal = document.getElementById('modalEditarIngreso');
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
                const editarIngresoBtn = document.getElementById('editarIngresoBtn');
                editarIngresoBtn.addEventListener('click', () => editarIngreso(ingreso._id));
                console.log('Abriendo modal de edición');
            });

            const eliminarButton = document.createElement('button');
            eliminarButton.style = 'background-color:darkred;'
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.classList.add('btn', 'btn-danger', 'btn-sm');
            eliminarButton.addEventListener('click', () => {
                establecerIngresoEliminar(ingreso._id);
                const modal = document.getElementById('modalEliminarIngreso');
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            });

            accionesCell.appendChild(editarButton);
            accionesCell.appendChild(eliminarButton);
            row.appendChild(accionesCell);

            tbody.appendChild(row);
        });

        document.getElementById('editarIngresoBtn').addEventListener('click', editarIngreso);

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

        if(response.ok) {
            // El ingreso se agregó correctamente
            console.log('Ingreso agregado');
            // Actualizar la lista de ingresos en la página
            displayIngresos();
            // Cerrar el modal
            const modal = document.getElementById('modalIngresoFijo');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload(true);
        } 
        else
            console.error('Error al agregar el ingreso');
    } 
    catch(error) {
        console.error('Error al agregar el ingreso:', error);
    }
}

// Función para manejar la edición de un ingreso
async function editarIngreso(ingresoId) {
    const descripcion = document.getElementById('editarDescripcion').value;
    const empresa = document.getElementById('editarEmpresa').value;
    const ingresoMensual = document.getElementById('editarCantidad').value;
    const fechaDeInicio = document.getElementById('editarFecha').value;
    const diaDePago = document.getElementById('editarDia').value;

    const ingresoActualizado = {
        descripcion,
        empresa,
        ingresoMensual,
        fechaDeInicio,
        diaDePago
    };

    try {
        const response = await fetch(`http://localhost:3000/api/ingresos/${ingresoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingresoActualizado)
        });

        if(response.ok) {
            console.log('Ingreso actualizado');
            displayIngresos();
            
            const modal = document.getElementById('modalEditarIngreso');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload(true);
        } 
        else 
            console.error('Error al actualizar el ingreso');
    } 
    catch (error) {
        console.error('Error al actualizar el ingreso:', error);
    }
}

async function eliminarIngreso() {
    const ingresoId = document.getElementById('eliminarIngresoId').value;

    try 
    {
        const response = await fetch(`http://localhost:3000/api/ingresos/${ingresoId}`, {
            method: 'DELETE'
        });

        if (response.ok) 
        {
            console.log('Ingreso eliminado');
            displayIngresos();
            
            const modal = document.getElementById('modalEliminarIngreso');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload(true);
        } else
            console.error('Error al eliminar el ingreso');
    } 
    catch(error) {
        console.error('Error al eliminar el ingreso:', error);
    }
}

document.getElementById('editarIngresoBtn').addEventListener('click', editarIngreso);

function cargarDatosEditarIngreso(ingreso) {
    document.getElementById('editarDescripcion').value = ingreso.descripcion;
    document.getElementById('editarEmpresa').value = ingreso.empresa;
    document.getElementById('editarCantidad').value = ingreso.ingresoMensual;
    document.getElementById('editarFecha').value = ingreso.fechaDeInicio;
    document.getElementById('editarDia').value = ingreso.diaDePago;
}

function establecerIngresoEliminar(ingresoId) {
    document.getElementById('eliminarIngresoId').value = ingresoId;
}

window.addEventListener('DOMContentLoaded', displayIngresos);
document.getElementById('eliminarIngresoId').addEventListener('click', eliminarIngreso);