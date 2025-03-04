//Ro esta es tu parte
var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
var numeroPedido = JSON.parse(localStorage.getItem("numeroPedido")) || 1;

function agregarPedido() {
    var producto = document.getElementById("producto").value;
    var precioBase = { "hamburguesa": 5.00, "perrito": 3.50, "bocadillo": 4.00 };
    
    var pedido = {
        id: numeroPedido++,
        producto: producto,
        precio: precioBase[producto],
        estado: "Realizado"
    };

    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("numeroPedido", JSON.stringify(numeroPedido));

    actualizarPrecio();
}

function actualizarPrecio() {
    var total = pedidos.reduce((sum, p) => sum + p.precio, 0);
    document.getElementById("precioTotal").innerText = "Total: " + total.toFixed(2) + "€";
}

function confirmarPedido() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert("Pedido enviado a la cocina!");
    window.location.reload();
}

//Esta sería mi parte.
var listaPedidos = document.getElementById("listaPedidos");
var listaRecogida = document.getElementById("listaRecogida");

function cargarPedidos() {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    listaPedidos.innerHTML = "";
    listaRecogida.innerHTML = "";

    pedidos.forEach(function (pedido, index) {
        var li = document.createElement("li");
        li.innerText = "Pedido " + pedido.id + " - " + pedido.producto + " - " + pedido.estado;

        if (pedido.estado === "Realizado") {
            setTimeout(() => cambiarEstado(pedido.id, "En proceso"), 3000);
        } else if (pedido.estado === "En proceso") {
            setTimeout(() => cambiarEstado(pedido.id, "Listo para recoger"), 5000);
        } else if (pedido.estado === "Listo para recoger") {
            var btnRecoger = document.createElement("button");
            btnRecoger.innerText = "Recoger";
            btnRecoger.onclick = function () { recogerPedido(index); };
            li.appendChild(btnRecoger);
        }

        listaPedidos.appendChild(li);
    });
}

function cambiarEstado(id, nuevoEstado) {
    var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    var pedido = pedidos.find(p => p.id === id);
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