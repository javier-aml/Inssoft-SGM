$("#procesar-pedido2").on('click',function () {
    console.log("hola");
    const body = $("#carrito_body tr")
    const solicitante = $("#solicitante").val();
    const proyecto = $("#proyecto").val(); 
    var id_movimiento = $("#id_movimiento").html();
    for (let index = 0; index < body.length; index++) {

        const tr = body[index];
        const rps = $(tr).find(".rps").html();
        const  titulo = $(tr).find(".titulo").html() ;
        const cantidad = $(tr).find(".cantidad").html() ;
        const id = $(tr).find(".id").html() ;
        $.post("/utiles/carrito/compra",{"nParte":rps,"dPedido":titulo,"cantidad":cantidad,"id":id,id_movimiento:id_movimiento,solicitante:solicitante,proyecto:proyecto}, function( data ) {
            
            
        })

    }

    console.log(document.getElementById('id_movimiento').innerHTML);
    localStorage.clear();
    window.location.reload();

})