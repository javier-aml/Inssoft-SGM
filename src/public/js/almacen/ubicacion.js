$("#buttonU").on("click", function () {
  const number = $("#count").val();

  $.post("/almacen/qr/ubicacion", {
    type: number
  }, function (data) {

  });
})


$(".change").on("click", function () {
  // const number = $("#count").val();

  let id = []
  let text = "<div>"
  $('input[type=checkbox]:checked').each(function () {
    var ids = $(this).attr("id");
    text += ` <p><strong>Descripcion de pedido: </strong>${$(`#tr_${ids} .dPedido`).html()}</p>`;

  });

  text += `<div>
    <p class="text-center"><strong>Cambio de ubicación</strong></p>
    <div class="text-center">
   <button type="button"  id="${$(`#tr_${id} .id`).html()}"  data-bs-dismiss="modal" class="btn btn-primary btnAlmacen">Almacen</button>
    <button type="button" class="btn btn-primary btnProveedor"  data-bs-dismiss="modal" id="${$(`#tr_${id} .id`).html()}">Proveedor</button>
   </div>
    
    `;
  text += "</div>";
  //     let text = `<div>
  //     <p style="display:none" id="id">${$(`#tr_${id} .id`).html()}</p>
  //     <p><strong>Numero de parte: </strong>${$(`#tr_${id} .nParte`).html()}</p>
  //     <p><strong>Descripcion de pedido: </strong>${$(`#tr_${id} .dPedido`).html()}</p>
  //     <p><strong>Cantidad: </strong>${$(`#tr_${id} .cantidad`).html()}</p>
  //     <p><strong>Ubicacion: </strong>${$(`#tr_${id} .ubicacion`).html()}</p>
  //     <p class="text-center"><strong>Cambio de ubicación</strong></p>
  //     <div class="text-center">
  //    <button type="button"  id="${$(`#tr_${id} .id`).html()}"  data-bs-dismiss="modal" class="btn btn-primary btnAlmacen">Almacen</button>
  //     <button type="button" class="btn btn-primary btnProveedor"  data-bs-dismiss="modal" id="${$(`#tr_${id} .id`).html()}">Proveedor</button>
  //    </div>

  //     </div>`;

  $("#changeUbicacion .modal-body").empty();
  $("#changeUbicacion .modal-body").append(text);

})

$(".modal-body").on("click", (".btnAlmacen"), function () {
  let text = "";
  $("#botonFormAlbaran2").prop('disabled', false);

  $('input[type=checkbox]:checked').each(function () {
    let id = $(this).attr("id");
    text += `<div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${$(`#tr_${id} .dPedido`).html()}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="container-fluid">
          
                          <div class="mb-1">
                            <div class="row">
                              <div class="div col-6">
                                <label  class="form-label"><strong>Descripcion de pedido: </strong> ${$(`#tr_${id} .dPedido`).html()}</label>
                                <label  class="form-label"><strong>Cantidad a retirar: </strong> </label>
                                <input type="number"   placeholder=""  class="form-control" name="cantidad" id="cantidad_${id}"
                                  >
                              </div>
                            </div>
                          </div>
            </div>
          </div>`;

  });
  $("#pedidos").empty();
  $("#pedidos").append(text);

  $("#ubicacionTxt").modal("show");
  $(".changeUbicacion").attr("id", $("#changeUbicacion .modal-body .btnAlmacen").attr("id"));
})
$(".modal-body").on("click", (".btnProveedor"), function () {
  $("#botonFormAlbaran").prop('disabled', false);
  let text = "";
  $('input[type=checkbox]:checked').each(function () {
    let id = $(this).attr("id");
    
    text += `<div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${$(`#tr_${id} .dPedido`).html()}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="container-fluid">
          
                          <div class="mb-1">
                            <div class="row">
                              <div class="div col-6">
                                <label  class="form-label"><strong>Descripcion de pedido: </strong> ${$(`#tr_${id} .dPedido`).html()}</label>
                                <label  class="form-label"><strong>Cantidad a retirar: </strong> </label>
                                <input type="number"   placeholder=""  class="form-control" name="cantidad" id="cantidad2_${id}"
                                  >
                              </div>
                            </div>
                          </div>
                        </div>
            </div>
          </div>`;

  });
  $("#pedidos2").empty();
  $("#pedidos2").append(text);
  $("#ubicacionTxt2").modal("show");
  //    $.post("/almacen/change/ubicacion/proveedores",{type:number}, function( data ) {

  //  });
})

$(".changeUbicacion").on('click', function () {
  $("#botonFormAlbaran2").prop('disabled', true);
  let data = [];
  let status = true;
  $('input[type=checkbox]:checked').each(function () {
    let id = $(this).attr("id");
    let cantidad = $(`#cantidad_${id}`).val();
    data.push({
      id: id,
      cantidad: cantidad
    })
    if ($(`#tr_${id} .cantidad`).html() - $(`#cantidad_${id}`).val() < 0) {
      status = false;
    }
  });
  const ubicacion = $("#ubicacionText").val().toUpperCase();
  let datos = {
    data: data,
    ubicacion: ubicacion
  }
  if (status == true) {
    $.post("/almacen/change/ubicacion", {
      datos
    }, function (data) {
      if (data != false) {
        $('.modal-backdrop').remove();
        $("#ubicacionTxt").modal("hide");
        $('#modalBody').empty();
        $('#modalBody').append(`Se cambio de ubicación correctamente`);
        $('#myModal').modal('show');
        $("#ubicacionText").val("");
        tabla(data)
      } else {
        document.getElementById("ubicacionText").style.borderColor = "#FF0000";
        $("#passwordHelpBlock").empty();
        $("#ubicacionText").val("");
        $("#passwordHelpBlock").append("La ubicacion ingresada no existe");

      }
    });
  } else {
    alert("Esta tratando de sacar mas material de lo que se encuentra en almacen")
  }
})

