$("#btnDanado").on('click',function() {
    const id = $("#cPedidos").html();
    $.post("/Ekide/proveedor/danado",{"cPedido":id}, function( data ) {
      $("#content-body").empty()
      let text = "";
      if (data.length != 0) {
        for (let index = 0; index<data.length;index++) {
          
          text += `<tr>  
          <td class="text-center usuario" > ${data[index].Usuario}</td>
          <td class="text-center acces" > ${data[index].Acces}</td>
          <td class="text-center Fecha" > ${data[index].Fecha}</td>
          <td class="text-center nTicket" > ${data[index].nTicket}</td>
          <td class="text-center reclamo" > ${data[index].reclamo}</td>
          <td class="text-center dPedido" > ${data[index].dPedido}</td>
          <td class="text-center cDanado" > ${data[index].cDanado}</td>
          </tr>`;
        }
      } else {
        text+= `<th colspan="6" class="text-center">No se encuentra Tickets de este tipo</th>`;
      }
       $("#content-body").append(text);
      // ('#exampleModal').
  });
  })
  
  $("#btnMalIdentificado").on('click',function() {
    const id = $("#cPedidos").html();
    $.post("/Ekide/proveedor/malIdentificado",{"cPedido":id}, function( data ) {
      $("#content-body").empty();
      let text = "";
      if (data.length != 0) {
        for (let index = 0; index<data.length;index++) {
          text += `<tr>  
          <td class="text-center usuario" > ${data[index].Usuario}</td>
          <td class="text-center acces" > ${data[index].Acces}</td>
          <td class="text-center date" > ${data[index].date}</td>
          <td class="text-center nTicket" > ${data[index].nTicket}</td>
          <td class="text-center dPedido" > ${data[index].dPedido}</td>
          <td class="text-center reclamo" > ${data[index].reclamo}</td>
          <td class="text-center cDanado" > ${data[index].cDanado}</td>
          </tr>`;
        }
      } else {
        text+= `<th colspan="6" class="text-center">No se encuentra Tickets de este tipo</th>`;
      }

      $("#content-body").append(text);
  });
  })
  $("#search").keyup(function(){
    _this = this;
    // Show only matching TR, hide rest of them
    $.each($("#mytable tbody tr"), function() {
    if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
    $(this).hide();
    else
    $(this).show();
    });
    });