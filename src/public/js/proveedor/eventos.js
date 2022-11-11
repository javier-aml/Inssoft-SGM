$("#btnEvento").on("click",function(){

    let data = {
        dPedido:$("#dPedidoE").val(),
        proveedor:$("#proveedorE").val(),
        Fecha:$("#FechaLLegadaE").val(),
    }
    $.post("/proveedor/asignar/eventos",data, function( data ) {
        //  $('.modal-backdrop').remove();
        // $("#eventosModal").modal("hide");
        // $("#bodyE").empty()
        $("#bodyE").append("Se agrego correctamente el evento")
        // $("#EventoSave").modal("show");
        $("#dPedidoE").val("")
        $("#proveedorE").val("")
        $("#provFechaLLegadaEeedorE").val("")
    });
})