document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById('containerIngresos');
    let xhr = new XMLHttpRequest();

    function loadConsultas(){
        let url = `http://localhost:3000/api/ingresos`;
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function(){
            if(xhr.status == 200){
                let ingresos = JSON.parse(xhr.responseText);
                console.log('ingresos');
                console.table(ingresos);
                let listaIngresos = '';

                for(let i = 0; i < ingresos.length; i++){
                    let ingreso = ingresos[i];
                    console.log('ingreso', ingreso.descripcion);
                    listaIngresos += `
                    <div>
                        <h1>${ingreso.descripcion}</h1>
                        <h1>${ingreso.empresa}</h1>
                        <h1>${ingreso.diaDePago}</h1>
                    </div>
                    `;
                }
                
                div.innerHTML = `<div>${listaIngresos}</div>`;
            }
        }
    }

    loadConsultas();
    console.log("SE SUPONE QUE LOS INGRESOS DEBERIAN MOSTRARSE");
});
