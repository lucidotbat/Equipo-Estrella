document.addEventListener('DOMContentLoaded', function() {

    const loginMessageDiv = document.getElementById('loginMessage');
    const contentContainer = document.getElementById('contentContainer');

    // Verificar si sessionStorage está vacío
    if (!sessionStorage.getItem('user')) {
        // Mostrar el mensaje y ocultar el contenido si sessionStorage está vacío
        loginMessageDiv.style.display = 'block';
        contentContainer.style.display = 'none';
    } else {
        // Mostrar el contenido y ocultar el mensaje si sessionStorage tiene algún valor
        loginMessageDiv.style.display = 'none';
        contentContainer.style.display = 'block';
    }
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:3000/consultar';
    
    document.getElementById("formContainer").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const empresa = document.getElementById("empresa").value;
        const fecha = document.getElementById("fecha").value;
        const concepto = document.getElementById("concepto").value;
        const cantidad = document.getElementById("cantidad").value;
        const tipoGasto = document.getElementById("tipoGasto").value;
       
        let tipoPagoValue;
        const tipoPagos = document.getElementsByName("gender");
        for (const tipoPago of tipoPagos) {
            if (tipoPago.checked) {
                tipoPagoValue = tipoPago.id;
                break;
            }
        }

        console.log("Empresa:", empresa);
        console.log("Fecha:", fecha);
        console.log("Concepto:", concepto);
        console.log("Cantidad:", cantidad);
        console.log("Tipo de Gasto:", tipoGasto);
        console.log("Tipo de Pago:", tipoPagoValue);

        const data = JSON.stringify({
            User: sessionStorage.getItem('user'),
            Empresa: empresa,
            Fecha: fecha,
            Concepto: concepto,
            Cantidad: cantidad,
            TipoGasto: tipoGasto,
            TipoPago: tipoPagoValue
        });

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Request successful');
                const response = JSON.parse(xhr.responseText);
                console.log('Response:', response);
                alert('Consulta realizada con éxito'); // Alerta al completar la consulta con éxito
            } else {
                console.error('Request failed:', xhr.status);
            }
        };

        xhr.onerror = function() {
            console.error('Request error');
        };

        xhr.send(data);
    });
});
