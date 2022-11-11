$("#modalSaveBtn").on("click",function(){
    let nQR = [];
        $('input[type=checkbox]:checked').each(function() {
            let text =  $(this).prop("id");
            let split = text.split("_");
            let id = split[1];
            let nQRs = $("#nQR_" + id).html();
            nQR.push(nQRs)
        });   
        // const form = $("#form_file");
        // const data = new FormData(form[0]);
        var data = new FormData($('#form_file')[0]);
        $.ajax({
            url:'../add/remision',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function(res){
                const datos = {
                    'nQR':nQR,
                    filename:res
                }
                $.post("../add/nqr_remision",datos, function( data ) {

                });
            },
            error: function(){
                alert('Error: In sending the request!');
            }
        })

    })