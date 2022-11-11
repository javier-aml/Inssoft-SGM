$(".codigosPedidos").on("click", function () {

  const id = $(this).attr("id");
  const fecha = DateNow();
  const path = fs.collection("pedidos").doc(fecha).collection(id);
  $("#tableBody").empty();
  $.post(`./Pedidos/Tabla`, {'cPedido': id}, function( data ) {
    let text = "";
      // doc.data() is never undefined for query doc snapshots
    for (const key in data) {
      let validacion = "";
      let revision = "";
      let rCantidad = "";
      let Dvalidacion = "";
      let Drevision = "";
      let DrCantidad = "";
      if (data[key].Validacion) {
        validacion = "checked";
        Dvalidacion = "disabled";

      } 
      if (data[key].Revision) {
        revision = "checked"
        Drevision = "disabled"
      } 
      if (data[key].rCantidad) {
        rCantidad = "checked";
        DrCantidad = "disabled";
      }
      text += `<tr>
      <td><input id="cPedido" type="hidden" value="${id}"></td>
      <td id="remision" scope="row">${data[key].Remision}</td>
      <td id="nParte" scope="row">${data[key].nParte}</td>
      <td id="dPedido" scope="row">${data[key].dPedido}</td>
      <td id="cantidad" > ${data[key].Cantidad}</td>
      <td id="cantidad" > ${data[key].Cantidad * data[key].cTotal}</td>
      <td id="comentarios">${data[key].Comments} </td>
      <td>  <input class="form-check-input rCantidad" type="checkbox" ${rCantidad} ${DrCantidad} value="true" id="rCantidad"></td>
      <td>  <input class="form-check-input validacion" type="checkbox" ${validacion} ${Dvalidacion}  value="true" id="validacion"></td>
      <td>  <input class="form-check-input revision" type="checkbox" ${revision} ${Drevision} value="true" id="revision"></td>
      </tr>`;
      
    }

    
      $("#tableBody").append(text);
      $("#guardarPedido").attr("disabled", false)
      $("#GenerarTicket").attr("disabled", true)
      buttonC();

});

})
$(".codigosPedidos").on("click",function(){
  const id = $(this).attr("id");
  $("#GenerarTicket").attr("name",id);
})
$("#GenerarTicket").on("click", function () {
  $("#ticketModal").modal('show');
  const cPedido = $(this).attr("name");
  $("#body-ticket").empty()
  let text = "";
  $.post(`./generar/ticket`, {'cPedido': cPedido}, function( data ) {
    // ('#exampleModal').
    for (const key in data) {
      if (data[key].Revision) {
        if (!data[key].Validacion || !data[key].rCantidad) {
          const split = data[key].Fecha.split("T")
          const fecha2 = acomodarFecha(split[0]);
          text += `<div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ${data[key].dPedido}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <form id="formTicket">
                      <div class="container-fluid">
        
                        <div class="mb-1">
                          <div class="row">
                            <div class="div col-6">
                              <label  class="form-label">Fecha</label>
                              <input type="text"   placeholder="" readonly value="${fecha2}" class="form-control" name="date"
                                >
                            </div>
                            <div class="div col-6">
                              <label  class="form-label">Descripcion de pedido</label>
                              <input type="text"  placeholder="" readonly value="${data[key].dPedido}" class="form-control" name="dPedido"
                                >
                            </div>
                          </div>
                        </div>
        
        
                        <div class="mb-1">
                          <div class="row">
                            <div class="div col-6">
                              <label  class="form-label">Codigo de pedido</label>
                              <input type="text"  placeholder="" readonly value="${data[key].cPedido}" class="form-control" name="cPedido"
                                >
                            </div>
                            <div class="div col-6">
                              <label  class="form-label">Numero de parte</label>
                              <input type="text"  placeholder="" readonly value="${data[key].nParte}" class="form-control" name="nParte"
                                >
                            </div>
                          </div>
                        </div>
                        <div class="mb-1">
                          <div class="row">
                            <div class="div col-6">
                              <label class="form-label">Localización</label>
                              <div class="form-floating">
                                <select name="localizacion" class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                  <option value ="005" selected>México</option>
                                  <option value="000">España</option>
                                  <option value="001">USA</option>
                                </select>
                                <label for="floatingSelect">Seleccione localización</label>
                              </div>
                            </div>
                            <div class="div col-6">
                            <label class="form-label">Departamento</label>
                            <div class="form-floating">
                              <select name="departamento" class="form-select" id="floatingSelect2" aria-label="Floating label select example">
                                <option value="02" selected>Utiles de control</option>
                                <option value="01">Series cortas</option>

                              </select>
                              <label for="floatingSelect2">Seleccione departamento</label>
                            </div>
                          </div>
                          </div>
                        </div>
                        <div class="mb-1">
                          <div class="row">
                            <div class="div col-12">
                              <label  class="form-label">Reclamo</label>
                              <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here"
                                  id="floatingTextarea" name="reclamo"></textarea>
                                <label for="floatingTextarea">Escribe aqui el motivo del ticket</label>
                              </div>
                            </div>
                          </div>
                        </div>
        
        
                        <div class="mb-1">
                          <div class="row">
                          <div class="div col-6">
                          <label  class="form-label">Tipo de reclamo</label>
                          <div class="form-floating mb-3">
                          <input type="text" class="form-control ${data[key].nParte}" id="floatingInput" placeholder="reclamo" name="Tipo">
                          <label for="floatingInput">Tipo de reclamo</label>
                        </div>
                        </div>
                            <div class="div col-6">
                              <label  class="form-label">Cantidad de dañada</label>
                              <input type="text"  placeholder="" value="0" class="form-control ${data[key].nParte}" name="cDanada"
                                >
                            </div>
                          </div>
                        </div>
        
        
                      </div>
                    </form>
          </div>
        </div>`;
        }
      }


    }
    $("#body-ticket").append(text)
});

})
$("#closeBtnTicket").on("click", function () {
  $("#exampleModal").modal('show');
  $("#GenerarTicket").attr("disabled", true)
  buttonC();
})

