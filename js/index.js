class Producto{
    
    constructor(obj){
 
        this.codigo = obj.codigo;
     
        this.nombre = obj.nombre;
     
        this.marca = obj.marca;
     
        this.precio = obj.precio;
    
    }
    
    interes(numeroCuotas){

        let interesTotal=0;
        
        if(tipoProducto(this.nombre, numeroCuotas)!=-1){
        
            interesTotal=1 + tipoProducto(this.nombre, numeroCuotas);

            if (numeroCuotas!=1 && interesTotal!=-1){
        
                if(this.marca=="MOTOROLA"){
            
                    interesTotal+=0.05;

                }else if(this.marca=="SONY"){

                    interesTotal+=0.07;

                }else if(this.marca=="APPLE"){
            
                    interesTotal+=0.15;

                }
        
                if (this.precio>250000){    

                    interesTotal+=0.10;

                }

            }

        }

        return this.precio*interesTotal;
        
    }

}
const productos = [];

fetch('js/data.json')

    .then( (resp) => resp.json())

    .then( (data) => {

        data.forEach ( (producto) => {    

        productos.push(new Producto(producto));

    })

})

function tipoProducto(nombre, numeroCuotas){

    if(nombre=="SMART TV"){
        
        switch (numeroCuotas) {

            case 1:

                return 0;
                
            case 3:

                return 0; 

            case 6:    
                
                return 0.05;
            
            case 12:
            
                return 0.10;
            
            case 18:
        
                return 0.15;
            
            case 24:
        
                return 0.25;
            
            default:
        
                return -1;
        
        }

    }else if(nombre=="CELULAR"){
        
        switch (numeroCuotas) {
            case 1:

                return 0;
                
            case 3:

                return 0.01;

            case 6:
                
                return 0.02;

            case 12:

                return 0.04;

            case 18:

                return 0.08;

            default:

                return -1;

        }

    }else{
        
        switch (numeroCuotas) {

            case 1:

                return 0;

            case 3:

                return 0.10;

            case 6:

                return 0.15;

            case 12:

                return 0.20;

            default:

                return -1;
            
        }

    }

}

function calcularCuota(numeroProducto, numeroCuotas){

    let contCuota = document.getElementById("precioCuota");

    let compra = document.getElementById("contComprar");
    
    let cuotaHtml = document.createElement("h3");

    if (numeroProducto>=1 && numeroProducto<=10){

        let producto = productos.find(objeto => objeto.codigo == numeroProducto);

        let precioFinal = producto.interes(numeroCuotas);

        if(precioFinal>0){

            let valorCuota = precioFinal/numeroCuotas;

            precioFinal = Math.ceil(precioFinal);

            valorCuota = Math.ceil(valorCuota);

            localStorage.setItem("cuota", valorCuota);
        
            cuotaHtml.innerHTML = `El precio final con intereses del producto ${producto.nombre} ${producto.marca} es $${precioFinal} (el valor de la cuota es $${valorCuota}).`;
            
            compra.classList.remove("ocultar");

        } else {

            cuotaHtml.innerHTML = "La cantidad de cuotas seleccionada no está disponible";

        }
    } else {

        cuotaHtml.innerHTML = "El producto no esta disponible.";

    }
    contCuota.appendChild(cuotaHtml);
    

}


let compra = document.getElementById("formulario");

compra.addEventListener("submit", confirmarCompra);

function confirmarCompra(e){
    
    e.preventDefault();
    
    let numeroProducto = parseInt(compra.children[0].value);

    let numeroCuotas = parseInt(compra.children[1].value);

    localStorage.setItem("cantCuotas", numeroCuotas);
    
    calcularCuota(numeroProducto, numeroCuotas);

}