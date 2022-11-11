$(".tornilleria").on("click",function(){
    console.log($(this).attr("name"));
    $.post("/almacen/carrito/compra",{"id_movimiento":$(this).attr("name")}, function( data ) {
        window.open(`/almacen/open/pdf/tornilleria`);
        tabla(data.data);
    })
})