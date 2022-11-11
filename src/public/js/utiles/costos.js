$("#addCosto").on("click",function(){
    const form = $("#formCosto").serialize();
    $.post("/utiles/add/Costos",form, function( data ) {


    })
    console.log(form);
})