// var myModal = document.getElementById('myModal')
// var modal = bootstrap.Modal.getInstance(myModal) 
// console.log(modal) // null

// $("#TerminosCondiciones").modal("show");
$("#tc").on("click",function(){


    $.post("proveedor/TC")

})

