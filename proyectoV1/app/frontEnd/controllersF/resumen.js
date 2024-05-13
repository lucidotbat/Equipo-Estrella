//import Chart from 'chart.js/auto'

let table=document.getElementById("tabla");
let principal=document.getElementById("estilo");
let salto=5;
let prods;
let empresas=[];
let cantidad=[];
let tipodegasto=[];

let set=[];
let valoresset=[];
let estilo=1;
let tabla1, tabla2, tabla3, tabla4

inicio();
function inicio(){
    estilo=sessionStorage.getItem("estilo");
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
            cambiarestilo();
            //tabla 1, cantidad gastada por tienda
            tabla1=new Chart("myChart1",{
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


            tabla2= new Chart("veces tienda", {
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

            tabla3=new Chart("gasto en fechas", {
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

            tabla4=new Chart("gasto en tipos", {
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
}
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

function cambiarestilo(){
    if (estilo ==0){
        principal.innerHTML=`<h1 style="padding-left: 5cap;">Gastos por tiendas</h1>
        <div id="graficas generales">
            <div id="demo" class="carousel slide" data-bs-ride="carousel">
    
                <!-- Indicators/dots -->
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>
                <!-- The slideshow/carousel -->
                <div class="carousel-inner" style="height: 50cap; padding-left: 20cap;">
                    <div class="carousel-item active" style="height: 50cap;">
                        <canvas id="myChart1" style="width:150%;max-width:800px;"></canvas>
                        <button style="border-color: white;" onclick="info('Esta tabla muestra el dinero gastado en cada empresa')"><img style="height: 2cap; " src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
                    </div>
                    <div class="carousel-item" >
                        <canvas id="veces tienda" style="width:150%;max-width:800px;"></canvas>
                        <button style="border-color: white;" onclick="info('Esta tabla muestra la cantidad de veces en las que se ha comprado en cada tienda')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
                    </div>  
                </div>
    
                <!-- Left and right controls/icons -->
                <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
        <h1 style="padding-left: 5cap;">Gastos generales</h1>
        <div id="graficas tiendas">
            <canvas id="graph"></canvas>
            <div id="demo1" class="carousel slide" data-bs-ride="carousel">
                <!-- Indicators/dots -->
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#demo1" data-bs-slide-to="0" class="active"></button>
                  <button type="button" data-bs-target="#demo1" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#demo1" data-bs-slide-to="2"></button>
                </div>
                <!-- The slideshow/carousel -->
                <div class="carousel-inner" style="height: 50cap; ; padding-left: 20cap;">
                    <div class="carousel-item active" style="height: 50cap;">
                        
                        <canvas id="gasto en fechas" style="width:150%;max-width:800px;"></canvas>
                        <button style="border-color: white;" onclick="info('cantidad de dinero gastado por mes')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
                    </div>
                    <div class="carousel-item" >
                        <canvas id="gasto en tipos" style="width:150%;max-width:800px;"></canvas>
                        <button style="border-color: white;" onclick="info('cantidad de dinero gastado en los tipos de gasto')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
                    </div>
                </div>
        
                <!-- Left and right controls/icons -->
                <button class="carousel-control-prev" type="button" data-bs-target="#demo1" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo1" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>`;

    }else{
        principal.innerHTML=`    <div class="container">
        <div class="row">
            <h1 style="padding-left: 5cap;">Gastos por tiendas</h1>
            <div class="col-4">
                <canvas id="myChart1" style="width:150%;max-width:1000px;"></canvas>
                <button style="border-color: white;" onclick="info('Esta tabla muestra el dinero gastado en cada empresa')"><img style="height: 2cap; " src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
            
            </div>
            <div class="col-4">
                <canvas id="veces tienda" style="width:150%;max-width:1000px;"></canvas>
                <button style="border-color: white;" onclick="info('Esta tabla muestra la cantidad de veces en las que se ha comprado en cada tienda')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>

            </div>
            
        </div>
        <div class="row">
            <h1 style="padding-left: 5cap;">Gastos generales</h1>
            <div class="col-4">
                <canvas id="gasto en fechas" style="width:150%;max-width:1000px;"></canvas>
                <button style="border-color: white;" onclick="info('cantidad de dinero gastado por mes')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
            
            </div>
            <div class="col-4">
                <canvas id="gasto en tipos" style="width:150%;max-width:1000px;"></canvas>
                <button style="border-color: white;" onclick="info('cantidad de dinero gastado en los tipos de gasto')"><img style="height: 2cap;" src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"></button>
            
            </div>
            
        </div>
        
        
        </div>`;
    }
}

function cambiodeestilo(estyle ){
    sessionStorage.setItem("estilo", estyle);  
    window.location.reload();
}
