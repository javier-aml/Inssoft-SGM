// sign-out
$("#sign-out-Ekide").on('click',function(){
     $.post("/Ekide/ekide/signout", function( data ) {
        window.location.replace("/");
     })
})