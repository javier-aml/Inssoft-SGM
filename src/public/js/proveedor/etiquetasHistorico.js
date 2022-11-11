
let datos = []

$("#modalSaveBtn").on('click',function(params) {
    $(".checkbox").each(function(params) {
        
      if (this.checked) {
        const attrId = $(this).attr("id");
        const arrayId = attrId.split("_");
        const id = arrayId[1];
        let field1 = $(`#cPedido_${id}`).html();
        let field2 = $(`#nParte_${id}`).html();
        let field3 = $(`#dPedido_${id}`).html();
        let field4 = $(`#cantidad_${id}`).html();
        let field5 = $(`#nQR_${id}`).html();
        let field6 = $(`#Remision${id}`).html();
    
        let data = {
          "nPartes":field2,
          "nQR":field5,
          "pedido": field3,
          "cantidad": field4,
          "cPedido":field1,
          "Status":1
         // "Remision":field6
        };
        datos.push(data)

    } 
    })
    $.post(`../historico/qr`, {'data': datos}, function( data ) {

   });
})
$("#etiqueta").on('click',function(params) {

  console.log(datos);
  $.post(`../historico/tabla`, {'data': datos}, function( datoss ) {
    window.open("../download/file");
    datos = []
  });

});