$("#guardarPedido").on("click", function () {
  let unlock2 = true;
  $('#tableBody').find("tr").each(function (index) {

    const nParte = $(this).find("#nParte").html();
    const id = $(this).find("#cPedido").val();
    const check = $(this).find("#validacion").is(":checked");
    const revision = $(this).find("#revision").is(":checked");
    const rCantidad = $(this).find("#rCantidad").is(":checked");

    let revisionBD = 0;
    let validacionBD = 0;
    let rCantidadBD = 0;
    if (check) {
      validacionBD = 1;
    }
    if (revision) {
      revisionBD = 1;
      
    }else{
      unlock2 = false;
    }
    if (rCantidad) {
      rCantidadBD = 1;
    }
    $.post(`./checkbox/guardar`, {'nParte':nParte,'revision': revisionBD,'validacion':validacionBD,'rCantidad':rCantidadBD}, function( data ) {
      // ('#exampleModal').
  });


  })
  if (unlock2) {
    $("#GenerarTicket").attr("disabled", false)
  }
})

$("#btnTicket").on("click",function(){
  let data = [];
  $("#formTicket").each(function(index){
 
    data.push($(this).serializeArray())
  })
  $.post(`./guardar/ticket`, {data}, function( datos ) {
    
});
})
function DateNow() {
  let date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let fecha = "";
  if (month < 10) {
    fecha = `${day}-0${month}-${year}`
  } else {
    fecha = `${day}-${month}-${year}`
  }
  return fecha
}
function buttonC(){
  let unlock = true;
  $(".revision").each(function(index){
    if (!this.checked) {
      // $("#GenerarTicket").attr("disabled", false)
      unlock = false
    }
  })
  if (unlock) {
    $("#GenerarTicket").attr("disabled", false)
  }
}

function selectChange(sel){

  const id = $(sel).attr("id");
  if (sel.value != "danado") {
    $(`.${id}`).val(0)
    $(`.${id}`).attr("readonly", true)
  }else{
    $(`.${id}`).attr("readonly", false)
  }
}
function acomodarFecha(date) {
  const split = date.split("-");
  const fecha = `${split[2]}-${split[1]}-${split[0]}`;
  return fecha;
}