
const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const confirmarPedido = document.getElementById("confirmarPedido");

//precios base
const precios = {
    hamburguesa: 5.00,
    perrito: 3.50,
    bocadillo: 4.00,
    ingredientes: 0.50,
    complementos: {
        patatas: 2.00,
        ensalada: 1.50,
        fingersPollo: 2.50
    },
    bebidas: {
        agua: 1.00,
        refresco: 1.50,
        cerveza: 2.00
    }
};

// Función para calcular el total
function calcularTotal() {
    let total = 0;

    // Se obtiene el producto que se ha seleccionado
    const productos = document.getElementsByName("producto");
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].checked) {
            total += precios[productos[i].value];
            break;
        }
    }

// Contar ingredientes adicionales seleccionados
const ingredientes = document.getElementsByTagName("input");
for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i].type === "checkbox" && ingredientes[i].checked) {
        total += precios.ingredientes;
    }
}

// Obtener la bebida seleccionada
const bebidas = document.getElementsByName("bebida");
for (let i = 0; i < bebidas.length; i++) {
    if (bebidas[i].checked) {
        total += precios.bebidas[bebidas[i].value];
        break;
        }
    }


}
