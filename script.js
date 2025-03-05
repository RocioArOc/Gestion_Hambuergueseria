//Parte Ro
var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
var numeroPedido = JSON.parse(localStorage.getItem("numeroPedido")) || 1;

function agregarPedido() {
    var producto = document.getElementById("producto").value;
    var precioBase = { "hamburguesa": 5.00, "perrito": 3.50, "bocadillo": 4.00 };
    
    // Ingredientes adicionales
    var ingredientesAdicionales = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        ingredientesAdicionales.push(checkboxes[i].value);
    }

    var precioTotal = precioBase[producto] + (ingredientesAdicionales.length * 0.50);

    // Bebida
    var bebida = document.getElementById("bebida").value;
    var preciosBebidas = {"ninguno": 0.00, "agua": 1.00, "refresco": 1.50, "cerveza": 2.00 };
    var precioBebida = preciosBebidas[bebida];

    // Complemento
    var complemento = document.getElementById("complemento").value;
    var preciosComplementos = { "ninguno": 0.00, "patatas": 2.00, "ensalada": 1.50, "aros": 2.50 };
    var precioComplemento = preciosComplementos[complemento];

    // Calculo del total
    var precioTotal = precioBase[producto] + (ingredientesAdicionales.length * 0.50) + precioBebida + precioComplemento;

    var pedido = {
        id: numeroPedido++,
        producto: producto,
        precio: precioTotal,
        estado: "Realizado"
    };

    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("numeroPedido", JSON.stringify(numeroPedido));

    // Mostrar el precio del pedido actual
    document.getElementById("precioTotal").innerText = "Total: " + precioTotal.toFixed(2) + "€";
}

function confirmarPedido() {
    if (pedidos.length === 0) {
        return;
    }

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    cargarPedidos();

    // Limpiar la interfaz para el siguiente pedido
    document.getElementById("precioTotal").innerText = "Total: 0.00€";
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

}

//Parte Desi

var listaPedidos = document.getElementById("listaPedidos");
var listaRecogida = document.getElementById("listaRecogida");

function cargarPedidos() {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    listaPedidos.innerHTML = "";
    listaRecogida.innerHTML = "";

    for (var i = 0; i < pedidos.length; i++) {
        var pedido = pedidos[i];
        var li = document.createElement("li");

        // Mostrar detalles del pedido
        li.innerHTML = "Pedido " + pedido.id + " - " + pedido.producto + " - " + pedido.estado +
            " - Total: " + pedido.precio.toFixed(2) + "€";

        if (pedido.estado === "Realizado") {
            (function(id) {
                setTimeout(function() {
                    cambiarEstado(id, "En proceso");
                }, 3000);
            })(pedido.id);

        } else if (pedido.estado === "En proceso") {
            (function(id) {
                setTimeout(function() {
                    cambiarEstado(id, "Listo para recoger");
                }, 5000);
            })(pedido.id);
            
        } else if (pedido.estado === "Listo para recoger") {
            var btnRecoger = document.createElement("button");
            btnRecoger.innerText = "Recoger";
            btnRecoger.onclick = (function(id) {
                return function() {
                    recogerPedido(id);
                };
            })(pedido.id);
            li.appendChild(btnRecoger);

            // Agregar a la zona de recogida
            listaRecogida.appendChild(li);
            continue; // Saltar la parte de agregar a listaPedidos
        }

        // Agregar a la lista de pedidos en proceso
        listaPedidos.appendChild(li);
    }
}

function cambiarEstado(id, nuevoEstado) {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id === id) {
            pedidos[i].estado = nuevoEstado;
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
            cargarPedidos();
            break;
        }
    }
}

function recogerPedido(id) {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    var nuevosPedidos = [];

    for (var i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id !== id) {
            nuevosPedidos.push(pedidos[i]);
        }
    }

    localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
    cargarPedidos();
}

cargarPedidos();
