$("#generarM").on('click',function(){
    $.post("/almacen/obtainM", function( data ) {

      let text = "";
   
      let text2 = `   <select name="" class="form-select" id="selectMov">
      <option selected value="">selecciona una opcion para filtrar</option>
       <option value="all">Todos</option>`;
      for (const key in data.data) {
        text += `<p class="card-content-gen ml-xl-5">${data.data[key].cliente}<a class="nMovimiento card-content-gen ml-xl-5">${data.data[key].id/5}</a></p>`;
      }for (const key in data["data2"]) {
      
        text2 += ` <option value="${data["data2"][key].id}">${data["data2"][key].cliente}</option>`;
      }
      text2+="</select>"
      $("#movimientoBody").empty();
      $("#movimientoBody").append(text2);
      $("#movimientoBody").append(text);

  })
  })

  $("#movimientoBody").on('click',".nMovimiento",function(){
    const id = $(this).html()*5;
    console.log(id);
    $.post("/almacen/generarPdfM",{id:id}, function( data ) {
      console.log(data == true);
      if (data == true) {
        window.open(`/almacen/change/ubicacion/proveedores`);
        window.open(`/almacen/change/ubicacion/proveedoresEtiqueta`);
      }else{
        alert("No existen pedidos para este albaran")

      }

    })
  })
  $("#movimientoBody").on('change',"#selectMov",function(){
    console.log($(this).val());
    $.post("/almacen/filtroObtainM",{id:$(this).val()}, function( data ) {
      let text = "";
   
      let text2 = `   <select name="" class="form-select" id="selectMov">
      <option selected value="">selecciona una opcion para filtrar</option>
       <option value="all">Todos</option>`;
      for (const key in data.data) {
        text += `<p class="card-content-gen ml-xl-5">${data.data[key].cliente}<a class="nMovimiento card-content-gen ml-xl-5">${data.data[key].id/5}</a></p>`;
      }for (const key in data["data2"]) {
      
        text2 += ` <option value="${data["data2"][key].id}">${data["data2"][key].cliente}</option>`;
      }
      text2+="</select>"
      $("#movimientoBody").empty();
      $("#movimientoBody").append(text2);
      $("#movimientoBody").append(text);

  })
  })