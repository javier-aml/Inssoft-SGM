$(document).ready(function() {

    $("#addTask").on('click',function(){
        const position = $(".highligth img").attr("class")
        let nombre = $(".highligth").parent().html();
        nombre = nombre.split('</i>')
        nombre = nombre[1]
        $('#ubicacionTask').val(nombre)
        $('.btnAddTask').attr('id',position)

    })
    $(".btnAddTask").on('click',function(){
        const position = $('.btnAddTask').attr('id')
        const name = $('#nameTask').val()
        const date = $('#dateTask').val()
        const task = $('#ubicacionTask').val()
        console.log(position);
        console.log(name);
        console.log(date);
       
        var data = new FormData($('#taskAdd')[0]);
        console.log(data);
        var filename = '';
        $.ajax({
            url:'/VistaPrueba/addTask',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function(res){
                console.log('succes');
                console.log(res);
                $.post("/VistaPrueba/add/task",{position:position,name:name,date:`${date}`,fileName:res,task:task}, function( data ) {
                    alert('Se agrego correctamente el archivo');
                })
            },
            error: function(){
                alert('Error: In sending the request!');
            }
        })

    })
});