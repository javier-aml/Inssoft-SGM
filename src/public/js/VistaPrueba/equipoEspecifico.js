$("#body").on("click",'.clickEvent',function(){

    console.log( window.location.href + `/${$(this).attr('id')}`);
    window.open(window.location.href + `/view/${$(this).attr('id')}`);
})
$("#bodyD").on("click",'.clickEvent',function(){

    console.log( window.location.href + `/${$(this).attr('id')}`);
    window.open(window.location.href + `/view/${$(this).attr('id')}`);
})
$("#addIMGM").on('click',function(){
    var data = new FormData($('#equipoIMG')[0]);
    console.log(data);
    const id = $("#addIMGM").attr("data-id")
    $.ajax({
        url:'/VistaPrueba/changeIMG',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){
            console.log('succes');
            console.log(res);
            $.post("/VistaPrueba/change/img",{fileName:res,id:id}, function( data ) {
                $("#img").attr('src',`/img/equipos/${data}`)
                $('#CambiarIMG').modal('toggle');
                $('.modal-backdrop').remove();
                alert('Se cambio correctamente la imagen');
            })
        },
        error: function(){
            alert('Error: In sending the request!');
        }
    })
})

$("#addCertificadobtn").on('click',function(){
    var data = new FormData($('#certificado')[0]);
    const id = $("#addCertificadobtn").attr("data-id")

    const Nombre = $("#Nombre").val()
    const Certificado = $("#Certificado").val()
    $.ajax({
        url:'/VistaPrueba/addCertificado',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){

            $.post("/VistaPrueba/add/certificado",{fileName:res,id:id,Nombre:Nombre,Certificado:Certificado}, function( data ) {
                let text = ''
                for (const key in data) {
                    text+=`
                    <div class="col-6 col-xl-12 bodyTable clickEvent" id="${data[key].id}">
                    <div class="row tableSep" >
                      <div type="hidden" hidden class="col-12 col-xl-1 mt-xl-3 p-xl-2 tableLin" id="id_${data[key].id}">${data[key].id}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" style="word-wrap: break-word" id="Nombre_${data[key].id}">${data[key].Nombre}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin descLin fstCap" id="Certificado_${data[key].id}">${data[key].Certificado}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Fecha_ingreso_${data[key].id}">${data[key].date}</div>
                    </div>
                  </div>
                    `
                }
                $('#addCertificado').modal('toggle');
                $('.modal-backdrop').remove();
                $("#body").empty()
                $("#body").append(text)
                alert('Se agrego correctamente el certificado');
            })
        },
        error: function(){
            alert('Error: In sending the request!');
        }
    })
})

$("#addDocumentobtn").on('click',function(){
    var data = new FormData($('#TipoForm')[0]);
    const id = $("#addDocumentobtn").attr("data-id")

    const Nombre = $("#Nombre").val()
    const Tipo = $("#tipo").val()
    $.ajax({
        url:'/VistaPrueba/addDocumento',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){

            $.post("/VistaPrueba/add/documento",{fileName:res,id:id,Nombre:Nombre,Tipo:Tipo}, function( data ) {
                let text = ''
                for (const key in data) {
                    text+=`
                    <div class="col-6 col-xl-12 bodyTable clickEvent" id="${data[key].id}">
                    <div class="row tableSep" >
                      <div type="hidden" hidden class="col-12 col-xl-1 mt-xl-3 p-xl-2 tableLin" id="id_${data[key].id}">${data[key].id}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" style="word-wrap: break-word" id="Nombre_${data[key].id}">${data[key].Nombre}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin descLin fstCap" id="Tipo_${data[key].id}">${data[key].Tipo}</div>
                      <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" id="Fecha_ingreso_${data[key].id}">${data[key].date}</div>
                    </div>
                  </div>
                    `
                }
                $('#addDocumento').modal('toggle');
                $('.modal-backdrop').remove();
                $("#bodyD").empty()
                $("#bodyD").append(text)
                alert('Se agrego correctamente el certificado');
            })
        },
        error: function(){
            alert('Error: In sending the request!');
        }
    })
})