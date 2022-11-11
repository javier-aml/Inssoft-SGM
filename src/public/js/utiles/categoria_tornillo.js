categoria();
function categoria() {
    $.post("/utiles/show/categoria", function( data ) {

        let text = "";
        let indexEstado = 0;
        text+=`        <div class="row offset-md-2  col-md-10">`;
        for (let index = 0; index < data.length; index++) {
           if (indexEstado != 4) {
            text+=`               <div class="card col-2 m-3 " style="width: 18rem;">
            <div class="card-body ">
              <h5 class="card-title">Tornilleria </h5>
              <h6 class="card-subtitle mb-2 text-muted">Categoria</h6>
              <p class="card-text"><h2>${data[index].categoria}</h2></p>
              <button type="button" class="btn btn-outline-primary btnCategoria" id="${data[index].categoria}" >Seleccionar</button>
            </div>
          </div>`
           } else {
               text+="</div>"
               text+=`        <div class="row offset-md-2  col-md-10">`;
               text+=`               <div class="card col-2 m-3 " style="width: 18rem;">
               <div class="card-body ">
               <h5 class="card-title">Tornilleria </h5>
               <h6 class="card-subtitle mb-2 text-muted">Categoria</h6>
               <p class="card-text"><h2>${data[index].categoria}</h2></p>
               <button type="button" class="btn btn-outline-primary btnCategoria" id="${data[index].categoria}" >Seleccionar</button>
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
$("#lista-productos").on("click",".btnCategoria",function(){
  const id = $(this).attr("id");
  window.location.href=`/utiles/categoria/tornillerias/${id}`

})