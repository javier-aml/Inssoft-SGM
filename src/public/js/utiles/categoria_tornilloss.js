categoria();
function categoria() {
    const href = window.location.href;
    console.log(href);
    const split = href.split("/")
    const categoria = split[split.length - 1]
    $.post("/utiles/show/categoria/tornillos/"+categoria, function( data ) {

        let text = "";
        let indexEstado = 0;
        let cantidad = 0;
        text+=`        <div class="row offset-md-2  col-md-10">`;
        for (let index = 0; index < data.length; index++) {
            console.log(data[index].cantidad == null);
            if (data[index].cantidad == null) {
                cantidad = 0
            }else{
                cantidad = data[index].cantidad;
            }
           if (indexEstado != 4) {
            text+=`               <div class="card col-2 m-3 " style="width: 18rem;">
            <div class="card-body ">
              <h5 class="card-title">${data[index].categoria} </h5>
              <h6 class="card-subtitle mb-2 text-muted">${data[index].nParte}</h6>
              <h7 class="card-subtitle mb-2 text-muted" hidden>${data[index].id}</h7>
              <p class="card-text"><h3>${data[index].nombre}</h3></p>
              <p class="card-text"><h4>Cantidad disponible:${data[index].Total}</h4></p>
              <p class="card-text"><h5>Paquetes disponibles en almacen: ${Math.floor(cantidad)}</h5></p>
              <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Cantidad:</span>
              <input type="number" min="0" oninput="this.value = 
              !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" onkeydown="if(event.key==='.'){event.preventDefault();}" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
              </div>
              <button type="button" class="btn btn-outline-primary agregar-carrito" id="${data[index].id}" data-id="${data[index].id}" >Agregar a carrito</button>
            </div>
          </div>`
           } else {
               text+="</div>"
               text+=`        <div class="row offset-md-2  col-md-10">`;
               text+=`               <div class="card col-2 m-3 " style="width: 18rem;">
               <div class="card-body ">
               <h5 class="card-title">${data[index].categoria}</h5>
               <h6 class="card-subtitle mb-2 text-muted">${data[index].nParte}</h6>
               <h7 class="card-subtitle mb-2 text-muted" hidden>${data[index].id}</h7>
               <p class="card-text"><h3>${data[index].nombre}</h3></p>
               <p class="card-text"><h4>Cantidad disponible:${data[index].Total}</h4></p>

               <p class="card-text"><h5>Paquetes disponibles en almacen: ${Math.floor(cantidad)}</h5></p>
               <div class="input-group input-group-sm mb-3">
               <span class="input-group-text" id="inputGroup-sizing-sm">Cantidad:</span>
               <input type="number" min="0" onkeydown="if(event.key==='.'){event.preventDefault();}"  oninput="this.value = 
               !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
               </div>
               <a class="btn btn-outline-primary agregar-carrito" id="${data[index].id}" data-id="${data[index].id}" >Agregar a carrito</a>
               </div>
             </div>`
               indexEstado = 0
           }

            indexEstado++;
        }
        text+="</div>"
        $("#lista-productos").empty();
        $("#lista-productos").append(text);
    })
}