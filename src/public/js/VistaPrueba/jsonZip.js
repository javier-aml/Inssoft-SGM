$("#jsonDiario").on('click',function(){
    let url = window.location.href;
    url = url.split('Diario') 
    console.log(url);
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

// hideLoader()
$("#ExcelDiario").on('click',function(){
    // ShowLoader()
    let url = window.location.href;
    url = url.split('Diario') 
    console.log(url);
    url = url[1];
    window.open(`Download/ExcelDiario${url}`);
        // $.post(`Excel/Diario${url}`, function( data ) {
        //     hideLoader()
        // });
})
$( document ).ready(function() {
    let date = window.location.href.split('/')
    date = date[5] 
    date = date.split("-")
    $('#dia').val(date[2])
    $('#mes').val(date[1])
    $('#ano').val(date[0])

    $(".detalleFactura").on('click',function(){
        const id = $(this).attr("id")
        $.post(`json/modalCompra`,{id:$(this).attr("id")}, function( data ) {

            $("#RFCEmisor" ).html(`${data.RFCEmisor}`)
            $("#Emisor").html(`${data.Emisor}`)
            $("#RegimenFiscal" ).html(`${data.RegimenFiscal}`)
            $("#RFCReceptor" ).html(`${data.RFCReceptor}`)
            $("#Receptor").html(`${data.Receptor}`)
            $("#RegimenFiscalReceptor" ).html(`${data.RegimenFiscalReceptor}`)
            $("#DomicilioFiscalReceptor").html(`${data.DomicilioFiscalReceptor}`)
            $("#UsoCFDI" ).html(`${data.UsoCFDI}`)
            $("#Estatus" ).html(`${data.Estatus}`)
            $("#FechaEmision").html(`${data.FechaEmision}`)
            $("#Emision" ).html(`${data.Emision}`)
            $("#FullDate").html(`${data.FullDate}`)
            $("#Subtotal" ).html(`${data.Subtotal}`)
            $("#Descuento").html(`${data.Descuento}`)
            $("#Total" ).html(`${data.Total}`)
            $("#UUID").html(`${data.UUID}`)
            $("#Tipocomprobante" ).html(`${data.Tipocomprobante}`)
            $("#Unidad").html(`${data.Unidad}`)
            $("#Cantidad").html(`${data.Cantidad}`)
            $("#Descripcion" ).html(`${data.Descripcion}`)
            $("#Valorunitario").html(`${data.Valorunitario}`)
            $("#ImporteConcepto" ).html(`${data.ImporteConcepto}`)
            $("#DescuentoConcepto").html(`${data.DescuentoConcepto}`)
            // $("#NoIdentificacion" ).html(`${data.NoIdentificacion}`)
            $("#NoIdentificacion" ).html(`${data.NoIdentificacion}`)
            $("#ClaveSAT").html(`${data.ClaveSAT}`)
            $("#ImporteImpuesto" ).html(`${data.ImporteImpuesto}`)
            $("#Impuesto").html(`${data.Impuesto}`)
            $("#TasaOCuota" ).html(`${data.TasaOCuota}`)
            $("#Emisor" ).html(`${data.Emisor}`)
            $("#Receptor").html(`${data.Receptor}`)
            $("#Moneda" ).html(`${data.Moneda}`)
            $("#LugarExpedicion" ).html(`${data.LugarExpedicion}`)
            $("#VersionCFDI").html(`${data.VersionCFDI}`)
            $("#Fechacompleta" ).html(`${data.Fechacompleta}`)
            $("#TotalMXN").html(`${data.TotalMXN}`)

    
        });
        $(".borrarjsonCompra").attr("id",id)
    })

    $(".detalleFacturaVenta").on('click',function(){
        const id = $(this).attr("id")
        $.post(`json/modalVenta`,{id:id}, function( data ) {
          
            $("#VRFCEmisor" ).html(`${data.RFCEmisor}`)
            $("#VEmisor").html(`${data.Emisor}`)
            $("#VRegimenFiscal" ).html(`${data.RegimenFiscal}`)
            $("#VRFCReceptor" ).html(`${data.RFCReceptor}`)
            $("#VReceptor").html(`${data.Receptor}`)
            $("#VRegimenFiscalReceptor" ).html(`${data.RegimenFiscalReceptor}`)
            $("#VDomicilioFiscalReceptor").html(`${data.DomicilioFiscalReceptor}`)
            $("#VUsoCFDI" ).html(`${data.UsoCFDI}`)
            $("#VEstatus" ).html(`${data.Estatus}`)
            $("#VFechaEmision").html(`${data.FechaEmision}`)
            $("#VEmision" ).html(`${data.Emision}`)
            $("#VFullDate").html(`${data.FullDate}`)
            $("#VSubtotal" ).html(`${data.Subtotal}`)
            $("#VDescuento").html(`${data.Descuento}`)
            $("#VTotal" ).html(`${data.Total}`)
            $("#VUUID").html(`${data.UUID}`)
            $("#VTipocomprobante" ).html(`${data.Tipocomprobante}`)
            $("#VUnidad").html(`${data.Unidad}`)
            $("#VCantidad").html(`${data.Cantidad}`)
            $("#VDescripcion" ).html(`${data.Descripcion}`)
            $("#VValorunitario").html(`${data.Valorunitario}`)
            $("#VImporteConcepto" ).html(`${data.ImporteConcepto}`)
            $("#VDescuentoConcepto").html(`${data.DescuentoConcepto}`)
            // $("#VNoIdentificacion" ).html(`${data.NoIdentificacion}`)
            $("#VNoIdentificacion" ).html(`${data.NoIdentificacion}`)
            $("#VClaveSAT").html(`${data.ClaveSAT}`)
            $("#VImporteImpuesto" ).html(`${data.ImporteImpuesto}`)
            $("#VImpuesto").html(`${data.Impuesto}`)
            $("#VTasaOCuota" ).html(`${data.TasaOCuota}`)
            $("#VEmisor" ).html(`${data.Emisor}`)
            $("#VReceptor").html(`${data.Receptor}`)
            $("#VMoneda" ).html(`${data.Moneda}`)
            $("#VLugarExpedicion" ).html(`${data.LugarExpedicion}`)
            $("#VVersionCFDI").html(`${data.VersionCFDI}`)
            $("#VFechacompleta" ).html(`${data.Fechacompleta}`)
            $("#VTotalMXN").html(`${data.TotalMXN}`)
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

        $.post(`json/borrarVenta`,{id:$(this).attr("id")}, function( data ) {
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

        $.post(`json/borrarCompra`,{id:$(this).attr("id")}, function( data ) {
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
            let url = window.location.href.split('Diario') 
            url = `${url[0]}Diario/${ano}-${mes}-${dia}`
            window.location.replace(url);
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


