$("#modalSaveBtn").on('click',function(params) {
    let datos = []
    $(".checkbox").each(function(params) {
        
        if (this.checked) {
            const attrId = $(this).attr("id");
            const arrayId = attrId.split("_");
            const id = arrayId[1];
            let field1 = $(`#cPedido_${id}`).html();
            let field2 = $(`#nParte_${id}`).html();
            let field3 = $(`#dPedido_${id}`).html();
            let field4 = $(`#cantidad_${id}`).html();
            let field5 = $(`#proyecto_${id}`).html();
            let field6 = $(`#Remision${id}`).html();
        
            let data = {
              "nPartes":field2,
              "proyecto":field5,
              "pedido": field3,
              "cantidad": field4,
              "cPedido":field1,
              "Remision":field6
            };
            datos.push(data)

        } 
    })
    $.post(`../historico/qr`, {'data': datos}, function( data ) {
        if (data) {
          $.post(`../historico/tabla`, {'data': datos}, function( data ) {

            window.open("../download/file");
        });
        }
   });
})