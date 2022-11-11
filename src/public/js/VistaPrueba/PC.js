$("#modalSaveBtn").on("click",function(){
 
        // const form = $("#form_file");
        // const data = new FormData(form[0]);
        var data = new FormData($('#form_file')[0]);
        $.ajax({
            url:'/almacen/add/pc',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function(res){
                if (res == true) {
                    $("#succes").empty()
                    $("#succes").append("Se realizo correctamente la operacion.")
                }else{
                    $("#succes").empty()
                    $("#succes").append("Porfavor ingrese un archivo de excel para funcionar.")
                }
                // $.post("/almacen/add/pc", function( data ) {

                // });
            },
            error: function(){
                alert('Error: In sending the request!');
            }
        })

})
$("#UC").on("click",function(){
    $.post("/almacen/changeToUC", function( data ) {
        location.reload();

    })
})
$("#IF").on("click",function(){
    $.post("/almacen/changeToIF", function( data ) {
        location.reload();
  
    })
})