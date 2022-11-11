$(".btnAddFile").on('click',function(){
    var data = new FormData($('#fileAdd')[0]);
    var Nombre = $("#NombreFile").val()
    $.ajax({
        url:'/VistaPrueba/addFile/Certificado',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){
            $.post("/VistaPrueba/add/file/Certificado",{Nombre :Nombre ,fileName:res}, function( data ) {

                let text = ''
                for (const key in data) {
                    text += `
                    <div id="tabla_${key}"  class="tabla container gy-5 rnd " style="background-color: #fff">
                    <div class="row">
                      <div class="col-6 col-xl-12">
                        <div class="row">
                          <div type="hidden" hidden class="col-12 col-xl py-xl-3 tableTitl tableLin rnd" >id</div>
                          <div class="col-12 col-xl py-xl-3 tableTitl tableLin rnd descTitlProv fstCap">Nombre</div>
                          <div class="col-12 col-xl py-xl-3 tableTitl tableLin rnd">Fecha</div>
          
                        </div>
                      </div>
                              <div id="bodyEquipo">
                                
                      <div class="col-6 col-xl-12 bodyTable clickEvent" data-bs-toggle="modal" data-bs-target="#PDFModal" id="${data[key].id}_${data[key].File}">
                        <div class="row tableSep" id="${key}" >
                          <div type="hidden" hidden class="col-12 col-xl-1 mt-xl-3 p-xl-2 tableLin">${data[key].id}</div>
                          <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin" style="word-wrap: break-word">${data[key].Nombre}</div>
                          <div class="col-12 col-xl mt-xl-3 p-xl-2 tableLin descLin fstCap">${data[key].Fecha}</div>
          
                        
                        </div>
                      </div>
                              </div>
                    </div>
                  </div>
                  `
                }
                $('.tablaRow').empty();
                $('.tablaRow').append(text);
                alert('Se agrego correctamente el archivo');
                location.reload()
            })
        },
        error: function(){
            alert('Error: In sending the request!');
        }
    })
    
})

$(".clickEvent").on('click',function(){
    let id = $(this).attr('id')
    id = id.split('_');
    id = id[1]
    $('#PDFViewer').attr('src',`/pdf/tabla/certificaciones/${id}`)
})

$("#Link").on('click',function(){
    alert('Se actualizo el json')
})