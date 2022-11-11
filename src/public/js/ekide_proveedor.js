$("#btnNombre").on('click',function() {
  $.post("/Ekide/proveedor/nombre", function( data ) {
    $("#content").empty();
    let text = "";
    for (const key in data) {
      text += `<a class="card-content-gen fstCap ml-xl-5 my-2 my-md-1" href="/Ekide/proveedor/nombre/${key}">${key}</a>`;
    }
    $("#content").append(text);
    $("#title").html("Proveedores")
    // ('#exampleModal').
});
})

$("#btnProyecto").on('click',function() {
  $.post("/Ekide/proveedor/nombre/proyecto", function( data ) {
    $("#content").empty();
    let text = "";
    for (const key in data) {
      text += `<a class="card-content-gen fstCap ml-xl-5 my-2 my-md-1" href="/Ekide/proveedor/nombre/proyecto/${key}">${key}</a>`;
    }
    $("#content").append(text);
    $("#title").html("Proyectos")
    // ('#exampleModal').
});
})