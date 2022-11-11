// sign-out
$("#sign-out-proveedor").on('click',function(){
    $.post("/proveedor/signout", function( data ) {
       window.location.replace("/");
    })
})