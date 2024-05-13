
class Gasto{
    constructor(empresa, fecha, concepto, cantidad, tipoGasto, tipoPago){
        this.empresa = empresa;
        this.fecha = fecha;
        this.concepto = concepto;
        this.cantidad = cantidad;
        this.tipoGasto = tipoGasto;
        this.tipoPago = tipoPago;
    }

    set empresa(x){
        if(x == null || typeof(x) != 'string'){
            throw new ProductException("Debes ingresar una empresa válida"); 
        }else{
            this.empresa = x;
        }
    }
    get empresa(){
        return this.empresa;
    }

    set fecha(x){
        if(isNaN(Date.parse(x))){
            throw new ProductException("Debes ingresar una fecha válida"); 
        }
        else{
            this.fecha = x;
        }
    }
    get fecha(){
        return this.fecha;
    }

    set concepto(x){
        if(x == null || typeof(x) != 'string'){
            throw new ProductException("Debes ingresar un concepto válida"); 
        }else{
            this.concepto = x;
        }
    }
    get concepto(){
        return this.concepto;
    }

    set cantidad(x){
        if(x == null || typeof(x) != 'number'){
            throw new ProductException("Debes ingresar una cantidad válida"); 
        }else{
            this.cantidad = x;
        }
    }
    get cantidad(){
        return this.cantidad;
    }

    set tipoGasto(x){
        this.tipoGasto = x;
    }
    get tipoGasto(){
        return this.tipoGasto;
    }

    set tipoPago(x){
        this.tipoPago = x;
    }
    get tipoPago(){
        return this.tipoPago;
    }
}

module.exports = Gasto;
