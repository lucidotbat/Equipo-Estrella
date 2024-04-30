document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById('containerConsultas');
    let xhr = new XMLHttpRequest();

    function loadConsultas(){
        let url = `http://localhost:3000/api/gastos`;
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function(){
            if(xhr.status == 200){
                let gastos = JSON.parse(xhr.responseText);
                console.log('gastos');
                console.table(gastos);
                let cardsHTML = '';

                for(let i =0; i < gastos.length; i++){
                    let gasto = gastos[i];
                    console.log('gasto', gasto.Empresa);
                    cardsHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-12"> 
                        <div class="card">
                            <h1>${gasto.Fecha}</h1>
                            <figure>
                                <img src="https://i.pinimg.com/564x/a8/30/d5/a830d5ce33d163055920bd028e2f1fa3.jpg"  class="card-img-top img-fluid">
                            </figure>
                            <div class="contenido-card">
                                <h2>${gasto.Empresa}</h2>
                                <p class="precio">${gasto.Cantidad}</p>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#modalDetalles1">Detalles</a>
                            </div>
                        </div>
                    </div>
                    `;
                }
                // Agrega las tarjetas HTML dentro del div con la clase 'row'
                div.innerHTML = `<div class="row">${cardsHTML}</div>`;
            }
        }
    }

    loadConsultas();
});
