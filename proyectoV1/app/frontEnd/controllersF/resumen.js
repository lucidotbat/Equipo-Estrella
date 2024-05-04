//import Chart from 'chart.js/auto'

let table=document.getElementById("tabla");
let salto=5;
let prods;
let empresas=[];
let cantidad=[];
let tipodegasto=[];

let set=[];
let valoresset=[];


let xhr = new XMLHttpRequest();
let url = 'http://localhost:3000/api/gastos';
xhr.open('GET', url);
xhr.send();
xhr.onload=function(){
    if (xhr.status!=200){
        alert(xhr.status+':'+ xhr.statusText)
    }else{
        prods=JSON.parse(xhr.response);

        for (let x of prods){
            empresas.push(x.Empresa);
            cantidad.push(parseInt(x.Cantidad));
            tipodegasto.push(x.TipoGasto);
        }
        
        //tabla 1, cantidad gastada por tienda
        new Chart("myChart1", {
            type: 'bar',
            data: {
            labels: empresas,
            datasets: [{
                label: 'cantidad gastada por tienda',
                data: cantidad,
                borderWidth: 1, 
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']

            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });

//tabla 2,     tiendas en las que mas se compra
        valores= new Set(empresas);
        for (let i of valores){
            set.push(i);
            valoresset.push(0);
        }
        for (let i =0; i< set.length; i++){
            for(let j=0; j<empresas.length;j++){
                if (empresas[j]==set[i]){
                    valoresset[i]++;
                }
            }
        }


        new Chart("veces tienda", {
            type: 'doughnut',
            data: {
            labels: set,
            datasets: [{
                label: 'cantidad de compras por tienda',
                data: valoresset,
                borderWidth: 1,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
// tabla 3,          tabla de dia en la que se compro mas
        let fechas=[];
        for (let x of prods){
            fechas.push(x.Fecha[5]+x.Fecha[6]);
        }
        let setfechas=[];
        let gastoxfechas=[];    
        console.log(prods[0].Fecha);
        valores= new Set(fechas);
        for (let i of valores){
            setfechas.push(i);
            gastoxfechas.push(0);
        }
        for (let i =0; i< setfechas.length; i++){
            for(let j=0; j<prods.length;j++){
                if (prods[j].Fecha[5]+prods[j].Fecha[6]==setfechas[i]){
                    gastoxfechas[i]+=prods[j].Cantidad;
                }
            }
        }

        new Chart("gasto en fechas", {
            type: 'line',
            data: {
            labels: setfechas,
            datasets: [{
                label: 'gasto por mes',
                data: gastoxfechas,
                borderWidth: 1,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });



        //grafica 4,            tipos de gastos
        let tipos=[];
        for (let x of prods){
            tipos.push(x.TipoGasto);
        }
        let settipos=[];
        let gastoxtipos=[];    
        tipos= new Set(tipos);
        for (let i of tipos){
            settipos.push(i);
            gastoxtipos.push(0);
        }
        for (let i =0; i< settipos.length; i++){
            for(let j=0; j<prods.length;j++){
                if (prods[j].TipoGasto==settipos[i]){
                    gastoxtipos[i]+=prods[j].Cantidad;
                }
            }
        }

        console.log(settipos);
        console.log(gastoxtipos);

        new Chart("gasto en tipos", {
            type: 'polarArea',
            data: {
            labels: settipos,
            datasets: [{
                label: 'tipos de gastos',
                data: gastoxtipos,
                borderWidth: 1,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });

        //tabla ordenada por fechas
        
        prods.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.Fecha) - new Date(a.Fecha);
        });
        
        mostrartabla();
        
    }
};

function cambio(ab){
    if (ab>0){
        if(salto+5<=prods.length)
        salto+=5;
    }else{
        if(salto>5)
        salto-=5; 
    }
    mostrartabla();
}
function mostrartabla(){
    table.innerHTML = ``;
    for(let i =0;i<salto; i++){
        
        table.innerHTML += `
        
        <div class="row"">
            <div class="col-3">
                ${prods[i].Empresa}
            </div>
            <div class="col-3">
                ${prods[i].Concepto}
            </div>
            <div class="col-3">
                ${prods[i].Fecha}
            </div>
            <div class="col-3">
                ${prods[i].Cantidad}
            </div>
        </div>

        
        `;
    }
}

function info(mensaje){
    alert(mensaje);
}
