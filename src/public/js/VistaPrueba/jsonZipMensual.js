$("#jsonDiario").on('click',function(){
    let url = window.location.href;
    url = url.split('Mensual') 
    url = url[1];
    window.open(`Download/ZipDiario${url}`);
    // $.post(`Download/ZipDiario`, function( data.aaaaaaaaa ) {
       
    
    // });
})
$("#jsonMensual").on('click',function(){
    let url = window.location.href;
    url = url.split('Mensual') 
    url = url[1];
    window.open(`Download/ZipMensual${url}`);
    // $.post(`Download/ZipDiario`, function( data.aaaaaaaaa ) {
       
    
    // });
})
$( document ).ready(function() {
    let date = window.location.href.split('/')
    date = date[5] 
    date = date.split("-")
    // $('#dia').val(date[2])
    $('#mes').val(date[1])
    $('#ano').val(date[0])

    $(".detalleFactura").on('click',function(){
        const id = $(this).attr("id")
        $.post(`json/modalCompraMensual`,{id:$(this).attr("id")}, function( data ) {

            $("#RFCEmisor" ).html(`${data.RFCEmisor}`)
            $("#Emisor").html(`${data.Emisor}`)
            $("#RegimenFiscal" ).html(`${data.RegimenFiscal}`)
            $("#LugarExpedicion").html(`${data.LugarExpedicion}`)
            $("#RFCReceptor" ).html(`${data.RFCReceptor}`)
            $("#Receptor").html(`${data.Receptor}`)
            $("#RegimenFiscalReceptor" ).html(`${data.RegimenFiscalReceptor}`)
            $("#DomicilioFiscalReceptor").html(`${data.DomicilioFiscalReceptor}`)
            $("#UsoCFDI" ).html(`${data.UsoCFDI}`)
            $("#Exportacion").html(`${data.Exportacion}`)
            $("#Estatus" ).html(`${data.Estatus}`)
            $("#FechaEmision").html(`${data.FechaEmision}`)
            $("#Emision" ).html(`${data.Emision}`)
            $("#FullDate").html(`${data.FullDate}`)
            $("#SerieFolio" ).html(`${data.SerieFolio}`)
            $("#Serie").html(`${data.Serie}`)
            $("#Folio").html(`${data.Folio}`)
            $("#Subtotal" ).html(`${data.Subtotal}`)
            $("#Descuento").html(`${data.Descuento}`)
            $("#IVA" ).html(`${data.IVA}`)
            $("#ISR").html(`${data.ISR}`)
            $("#IEPS" ).html(`${data.IEPS}`)
            $("#TASAIVA").html(`${data.TASAIVA}`)
            $("#TASAISR" ).html(`${data.TASAISR}`)
            $("#TASAIEPS").html(`${data.TASAIEPS}`)
            $("#Total" ).html(`${data.Total}`)
            $("#UUID").html(`${data.UUID}`)
            $("#Tipocomprobante" ).html(`${data.Tipocomprobante}`)
            $("#Unidad").html(`${data.Unidad}`)
            $("#ClaveUnidad" ).html(`${data.ClaveUnidad}`)
            $("#Cantidad").html(`${data.Cantidad}`)
            $("#Descripcion" ).html(`${data.Descripcion}`)
            $("#Valorunitario").html(`${data.Valorunitario}`)
            $("#ImporteConcepto" ).html(`${data.ImporteConcepto}`)
            $("#DescuentoConcepto").html(`${data.DescuentoConcepto}`)
            // $("#NoIdentificacion" ).html(`${data.NoIdentificacion}`)
            $("#NoIdentificacion" ).html('No registrado')
            $("#ClaveSAT").html(`${data.ClaveSAT}`)
            $("#ObjetoIMP" ).html(`${data.ObjetoIMP}`)
            $("#DescripcionSAT").html(`${data.DescripcionSAT}`)
            $("#ImporteImpuesto" ).html(`${data.ImporteImpuesto}`)
            $("#Impuesto").html(`${data.Impuesto}`)
            $("#TasaOCuota" ).html(`${data.TasaOCuota}`)
            $("#TipoFactor").html(`${data.TipoFactor}`)
            $("#Emisor" ).html(`${data.Emisor}`)
            $("#Receptor").html(`${data.Receptor}`)
            $("#Moneda" ).html(`${data.Moneda}`)
            $("#TipoCambio").html(`${data.TipoCambio}`)
            $("#TASAIMP_LOCAL_T" ).html(`${data.TASAIMP_LOCAL_T}`)
            $("#IMP_LOCAL_T").html(`${data.IMP_LOCAL_T}`)
            $("#LugarExpedicion" ).html(`${data.LugarExpedicion}`)
            $("#VersionCFDI").html(`${data.VersionCFDI}`)
            $("#Fechacompleta" ).html(`${data.Fechacompleta}`)
            $("#TotalMXN").html(`${data.TotalMXN}`)

    
        });
        $(".borrarjsonCompra").attr("id",id)
    })

    $(".detalleFacturaVenta").on('click',function(){
        const id = $(this).attr("id")
        $.post(`json/modalVentaMensual`,{id:id}, function( data ) {
            console.log(data);
            $("#Voucher").html(data.Voucher)
            $("#FolioV").html(data.Folio)
            $("#Tipo").html(data.Tipo)
            $("#EstatusV").html(data.Estatus)
            $("#Cliente").html(data.Cliente)
            $("#Fecha").html(data.Fecha)
            $("#FechaVencimiento").html(data.FechaVencimiento)
            $("#SubtotalV").html(data.Subtotal)
            $("#IvaV").html(data.Iva)
            $("#Monto").html(data.Monto)
            $("#Interes").html(data.Interes)
            $("#MonedaV").html(data.Moneda)
            // $("#Atraso").html(data.Atraso)
            $("#Atraso").html('No registrado')
            $("#PorVencer").html(data.PorVencer)
            // $("#Observaciones").html(data.Observaciones)
            $("#Observaciones").html('No registrado')
            $("#CantidadV").html(data.Cantidad)
            $("#OrdendeCompra").html(data.OrdendeCompra)
            $("#Producto").html(data.Producto)
            $("#UUIDV").html(data.UUID)
            $("#Source_name").html(data.Source_name)
            $(".borrarjsonVenta").attr("id",id)
        });
      
    })
    $(".borrarjsonVenta").on('click',function(){
        $('.modal-backdrop').remove();
        $('#VentaDetallado').modal('toggle');
        $('<div class="modal-backdrop fade show"></div>').appendTo(document.body);

        $(".borrarjsonVentaSure").attr("id",$(".borrarjsonVenta").attr("id"))
        $(".bodyvender").html(`¿Estas seguro de omitir este elemento "${$("#Voucher").html()}" ?`)
        
    })
    $(".borrarjsonVentaSure").on('click',function(){

        $.post(`json/borrarVentaMensual`,{id:$(this).attr("id")}, function( data ) {
            $(document.body).find('.modal-backdrop').remove();
            $("#VentaBorrar").modal('toggle');
            $('#bodyVentaTable').empty();

            alert("Se a omitido con exito")
            let text = ''
            for (const key in data) {
               text+= ` <tr class="detalleFacturaVenta" id="${key}" data-bs-toggle="modal" data-bs-target="#VentaDetallado">
                    <th>${data[key].Voucher}</th>
                    <th>${data[key].Folio}</th>
                    <th>${data[key].Cliente}</th>
                    <th>${data[key].Estatus}</th>
                    <th>${data[key].Fecha}</th>
                    <th>${data[key].OrdendeCompra}</th>
                    <th>${data[key].Producto}</th>
                    <th>${data[key].Cantidad}</th>
                    <th>${data[key].Moneda}</th>
                    <th>${data[key].Monto}</th>
                </tr>`
            }
            $('#bodyVentaTable').append(text);
        })
    })
    $(".btnCancelarBorrar").on('click',function(){
        $(document.body).find('.modal-backdrop').remove();
    })
    $(".borrarjsonCompra").on('click',function(){
        $('.modal-backdrop').remove();
        $('#compraDetallado').modal('toggle');
        $('<div class="modal-backdrop fade show"></div>').appendTo(document.body);
        
        $(".borrarjsonCompraSure").attr("id",$(".borrarjsonCompra").attr("id"))
        $(".bodyComprar").html(`¿Estas seguro de omitir este elemento "${$("#SerieFolio").html()}" ?`)
        
    })
    $(".borrarjsonCompraSure").on('click',function(){

        $.post(`json/borrarCompraMensual`,{id:$(this).attr("id")}, function( data ) {
            $(document.body).find('.modal-backdrop').remove();
            $("#CompraBorrar").modal('toggle');
            alert("Se a omitido con exito")
            let text = ''
            $('#bodyCompraTable').empty();
            for (const key in data) {
                text += `
                <tr class="detalleFactura" id="${key}" data-bs-toggle="modal" data-bs-target="#compraDetallado">
                <th>${data[key].RFCEmisor}</th>
                <th>${data[key].Emisor}</th>
                <th>${data[key].RFCReceptor}</th>
                <th>${data[key].Receptor}</th>
                <th>${data[key].Fechacompleta}</th>
                <th>${data[key].Descripcion}</th>
                <th>${data[key].DescripcionSAT}</th>
                <th>${data[key].Cantidad}</th>
                <th>${data[key].Moneda}</th>
                <th>${data[key].Total}</th>
                <th>${data[key].TotalMXN}</th>

            </tr>
                `
            }
            $('#bodyCompraTable').append(text);
        })
    })
    $(".btnCancelarBorrarCompra").on('click',function(){
        $(document.body).find('.modal-backdrop').remove();
    })
    $(".btn-close").on('click',function(){
        $(document.body).find('.modal-backdrop').remove();
    })
    $("#cambiarFecha").on('click',function(){
        const dia = parseInt($('#dia').val())
        const mes = parseInt($('#mes').val())
        const ano = $('#ano').val()
        if((dia> 0 && dia < 32) &&(mes> 0 && mes < 13) && (ano.length == 2 || ano.length == 4)){

            alert("Cambio de fecha realizado")
        }else{
            alert("formato de fecha incorrecto")
        }
        
    })

    lts()
    function lts() {
        const lts = $("#totalLTS").val().replaceAll(',','')
        console.log(lts);
        if (lts > 0) {
            console.log("a");
            $("#totalLTS").addClass('is-invalid')
        }
    }
});


console.log("test");