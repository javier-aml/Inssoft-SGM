$("#remision").on("click",function(){
    $.post("/almacen/check/remision", function( datos ) {
        $("#body-remision").empty();
let text = ""
        for (const key in datos) {
            let text2 = "";
            const dPedidos = datos[key].nQR
            for (let index = 0; index < dPedidos.length; index++) {
                text2 += `                        <div class="mb-1">
                        <div class="row">
                        <label  class="form-label">${dPedidos[index]}</label>
                        </div>
                        </div>`;
                
            }
            text += `<div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ${datos[key].name.nombre_remision}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="container-fluid">
                    ${text2}
                    <button type="button" value="${datos[key].name.nombre_remision}" class="remision btn btn-ekide btn-sm btnTableSave waves-effect waves-light">Ver Remisión</button>
                </div>
            </div>
            </div>`;
            text += ``
        }
        $("#body-remision").append(text)
});
})
