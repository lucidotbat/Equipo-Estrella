document.addEventListener("DOMContentLoaded", function() {
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
                tipoPagoValue = tipoPago.value;
                break;
            }
        }

        console.log("Empresa:", empresa);
        console.log("Fecha:", fecha);
        console.log("Concepto:", concepto);
        console.log("Cantidad:", cantidad);
        console.log("Tipo de Gasto:", tipoGasto);
        console.log("Tipo de Pago:", tipoPagoValue);
    });
});
