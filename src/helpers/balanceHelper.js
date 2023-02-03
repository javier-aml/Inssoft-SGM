module.exports.getInvoices = async (rfc, fechaInicio, fechaFin, type = 'C') => {
    let allInvoices = [];

    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    try {
        let pageIndexCompra = 1
        let length = 1;
        let acumuladoMXN = 0;
        let acumuladoLTS = 0;

        while (length > 0) {
            const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=
                ${fechaFin}T06:00:00.000Z&issuedAt[after]=
                ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=
                ${pageIndexCompra}&itemsPerPage=100&type=I`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
                },
            })

            const data = await response.json();
            const invoices = data['hydra:member']
            //const totalItems = data['hydra:totalItems']

            for (const key in invoices) {
              const res = invoices[key]
              
              if (res.items[0] != undefined ) {
                if (res.items[0].unitCode == 'LTR') {
                  let invoiceTotalMXN = 0;
                  if(res.currency == 'MXN'){
                    invoiceTotalMXN = res.issuer.rfc == 'PTI151101TE5' ? 
                    (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) : 
                    res.items[0].totalAmount
                  }
                  else
                  {
                    invoiceTotalMXN = (res.items[0].totalAmount * res.exchangeRate)
                  }

                  const invoice = {
                    rfcEmisor:res.issuer.rfc,
                    emisor:res.issuer.name,
                    regimenFiscal:res.issuer.taxRegime,
                    rfcReceptor:res.receiver.rfc,
                    receptor:res.receiver.name,
                    regimenFiscalReceptor:res.issuer.taxRegime,
                    domicilioFiscalReceptor:'11560',
                    usoCFDI:res.usage,
                    estatus:res.status,
                    fechaEmision:res.issuedAt,
                    subtotal:res.subtotal,
                    descuento:res.discount,
                    impuesto:res.tax,
                    total:res.total,
                    uuid:res.uuid,
                    tipoComprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                    unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                    cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                    descripcion:res.items[0] != undefined ? res.items[0].description : '',
                    valorUnitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                    importeConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                    descuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                    noIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                    claveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                    importeImpuesto:res.items[0] != undefined ? res.tax : '',
                    impuesto:res.items[0] != undefined ? res.tax : '',
                    moneda:res.currency,
                    versionCFDI:res.version,
                    fechaCompleta:res.issuedAt.substring(0, 10),
                    totalMXN: invoiceTotalMXN.toFixed(2),
                    tipoFactura: type == 'C' ? 'Compra' : 'Venta'
                  }

                  acumuladoMXN += parseFloat(invoice.totalMXN);
                  acumuladoLTS += parseFloat(invoice.cantidad);
                  allInvoices.push(invoice)
                  
                }//if unitcode == LTR

              }//if items != undefined
              
            }//for

            pageIndexCompra++;
            length = invoices.length
        }
        return {allInvoices, acumuladoMXN, acumuladoLTS}
    } catch(error){
        console.log(error)
        return [];
    }
}//encryptPassword

/*example('/MensualGlencore/:fecha', async (req, res) => {

  
  var pagIndexCompra = 1
  var pagIndexVenta = 1
  const compra = []
  const venta = []
 
  
  var request = require('request');
  // let temp;2022-10-25
  
  let fecha = req.params.fecha
  const fechasplit = fecha.split("-")
  if (fechasplit[1].length == 1) {
  
    fecha = `${fechasplit[0]}-0${fechasplit[1]}`
  }
  
  
  let tabla
  let totalMXNC
  let totalLTSC
  let fecha2 =fecha
  var pagIndexCompra =1
  let TotalMXN = 0.00;
  let TotalLTS = 0.00;
  let ApiLength= 10
  let indexCompra = 0;
  const jsonCompra = {}
  while (ApiLength > 0 && fecha2.indexOf(fecha) != -1) {
  console.log(fecha2.indexOf(fecha) != -1);
      var options = {
        'method': 'post',
        'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&receiver.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      pagIndexCompra++
  
      let fecha3;
      
    //15101505 == DISEL 
    //15101514 == 87 OCTANOS
    //15101515 == 91 OCTANOS
    
      await request(options, function (error, response) {
        if (error) throw new Error(error);
    
        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        ApiLength = temp.length
  
        for (const key in temp) {
          const res = temp[key]
          
          if (res.items[0] != undefined ) {
            if (res.items[0].unitCode == 'LTR') {
              
              if (res.currency == 'MXN') {
                if (res.issuer.rfc == 'PTI151101TE5') {
                  
                  const tabla = {
                    RFCEmisor:res.issuer.rfc,
                    Emisor:res.issuer.name,
                    RegimenFiscal:res.issuer.taxRegime,
                    RFCReceptor:res.receiver.rfc,
                    Receptor:res.receiver.name,
                    RegimenFiscalReceptor:res.issuer.taxRegime,
                    DomicilioFiscalReceptor:'11560',
                    UsoCFDI:res.usage,
                    Estatus:res.status,
                    FechaEmision:res.issuedAt,
                    FullDate:res.issuedAt.substring(0, 10),
                    Subtotal:res.subtotal,
                    Descuento:res.discount,
                    Impuesto:res.tax,
                    Total:res.total,
                    UUID:res.uuid,
                    Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                    Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                    Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                    Descripcion:res.items[0] != undefined ? res.items[0].description : '',
                    Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                    ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                    DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                    NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                    ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                    ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                    Impuesto:res.items[0] != undefined ? res.tax : '',
                    Moneda:res.currency,
                    VersionCFDI:res.version,
                    Fechacompleta:res.issuedAt.substring(0, 10),
                    TotalMXN:(res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
                  }
                TotalMXN += parseFloat(tabla.TotalMXN);
            
                TotalLTS += parseFloat(tabla.Cantidad);
                jsonCompra[indexCompra] = tabla
                compra[indexCompra] = dataExcel
                indexCompra++
                } else {
                
                  const tabla = {
                    RFCEmisor:res.issuer.rfc,
                    Emisor:res.issuer.name,
                    RegimenFiscal:res.issuer.taxRegime,
                    RFCReceptor:res.receiver.rfc,
                    Receptor:res.receiver.name,
                    RegimenFiscalReceptor:res.issuer.taxRegime,
                    DomicilioFiscalReceptor:'11560',
                    UsoCFDI:res.usage,
                    Estatus:res.status,
                    FechaEmision:res.issuedAt,
                    FullDate:res.issuedAt.substring(0, 10),
                    Subtotal:res.subtotal,
                    Descuento:res.discount,
                    Impuesto:res.tax,
                    Total:res.total,
                    UUID:res.uuid,
                    Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                    Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                    Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                    Descripcion:res.items[0] != undefined ? res.items[0].description : '',
                    Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                    ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                    DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                    NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                    ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                    ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                    Impuesto:res.items[0] != undefined ? res.tax : '',
                    Moneda:res.currency,
                    VersionCFDI:res.version,
                    Fechacompleta:res.issuedAt.substring(0, 10),
                    TotalMXN:(res.items[0].totalAmount)
                  }
                  // if (fecha3!=fecha) {
                  //   break;
                  // }
                   TotalMXN += parseFloat(tabla.TotalMXN);
              
                   TotalLTS += parseFloat(tabla.Cantidad);
                   jsonCompra[indexCompra] = tabla
                   compra[indexCompra] = dataExcel
                   indexCompra++
                }
              } else {
               
                const tabla = {
                  RFCEmisor:res.issuer.rfc,
                  Emisor:res.issuer.name,
                  RegimenFiscal:res.issuer.taxRegime,
                  RFCReceptor:res.receiver.rfc,
                  Receptor:res.receiver.name,
                  RegimenFiscalReceptor:res.issuer.taxRegime,
                  DomicilioFiscalReceptor:'11560',
                  UsoCFDI:res.usage,
                  Estatus:res.status,
                  FechaEmision:res.issuedAt,
                  FullDate:res.issuedAt.substring(0, 10),
                  Subtotal:res.subtotal,
                  Descuento:res.discount,
                  Impuesto:res.tax,
                  Total:res.total,
                  UUID:res.uuid,
                  Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                  Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                  Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                  Descripcion:res.items[0] != undefined ? res.items[0].description : '',
                  Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                  ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                  DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                  NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                  ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                  ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                  Impuesto:res.items[0] != undefined ? res.tax : '',
                  Moneda:res.currency,
                  VersionCFDI:res.version,
                  Fechacompleta:res.issuedAt.substring(0, 10),
                  TotalMXN:(res.items[0].totalAmount * res.exchangeRate)
                }
               
                 TotalMXN += parseFloat(tabla.TotalMXN);
            
                 TotalLTS += parseFloat(tabla.Cantidad);
                 jsonCompra[indexCompra] = tabla
                 indexCompra++
              }
            }
  
          }
        }//for
  
    });
  }

//End While compra
     tabla = jsonCompra
     totalMXNC = TotalMXN
     totalLTSC = TotalLTS
  
     let tablaVenta
  let totalMXNVT = 0.0
  let totalLTSVT = 0.0
  let totalMXNV= 0.0
  let totalLTSV= 0.0
  
  var pagIndexVenta =1
  
  let ApiLengthVenta= 10
  let indexVenta = 0;
  const jsonVenta = {}
  
  ///venta
  let fecha4 = fecha;
  while (ApiLengthVenta > 0 && fecha4.indexOf(fecha) != -1) {
  
  var options = {
    'method': 'GET',
    'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&issuer.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
    'headers': {
      'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
    }
  };
  pagIndexVenta++
  
  let fecha5;
  
  await request(options, function (error, response) {
    if (error) throw new Error(error);
  
  
    let temp = JSON.parse(response.body);
    temp = temp['hydra:member']
    console.log("@@@@@@@@@@@");
    ApiLengthVenta = temp.length
    for (const key in temp) {
      const res = temp[key]
  
      fecha5 = res.issuedAt.substring(0, 10)
      fecha4 = fecha5
      console.log(fecha5);
  
      if (res.items[0] != undefined ) {
        if (res.items[0].unitCode == 'LTR') {
          if (res.currency == 'MXN') {
            
              const tabla = {
                RFCEmisor:res.issuer.rfc,
                Emisor:res.issuer.name,
                RegimenFiscal:res.issuer.taxRegime,
                RFCReceptor:res.receiver.rfc,
                Receptor:res.receiver.name,
                RegimenFiscalReceptor:res.issuer.taxRegime,
                DomicilioFiscalReceptor:'11560',
                UsoCFDI:res.usage,
                Estatus:res.status,
                FechaEmision:res.issuedAt,
                FullDate:res.issuedAt.substring(0, 10),
                Subtotal:res.subtotal,
                Descuento:res.discount,
                Impuesto:res.tax,
                Total:res.total,
                UUID:res.uuid,
                Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                Descripcion:res.items[0] != undefined ? res.items[0].description : '',
                Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
                Moneda:res.currency,
                VersionCFDI:res.version,
                Fechacompleta:res.issuedAt.substring(0, 10),
                TotalMXN:(res.items[0].totalAmount)
              }
             
               venta[indexVenta] = dataExcel
               totalMXNVT += parseFloat(tabla.TotalMXN);
               totalLTSVT += parseFloat(tabla.Cantidad);
               jsonVenta[indexVenta] = tabla
                indexVenta++
  
          } else {
             
              const tabla = {
                RFCEmisor:res.issuer.rfc,
                Emisor:res.issuer.name,
                RegimenFiscal:res.issuer.taxRegime,
                RFCReceptor:res.receiver.rfc,
                Receptor:res.receiver.name,
                RegimenFiscalReceptor:res.issuer.taxRegime,
                DomicilioFiscalReceptor:'11560',
                UsoCFDI:res.usage,
                Estatus:res.status,
                FechaEmision:res.issuedAt,
                FullDate:res.issuedAt.substring(0, 10),
                Subtotal:res.subtotal,
                Descuento:res.discount,
                Impuesto:res.tax,
                Total:res.total,
                UUID:res.uuid,
                Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
                Descripcion:res.items[0] != undefined ? res.items[0].description : '',
                Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
                ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
                DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
                NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
                ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
                Moneda:res.currency,
                VersionCFDI:res.version,
                Fechacompleta:res.issuedAt.substring(0, 10),
                TotalMXN:(res.total * res.exchangeRate)
              }
              
               venta[indexVenta] = dataExcel
               totalMXNVT += parseFloat(tabla.TotalMXN);
               totalLTSVT += parseFloat(tabla.Cantidad);
               jsonVenta[indexVenta] = tabla
                indexVenta++
          }
        }
      }
    }
  });// await request
  
  }
 
  tablaVenta = jsonVenta
  totalMXNV = totalMXNVT
  totalLTSV = totalLTSVT
  
  const diferenciaMXN = (totalMXNC - totalMXNV).toFixed(2)
  const diferenciaLTS = (totalLTSC - totalLTSV).toFixed(2)

  res.render('VistaPrueba/Mensual',{tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS});
  
  
  });*/