$("#ir").on('click',function() {
    $.post("/almacen/calidad/ir", function( data ) {
        console.log(data);
        let text ="";
        for (let index = 0; index < data.length; index++) {
            text+= `<tr id="ir_${data[index].id}">
            <td id="nParte_${data[index].id}">${data[index].nParte}</td>
            <td id="dPedido_${data[index].id}">${data[index].dPedido}</td>
            <td id="Cantidad_${data[index].id}">${data[index].Cantidad}</td>
            <td ><button id="button_${data[index].id}" data-dismiss="modal" class="btn btn-outline-primary change waves-effect waves-light ticketG">Generar</button></td>
            </tr>`
            
        }
        $("#ir_body").empty()
        $("#ir_body").append(text)
    });
})

$("#ir_body").on("click",".ticketG",function() {
    $("#ticketModal").modal("show")
    let buttonid = $(this).attr("id")
    let split = buttonid.split("_")
    const id = split[1];
    const nParte = $(`#nParte_${id}`).html()
    const dPedido = $(`#dPedido_${id}`).html()

    $("#nParte").val(nParte);
    $("#dPedido").val(dPedido);

})
$("#ticketModal").on("click","#btnTicket",function(){
    let nParte = $(`#body-ticket #nParte`).val();
    let dPedido = $(`#body-ticket #dPedido`).val();
    let date = $(`#body-ticket #date`).val();
    let proveedor = $(`#body-ticket #proveedor`).val();
    let reclamo = $(`#body-ticket #reclamo`).val();
    console.log(nParte);
    console.log(dPedido);
    console.log(date);
    console.log(proveedor);
    console.log(reclamo);
    const datos = {
        nParte: nParte,
        dPedido:dPedido,
        date:date,
        proveedor:proveedor,
        reclamo:reclamo
    }
    $.post("/almacen/generar/ticket",datos, function( data ) {
        $('.modal-backdrop').remove();
        $("#ticketModal").modal("hide");
        $('#modalBodyticket').append(`Se agrego correctamente`);
          $("#myModalTicket").modal("show");
        
    })

})