$(".genEtiqueta").on("click",function () {
    const estado = $(this).attr("name");
    const id = $(this).attr("id");
    if (estado == 0) {
        $.post("/almacen/data/Remision", { id: id }, function (data) {
            $("#passwordHelpBlock").empty();
            var myModal = new bootstrap.Modal(document.getElementById("remisionEtiqueta"), {});
            myModal.show()
            let text = `			<div class="row">
            <h3 class="col-5">Descripcion</h3><h3 class="col-2">Ubicacion</h3><h3 class="col-2">Caduco</h3><h3 class="col-3">Fecha expiración</h3>
        </div>`;
            for (const key in data) {
                text += `			<div class="row">
				<h4 class="col-5">${data[key].dPedido}</h4><input type="text" id="${data[key].id}"  class="form-control col-2 ubicacionesTxt"><div class="form-check col-2 "style="text-align:center;">
                <input class="form-check-input checkboxC" type="checkbox" id="${data[key].id}C" value="1" >
              </div><input class="form-control col-3 fecha"  id="${data[key].id}F" type="date"></input> 
			</div>`
            }
            $("#ubicacionesRemision").empty();
            $("#ubicacionesRemision").append(text);
            $(".btnEtiquetaR").attr("id",id)
        })
    }else{
        $.post("/almacen/generar/Remision", { id: id }, function (data) {
            window.open(`/almacen/abrir/remision/Etiquetado`);
        })  
    }

})

$(".btnEtiquetaR").on("click",function () {
    const estado = $(this).attr("name");
    const id = $(this).attr("id");
    const datos = $("#ubicacionesRemision .ubicacionesTxt")
    const datos2 = $("#ubicacionesRemision .checkboxC")
    const datos3 = $("#ubicacionesRemision .fecha")
    console.log(datos2[0].id);
    console.log($(`#${datos2[0].id}`).is(':checked'));
    console.log(datos3[0].value);

    let obj = [];
    let obj2 = [];

    for (let index = 0; index < datos.length; index++) {

        obj.push({id:datos[index].id,ubicacion:datos[index].value})
        obj2.push({caduco:$(`#${datos2[index].id}`).is(':checked'),fecha:datos3[index].value})
    }

        $.post("/almacen/almacenar/Remision", { data:obj,caduco:obj2 }, function (data) {
        
            if (data != false) {
                let text = `                                  <div class="row">
                <p ><h3 class="col-4">Remsion</h3> <h3 class="col-8">Etiquietado</h3></p> <br>

                   </div>`;
                   for (const key in data) {
                        text += `
                        <div class="row">
     
                             <a class="card-content-gen col-4" href="/almacen/tablaRemision/${data[key].id_grupal}">${data[key].Nombre}</a><a class="card-content-gen col-8 genEtiqueta" name="${data[key].estado}" id="${data[key].id_grupal}" > Generar Etiquetas</a>
     
     
                        </div>`
                   }
                  $("#remisionesBody").empty();
                  $("#remisionesBody").append(text);  
                  $('.modal-backdrop').remove();
                  $("#remisionEtiqueta").modal("hide");
                  window.open(`/almacen/abrir/remision/Etiquetado`);
            } else {
                // document.getElementsByClassName("ubicacionesTxt").style.borderColor = "#FF0000";
                $(".ubicacionesTxt").css("border", "1px solid red");
                $("#passwordHelpBlock").empty();
                $(".ubicacionesTxt").val("");
                $("#passwordHelpBlock").append("Una o varias ubicaciones ingresadas no existen");
        
            }
        })
    

})
