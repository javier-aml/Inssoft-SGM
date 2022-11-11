
$("#bodyEquipo").on("click",'.clickEvent',function(){

    console.log( window.location.href + `/${$(this).attr('id')}`);
    window.location.replace(window.location.href + `/${$(this).attr('id')}`);
})


$("#agregarEquipo").on('click',function(){
    if ($("#Nombre").val() == '' || $("#nSerie").val() == '') {
        alert('Favor de llenar los campos "Nombre" y "Numero de serie".')
    } else {
        const data = {
            Nombre: $("#Nombre").val(),
            idInstrumento: Math.floor(Math.random() * 10000000),
            Descripcion: $("#Descripcion").val(),
            Modelo: $("#Modelo").val(),
            nSerie: $("#nSerie").val(),
            Fabricante: $("#Fabricante").val(),
            nCertificado: $("#nCertificado").val(),
            Clasificacion: $("#Clasificacion").val(),
            fCalibracion: $("#fCalibracion").val(),
            hPromedio: $("#hPromedio").val(),
        }
    
        $.post("/VistaPrueba/add/Equipo",data, function( data ) {
            $('#addEquipo').modal('toggle');
            $('.modal-backdrop').remove();
            $("#bodyEquipo").empty()
            let text =''
            let index=0
            
            for (const key in data) {
                text+=`
                <div class="col-6 col-xl-12 bodyTable clickEvent" id="${data[key].id}">
              <div class="row tableSep" id="${index}" >
                <div type="hidden" hidden class="col-12 col-xl-1 mt-xl-3 p-xl-2 tableLin" id="id_${data[key].id}">${data[key].id}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" style="word-wrap: break-word" id="Descripcion_${data[key].id}">${data[key].Descripcion}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin descLin fstCap" id="idInstrumento_${data[key].id}">${data[key].idInstrumento}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Nombre_${data[key].id}">${data[key].Nombre}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Modelo_${data[key].id}">${data[key].Modelo}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="nSerie_${data[key].id}">${data[key].nSerie}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Fabricante_${data[key].id}">${data[key].Fabricante}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="nCertificado_${data[key].id}">${data[key].nCertificado}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Clasificacion_${data[key].id}">${data[key].Clasificacion}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="fCalibracion_${data[key].id}">${data[key].date}</div>
                <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="hPromedio_${data[key].id}">${data[key].hPromedio}</div>
              </div>
            </div>`
            index++
            }
            $("#bodyEquipo").append(text)
            alert("Se agrego correctamente")
        })
    }

})