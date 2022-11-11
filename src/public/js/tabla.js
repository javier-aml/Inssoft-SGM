
                  //   let form = document.querySelector('#formImg')

                  // form.addEventListener('submit', (e) => {
                  //   e.preventDefault();
                  //   oData = new FormData(document.forms.namedItem("fileinfo"));
                  //    $.ajax({
                  //     url: './img/img',
                  //     type: 'POST',
                  //     datatype: 'json',
                  //     processData: false,
                  //     contentType: false,
                  //     data: oData,
                  //     success: (response) => {
                  //         console.log(response);
                  //         $("#saveModal").prop('disabled', false);
                  //     },
                  //     error: (error) => {
                  //         console.log(error.message);
                  //     }
                  // })
                    
                  // })    
let checkboxIndex = 0;
let trueCheck = 0;
$(".checkbox").each(function(index){


  if (this.checked) {
    trueCheck++;

    if (trueCheck == 3) {
      $("#botonModal").prop('disabled', false);
    }
  }
  if (checkboxIndex%3==0 && checkboxIndex != 0) {
    trueCheck=0
    checkboxIndex=0;
  }
  checkboxIndex++;
})            
$('.checkbox').change(function () {
  $("#botonModal").prop('disabled', false);
  if (this.checked) {
    const attrId = $(this).attr("id");
    const arrayId = attrId.split("_");
    const id = arrayId[1];
    if ($(`#check_${id}`).is(':checked')) {
      $("#botonModal").prop('disabled', false);
    }
  } else {

    // if (!unCheck()) {
    //   $("#botonModal").prop('disabled', true);
    // }
  }
});
$("#botonModal").on("click", modal);

function modal() {

  $("#tableBody").empty();
  let cantidad = $('.checkbox').length;
  let modalText = "";
  let indexModal = 0;
  for (let index = 0; index < cantidad; index++) {
    if ($(`#check_${index}`).is(':checked') ) {
        const nParte = $(`#nParte_${index}`).html()
        const proyecto = $(`#proyecto_${index}`).html()
        const cantidadEscrita = $(`#Cantidad_${index}`).val();
      const pdt = $(`#Pdt_${index}`).text();
      const pedido = $(`#Pedido_${index}`).text();
      modalText += `<tr>  <th><input id="proyecto" type="hidden" value="${proyecto}"></th>
                          <th><input id="nPartes" type="hidden" value="${nParte}"></th>
                          <th scope="row">${indexModal+1}</th>
                          <td class="pedido" > ${pedido}</td>
                          <td class="cantidad"><input class="form-control" value="${cantidadEscrita}" id="cantidad" max ="${pdt}" type="number"></input> </td>
                          <td class="caduco" > <input class="form-check-input"  id="Caduco" type="checkbox" value="1"></td>
                          <td class="fecha" ><input class="form-control" id="fecha"  type="date"></input> </td>
                          <td class="remision" style="display: none"><input class="form-control" id="remision"  type="text"></input> </td>

                           <td style="display: none">
                            <a href="#!"> 
                            <i class="fas fa-times fa-3x"></i>
                             </a>
                            </td>
                          </tr>`;
      indexModal++;
      /**
       *                           <td class="cantidad"><input class="form-control" id="remision"  type="text"></input> </td>
       *                  <td class="cantidad"><input class="form-control" id="fecha"  type="date"></input> </td>
       *                 <td>
                            <a href="#!">
                              <i class="fas fa-times fa-3x"></i>
                            </a>
                          </td>
       */
    }

  }

  $("#tableBody").append(modalText);



}

$("#saveModal").on('click', postTable);
$('input[type=file]').change(function () {
});
function postTable() {
  let datos = [];
  let index = 0;
  let id = $("#id").html();
  $("#tableBody").find("tr").each(function () {
    let field1 = $(this).find('td.pedido').html();
    let field2 = $(this).find('#cantidad').val();
    let field3 = $(this).find('#nPartes').val();
    let field4 = $(this).find(`#proyecto`).val();
    let field6 = $(this).find(`#Caduco`).is(':checked');

    let field7 = $(this).find('#fecha').val();

  
    let field5 = $('#id').html();
    let data = {
      "nPartes":field3,
      "proyecto":field4,
      "pedido": field1,
      "cantidad": field2,
      "cPedido":field5,
      "Caduco":field6,
      "fecha":field7,
    };

    index++
    datos.push(data);


  });
  $.post(`./${id}/qr`, {'data': datos}, function( data ) {
      if (data) {
        $.post(`./${id}`, {'data': datos}, function( data ) {
          // ('#exampleModal').
          $("input:checkbox").prop('checked',"");
          //window.open("../download/file");
     
      });
      }
    // ('#exampleModal').
});

// $.post(`./${id}`, {'data': datos}, function( data ) {
//     console.log(data);
//     // ('#exampleModal').
// });
    alert("Correo Enviado");
};

function unCheck() {
  const checks = $(".checkbox");
  var index = 0;
  var count = 0;
  var seguidos = 0;
  var value = false;
  $(".checkbox").each(function () {
    if (this.checked) {
      count++
    }
    if (count == 3) {
      value = true
    }
    if (seguidos > 4) {


      count = 0;
      seguidos = 0;

    }
    seguidos++;
    index++;

  });
  return value
}

$(".btnTableSave").on("click", function(){
  const attrId = $(this).attr("id");
 let btnSave = $('#modalSaveBtn');
 btnSave.attr('name',attrId);
});

// $("#modalSaveBtn").on("click", function(){
//   const id = $(this).attr("name");
//   let materiales = $(`#Materiales_${id}`).prop( "checked" ); 
//   let proceso = $(`#Proceso_${id}`).prop( "checked" );
//   let entrega = $(`#Entrega_${id}`).prop( "checked" );
//   const nParte =  $(`#nParte_${id}`).html()
//   const codigoP = $(`#id`).html()
  
//     if (materiales == true) {
//       materiales = 1;
//     }
//      else {
//       materiales = 0;
//     }
//     if (proceso == true) {
//       proceso = 1;
//     }
//      else {
//       proceso = 0;
//     }
//     if (entrega == true) {
//       entrega = 1;
//     }
//      else {
//       entrega = 0;
//     }  

//   $.post(`./${codigoP}/checkbox`,{
//     id: id,
//     materiales:materiales,
//     proceso:proceso,
//     entrega:entrega,
//     nParte:nParte
//   } , function( data ) {
//     alert("Se guardo");
//     // ('#exampleModal').
// });
// });

$( ".checkbox" ).each(function( index ) {
  if (this.checked) {
    $(this).attr("disabled", true);
  }
});