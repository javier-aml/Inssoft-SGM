$("#bTC").on('click', () => {
    console.log("AS");
    $.post( "./proveedor/TC", function( data ) {
        console.log(data);
    });
})