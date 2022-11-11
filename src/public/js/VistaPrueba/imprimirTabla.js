console.log('hola');
$('.btnImprimir').on('click',function(){
    // console.log($(this).attr('id'));
    if ($(this).attr('name') != 0) {
        window.open(`/VistaPrueba/Visualizar/${$(this).attr('id')}/${$(this).attr('data')}`);
    }
})
$('.btnValidar').on('click',function(){
    const id = $(this).attr('data-id')
    const file_id = $(this).attr('id-file')
   $("#fTask").attr('data-id',id) 
   $("#fPDFTask").attr('data-id',id) 
   $("#fTask").attr('id-file',file_id) 

})
$('#fTask').on('click',function(){
    const id = $('#fTask').attr('data-id')
    const file_id = $('#fTask').attr('id-file')
    $.post("/VistaPrueba/finish/task",{id:id,file_id:file_id}, function( data ) {
        $('.btnImprimir').attr('name','1')
        alert('Se termino la tarea con exito')
    })
})
$('.btnImprimirPDF').on('click',function(){
    // console.log($(this).attr('id'));
    if ($(this).attr('name') != 0) {
        const id = $(this).attr('data')
        $.post("/VistaPrueba/get/pdf",{id:id}, function( data ) {

            window.open(`/VistaPrueba/Visualizar2/${data}`);
        })
    }
})
$('#fPDFTask').on('click',function(){
    const data = {    
        volumenIts :  $('#lts').val(),
        volumenBbls : $('#bbls').val(),
        fechaMuestreo : $('#FM').val(),
        fehcaOR : $('#FOR').val(),
        fechaED : $('#FED').val(),
        fechaAnalisis : $('#FA').val(),
        Producto : $('#Producto').val(),
        nRegistro : $('#nRegistro').val(),
        Objeto : $('#Objeto').val(),
        id:  $("#fPDFTask").attr('data-id')
   }
   console.log(data);
    $.post("/VistaPrueba/create/pdfTask",{data:data}, function( data ) {
        $('.btnImprimir').attr('name','1')
        alert('Se termino la tarea con exito')
        location.reload();
    })
})