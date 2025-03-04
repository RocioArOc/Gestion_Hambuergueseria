//Ro esta es tu parte
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
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert("Pedido enviado a la cocina!");

    // Limpiar la interfaz para el siguiente pedido
    document.getElementById("precioTotal").innerText = "Total: 0.00€";
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

//Esta sería mi parte.
var listaPedidos = document.getElementById("listaPedidos");
var listaRecogida = document.getElementById("listaRecogida");

function cargarPedidos() {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    listaPedidos.innerHTML = "";
    listaRecogida.innerHTML = "";

    // Reemplazamos el forEach con un bucle for
    for (var i = 0; i < pedidos.length; i++) {
        var pedido = pedidos[i];
        var li = document.createElement("li");
        li.innerText = "Pedido " + pedido.id + " - " + pedido.producto + " - " + pedido.estado;

        if (pedido.estado === "Realizado") {
            setTimeout(function(id) {
                return function() {
                    cambiarEstado(id, "En proceso");
                };
            }(pedido.id), 3000);
        } else if (pedido.estado === "En proceso") {
            setTimeout(function(id) {
                return function() {
                    cambiarEstado(id, "Listo para recoger");
                };
            }(pedido.id), 5000);
        } else if (pedido.estado === "Listo para recoger") {
            var btnRecoger = document.createElement("button");
            btnRecoger.innerText = "Recoger";
            btnRecoger.onclick = function(index) {
                return function() {
                    recogerPedido(index);
                };
            }(i);
            li.appendChild(btnRecoger);
        }

        listaPedidos.appendChild(li);
    }
}

function cambiarEstado(id, nuevoEstado) {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    var pedido = pedidos.find(function(p) {
        return p.id === id;
    });
    if (pedido) {
        pedido.estado = nuevoEstado;
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        cargarPedidos();
    }
}

function recogerPedido(index) {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    var pedido = pedidos.splice(index, 1);
    
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert("Pedido recogido!");
    cargarPedidos();
}

cargarPedidos();