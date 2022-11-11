$(".btnDeleteCP").on('click',function () {
    const id = $(this).attr("id");
    $("#deltemodal").empty();
    $("#deltemodal").append(`Estas seguro que quieres eliminar el codigo de pedido ${id}.`);
    $("#deltebtn").attr("name",id);

})
$("#deltebtn").on('click',function () {
    const id = $(this).attr("name");
        $.post(`/almacen/delete/codigoP/${id}`, function( data ) {
            $("#result").modal("show")
 
        });
}) 