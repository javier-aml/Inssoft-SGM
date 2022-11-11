$("#QrButtonAccept").on("click",function(){
    const result = $("#QrButtonAccept").attr("Name");
  if (result.indexOf("nQR") != -1) {
  $.post("/almacen/lector/QR",{result}, function( data ) {
    if (data == true) {       
         $('#myModal').modal('show');
         $('#modalBody').empty();
      $('#modalBody').append(`Se agrego correctamente`);
    }else if(data == "Ubicacion"){
          $('#myModal3').modal('show');
          $('#modalBody3').empty();
          document.getElementById("ubicacionText").style.borderColor="#767676";
          $("#passwordHelpBlock").empty();
    }else if(data == "Repetido"){
      $('#myModal').modal('show');
      $('#modalBody').empty();
      $('#modalBody').append(`Este QR ya fue escaneado`);   
    }
    else if(data == false){
           $('#modalBody').append(`Error al escanear o QR codigo valido`);   
    }
    else{
      /** 
       * dPedido
       * Ubicacion
       * Cantidad
       */
      let text= "";
      for (let index = 0; index < data.length; index++) {
        text+=`<li class="list-group-item"><a class="selectDPedido">${data[index].dPedido}</a></li>`
        
      }
      $("#listDPedido").empty()
      $("#listDPedido").append(text);
      $("#selectPedido").modal('show'); 
      //  $("#nParte").val(data[0].nParte);
      //  $("#dPedido").val(data[0].dPedido);
      //  $("#Ubicacion").val(data[0].Ubicacion)
      //  $("#Cantidad").val(data[0].Cantidad)
      // $('#myModalUbicacion').modal('show');
    }
  });      
  } else {
  $('#modalBody').append(`Error al escanear o QR codigo valido`);
  }
  })
  $("#addUbicacion").on("click",function(){
    const result = $("#QrButtonAccept").attr("Name");
    const ubicacion = $("#ubicacionText").val()
    const obj = JSON.parse(result);
    $.post("/almacen/add/ubicacion",{nQR: obj.nQR,ubicacion:ubicacion,nParte:obj.nParte }, function( data ) {
  
      if(data){
          // document.getElementById("ubicacionText").style.borderColor="#7FFF00";
          // $("#passwordHelpBlock").empty();
          // $("#passwordHelpBlock").append("Se asigno correctamente la ubicacion");
          $('.modal-backdrop').remove();
          $("#myModal3").modal("hide");
          $('#modalBody').empty();
          $('#modalBody').append(`Se agrego correctamente`);
          $('#myModal').modal('show');
          $("#ubicacionText").val("");
  
  
      }else{
        document.getElementById("ubicacionText").style.borderColor="#FF0000";
        $("#passwordHelpBlock").empty();
        $("#ubicacionText").val("");
           $("#passwordHelpBlock").append("La ubicacion ingresada no existe o ya a sido ingresada");
      }
    })
  })
  
  $("#qrButtonRetirar").on("click", function(){
    const ubicacion = $("#Ubicacion").val();
    const user = $("#User").html();
    const cantidad = $("#Retirar").val();
    const total = $("#Cantidad").val();
    const of = $("#OF").val();
    const nParte = $("#nParte").val();
    const dParte = $("#dParte").val()
    $.post("/almacen/retirar/ubicacion",{cantidad:cantidad,ubicacion:ubicacion,total:total,of:of,nParte:nParte,dParte:dParte,User:user}, function( data ) {
      $('#myModal').modal('show');
      $('#modalBody').empty();
   $('#modalBody').append(`Se retiro correctamente la cantidad`); 
    });
  })
  
  $("#listDPedido").on('click','.selectDPedido',function(){
    const dPedido = $(this).html();
    const Ubicacion = $("#selectPedidoLabel").html()
    $.post("/almacen/obtain/ubicacion",{dPedido:dPedido,Ubicacion:Ubicacion}, function( data ) {
      $('.modal-backdrop').remove();
      $("#selectPedido").modal("hide");
       $("#nParte").val(data[0].nParte);
       $("#dPedido").val(data[0].dPedido);
       $("#Ubicacion").val(data[0].Ubicacion)
       $("#Cantidad").val(data[0].Cantidad)
      $('#myModalUbicacion').modal('show');
    });
  
  })
  // $("#Retirar").on("input",function(){
  //   $('.modal-backdrop').remove();
  //    $("#myModalUbicacion").modal("hide");
  
  
  // })