$( "#ubicacionText2" ).change(function() {
  const select = $("#ubicacionText2").val().indexOf("EKIDE")
  if (select != -1) {
    const text = `                      <div class="row">
    <label class="form-label" for="persona">Ingresar nombre de usuario</label>
    <input class="form-control" maxlength="6" id="persona"type="text" name="Persona">
  </div>`
  $("#textCuenta").empty()
  $("#textCuenta").append(text)
  } else{
    $("#textCuenta").empty()
  }

});
$(".changeUbicacion2").on('click', function () {
  let data = [];
  let status = true;
  let cuenta
  $("#botonFormAlbaran").prop('disabled', true);
  cuenta = $("#persona").val();
  if (cuenta === undefined) {
      cuenta = 0;
  }
  $('input[type=checkbox]:checked').each(function () {
    let id = $(this).attr("id");
    let cantidad = $(`#cantidad2_${id}`).val();
    data.push({
      id: id,
      cantidad: cantidad,
      nParte: $(`#tr_${id} .dPedido`).html()
    })
    if ($(`#tr_${id} .cantidad`).html() - cantidad < 0) {
      status = false;
    }

  });
  const ubicacion = $("#ubicacionText2").val().toUpperCase();
  const observaciones = $("#observaciones").val()
  let datos = {
    data: data,
    ubicacion: ubicacion,
    cuenta:cuenta,
    observaciones:observaciones
  }
  if (status == true) {
    const ubicacionA = 
    $.post("/almacen/change/ubicacion/proveedores/", {
      datos
    }, function (data) {
      if (data != true) {
        console.log(data);
        if (data.id=="Error") {
          alert("Porfavor agregar elemenos para hacer el albaran")
        }else{
          $('.modal-backdrop').remove();
          $("#ubicacionTxt2").modal("hide");
          $('#modalBody').empty();
          $('#modalBody').append(`Se cambio de ubicación correctamente`);
          $('#myModal').modal('show');
          $("#ubicacionText").val("");
          tabla(data.data);

          window.open(`/almacen/change/ubicacion/proveedores`);
          window.open(`/almacen/change/ubicacion/proveedoresEtiqueta`);
        }

        
      } else {
        document.getElementById("ubicacionText").style.borderColor = "#FF0000";
        $("#passwordHelpBlock").empty();
        $("#ubicacionText").val("");
        $("#passwordHelpBlock").append("La ubicacion ingresada no existe");

      }
    });
  } else {
    alert("Esta tratando de sacar mas material de lo que se encuentra en almacen")

  }
})

