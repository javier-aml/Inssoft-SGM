$("#btnJson").on('click',function(){

    var data = new FormData($('#json')[0]);
    $.ajax({
        url:'/VistaPrueba/create/json',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){

        }
    })
})

$('[data-toggle="tooltip"]').tooltip();