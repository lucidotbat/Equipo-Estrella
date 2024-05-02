class Ingreso{
    constructor(descripcion, empresa, ingresoMensual, fechaDeInicio, diaDePago){
        this.descripcion = descripcion;
        this.empresa = empresa;
        this.ingresoMensual = ingresoMensual;
        this.fechaDeInicio = fechaDeInicio;
        this.diaDePago = diaDePago;
    }

    set descripcion(x){
        if(x == null || typeof(x) != 'string')
            throw new ProductException("Debes ingresar una descripción válida"); 
        else
            this.empresa = x;
    }

    set empresa(x){
        if(x == null || typeof(x) != 'string')
            throw new ProductException("Debes ingresar una empresa válida"); 
        else
            this.empresa = x;
    }

    set fechaDeInicio(x){
        if(isNaN(Date.parse(x)))
            throw new ProductException("Debes ingresar una fecha válida"); 
        
        else
            this.fecha = x;
    }

    set ingresoMensual(x){
        if(x == null || typeof(x) != 'number')
            throw new ProductException("Debes ingresar una cantidad válida"); 
        else
            this.cantidad = x;
    }
    
    set diaDePago(x){
        if((x == null || typeof(x) != 'number') && x > 0 && x < 31)
            throw new ProductException("Debes ingresar un día válida"); 
        else
            this.cantidad = x;
    }
    
    get descripcion(){ return this.descripcion; }
    get empresa(){ return this.empresa; }
    get ingresoMensual(){ return this.ingresoMensual; }
    get fechaDeInicio(){ return this.fechaDeInicio; }
    get diaDePago(){ return this.diaDePago; }
}

module.exports = Ingreso;