$(".btnFiltro").on("click", function () {
  const id = $(this).attr("id");
  $.post("/almacen/filtro", {
    id: id
  }, function (data) {

    if (data != false) {
      tabla(data)
    } else {

    }
  })

})

function tabla(datos) {
  let text = ""
  for (let index = 0; index < datos.length; index++) {
    text += `<tr id="tr_${datos[index].id}">  
        <th class="text-center id" style="display: none;" >${datos[index].id}</th>
        <td class="text-center nParte" >${datos[index].nParte}</td>
        <td class="text-center dPedido" > ${datos[index].dPedido}</td>
        <td class="text-center cantidad" > ${datos[index].Cantidad}</td>
        <td class="text-center ubicacion" > ${datos[index].Ubicacion}</td>
        <td class="text-center" > <input type="checkbox" class="form-check-input checkbox" name="change_${datos[index].id}" id="${datos[index].id}"></td>
        <td> <button type="button" id="${datos[index].id}" class="btnFiltro btn btn-primary cambiarCantidad">Actualizar cantidad</button></td>
    </tr>`

  }
  $("#content-body").empty();
  $("#content-body").append(text);

}

$("#cancel").on('click', function () {
  $.post("/almacen/obtainM", function (data) {
    let text = "";
    for (const key in data.data) {
      text += `<p class="card-content-gen ml-xl-5">${data.data[key].cliente}<a class="nCancel card-content-gen ml-xl-5">${data.data[key].id/5}</a></p>`;
    }
    const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>`;
    $("#CancelarM #cancelBtn").empty()
    $("#CancelarM #cancelBtn").append(buttons)
    $("#cancelarBody").empty();
    $("#cancelarBody").append(text);
  })
})

$("#edit").on('click', function () {
  $.post("/almacen/obtainM", function (data) {
    let text = "";
    for (const key in data.data) {
      text += `<p class="card-content-gen">${data.data[key].cliente}<a class="nEdit card-content-gen">${data.data[key].id/5}</a></p>`;
    }
    const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>`;
    $("#EditM #EditBtn").empty()
    $("#EditM #EditBtn").append(buttons)
    $("#editBody").empty();
    $("#editBody").append(text);
  })
})

