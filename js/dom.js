let info = document.getElementById("infoCuotas");

let infoCuotas = document.createElement("h6");

infoCuotas.innerHTML = "La cantidad de cuotas permitidas para los productos son: Smart TV's: 3, 6, 12, 18 y 24. Celular: 3, 6, 12 y 18. Otros: 3, 6 y 12";

info.appendChild(infoCuotas);

fetch('js/data.json')

    .then ( (res) => res.json())

    .then ( (data) => {

        data.forEach ( (producto) => {

            let contArticulo = document.getElementById("articulo");

            const articulo = document.createElement("h2");

            articulo.innerHTML = `Producto ${producto.codigo}: ${producto.nombre} ${producto.marca} Precio: $${producto.precio}<hr/>`;

            contArticulo.appendChild(articulo);

        })

    })