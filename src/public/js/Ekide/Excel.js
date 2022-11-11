
$("#generarExcel").on('click',function(params) {
    const form = $("#formExcel");
    const data = $(form).serialize()
    $.post(`/Ekide/Generar/Excel`, data, function( data ) {
        window.open('/Ekide/Mostrar/Excel');
    });
})