$("#editBody").on('click', ".nEdit", function () {

  const id = $(this).html() * 5;

  $.post("/almacen/showM", {
    id: id
  }, function (data) {
    console.log("A");
    let text = "";
    text += "<div class='container-fluid'><div class='row'><h3 class='col-6'>Descripcion</h3> <h3 class='col-3'>Cantidad</h3><h3 class='col-3'>Eliminar</h3></div> "
    for (const key in data) {
      text += `<div class='row ' id="editRow_${data[key].id_anterior}"> <p class="card-content-gen col-6">${data[key].concepto}</p> <p class="card-content-gen col-3">${data[key].cantidad}</p> <img name="${data[key].cantidad}" id="${data[key].id_anterior}" class="card-content-gen btnEditDelete col-3" src="/assets/x-lg.svg" width="50px" height="50px"  alt=""></div>`;
    }
    text += "</div>";
    const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>`
    $("#CancelarM #cancelBtn").empty();
    $("#CancelarM #cancelBtn").append(buttons);
    console.log($("#CancelarM #cancelBtn"));
    $("#editBody").empty();
    $("#editBody").append(text);

  })
})

$("#cancelarBody").on('click', ".nCancel", function () {

  const id = $(this).html() * 5;

  $.post("/almacen/showM", {
    id: id
  }, function (data) {
    let text = "";
    text += "<div class='container-fluid'><div class='row'><h3 class='col-6'>Descripcion</h3> <h3 class='col-3'>Cantidad</h3>  <h3 class='col-2'>Cancelar</h3> </div> "
    for (const key in data) {
      text += `<div class='row'> <p class="card-content-gen col-6">${data[key].concepto}</p> <p class="card-content-gen col-3">${data[key].cantidad}</p><button type="button" id="${data[key].id}" class="btn btn-outline-primary nCancelIndividual col-2">Cancelar</button>
     </div>`;
    }
    text += "</div>";
    const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button> <button id="${id}" type="button" class="btn btn-primary cancelarMovimiento">Cancelar</button>`
    $("#CancelarM #cancelBtn").empty();
    $("#CancelarM #cancelBtn").append(buttons);
    console.log($("#CancelarM #cancelBtn"));
    $("#cancelarBody").empty();
    $("#cancelarBody").append(text);

  })
})
$("#editBody").on('click','.btnEditDelete',function(){

})
$("#CancelarM #cancelBtn").on('click', ".cancelarMovimiento", function () {
  const id = $(this).attr("id");
  $.post("/almacen/cancelM", {
    id: id
  }, function (data) {
    let text = "";
    if (data.status == true) {
      
      text += "Se cancelo el movimiento correctamente";
    }else{
      text += "Este movimiento no se puede cancelar de momento, Se esta trabajando en ello";
    }
    const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>`;
    $("#CancelarM #cancelBtn").empty()
    $("#CancelarM #cancelBtn").append(buttons);
    $("#cancelarBody").empty();
    $("#cancelarBody").append(text);
    tabla(data.dataTable)
  })
})
$(".bodyTable").on('click', ".cambiarCantidad", function () {
  const html = $(this).html();
  const id = $(this).attr("id");
  if (html.indexOf("Actualizar cantidad") != -1) {
   const cantidad = $(`#tr_${id} .cantidad`).html();
   const text = `<input class="form-control" id="cantidadInput" value="${parseInt(cantidad)}" type="number" >`;
   $(`#tr_${id} .cantidad`).empty();
   $(`#tr_${id} .cantidad`).append(text);
   $(this ).html("Guardar Cambio");
  }else{
    const cantidad = $(`#tr_${id} #cantidadInput`).val();
    $(this ).html("Actualizar cantidad");
     $.post("/almacen/cambiarCantidades", {id: id,cantidad:cantidad}, function (data) {
      $(`#tr_${id} .cantidad`).empty();
      $(`#tr_${id} .cantidad`).append(cantidad);
      alert("se a actualizado el cambio de cantidad");
    })
  }
})

$("#filtroUbicacionTxt").bind("enterKey",function(e){
  //do stuff here
  $.post("/almacen/filtro/filtroP",{cliente:$(this).val()}, function( data ) {

    let text = "";
      for (const key in data) {

        text+=`<option value="${data[key].cliente}">${data[key].cliente}</option>`;
      }
    $("#ubicacionText2").empty();
    $("#ubicacionText2").append(text);

  })
});
$("#filtroUbicacionTxt").keyup(function(e){
  if(e.keyCode == 13)
  {
      $(this).trigger("enterKey");
  }
});
$("#CancelarM").on("click",".nCancelIndividual",function(){
  console.log($(this).attr("id"));
  $.post("/almacen/deleteI",{id:$(this).attr("id")}, function( data ) {
    if (data.length != 0) {
      let text = "";
      text += "<div class='container-fluid'><div class='row'><h3 class='col-6'>Descripcion</h3> <h3 class='col-3'>Cantidad</h3>  <h3 class='col-2'>Cancelar</h3> </div> "
      for (const key in data) {
        text += `<div class='row'> <p class="card-content-gen col-6">${data[key].concepto}</p> <p class="card-content-gen col-3">${data[key].cantidad}</p><button type="button" id="${data[key].id}" class="btn btn-outline-primary nCancelIndividual col-2">Cancelar</button>
       </div>`;
      }
      text += "</div>";
      const buttons = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button> <button id="${data[0].id_movimiento}" type="button" class="btn btn-primary cancelarMovimiento">Cancelar</button>`
      $("#CancelarM #cancelBtn").empty();
      $("#CancelarM #cancelBtn").append(buttons);
      console.log($("#CancelarM #cancelBtn"));
      $("#cancelarBody").empty();
      $("#cancelarBody").append(text);
      alert("Se a modificado el albaran correctamente")
    }
    else{
      alert("se a eliminado el albaran correctamente ")
      $('.modal-backdrop').remove();
      $("#CancelarM").modal("hide");
    }
  })
});