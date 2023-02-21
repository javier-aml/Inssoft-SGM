const axios = require('axios');

module.exports.getInvoices = async (rfc, fechaInicio, fechaFin, type = 'C') => {
    let allInvoices = [];

    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    try {
        let pageIndexCompra = 1
        let length = 1;
        let acumuladoMXN = 0;
        let acumuladoLTS = 0;

        while (length < 4) {
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
                    serie: res.reference,
                    folio: res.internalIdentifier,
                    tipoComprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
                    unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
                    claveUnidad: res.items[0] != undefined && res.items[0].unitCode == 'LTR' ? 'Litros' : res.items[0].unitCode,
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
                    exchangeRate: res.currency == 'MXN' ? 1 : res.exchangeRate,
                    versionCFDI:res.version,
                    fechaCompleta:res.issuedAt.substring(0, 10),
                    totalMXN: invoiceTotalMXN.toFixed(2),
                    tipoFactura: type == 'C' ? 'Compra' : 'Venta',
                    inBalance: true,
                    fechaNuevaAplicacion: '',
                    horaNuevaAplicacion: '',
                    justificacionCambio: ''
                  }

                  acumuladoMXN += parseFloat(invoice.totalMXN);
                  acumuladoLTS += parseFloat(invoice.cantidad);
                  allInvoices.push(invoice)
                  
                }//if unitcode == LTR

              }//if items != undefined
              
            }//for

            pageIndexCompra++;
            //length = invoices.length
            length++
        }
        return {allInvoices, acumuladoMXN, acumuladoLTS}
    } catch(error){
        console.log(error)
        return [];
    }
}//getInvoices

module.exports.getInvoice = async (rfc, fechaInicio, fechaFin, type = 'C') => {

  let allInvoices = [];

  try{
    let pageIndexCompra = 1


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=
                  ${fechaFin}T06:00:00.000Z&issuedAt[after]=
                  ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=
                  ${pageIndexCompra}&itemsPerPage=1000&type=I`;

    const firstPromise = axios({ 
      method: 'get', 
      url: url, 
      headers: { 'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb' }
    });


    await Promise.all([firstPromise]).then(async (response) => {
      const datos =  response[0].data;

      const lastView = datos['hydra:view']['hydra:last'];
      const lastViewParts = lastView != undefined ?  lastView.split("=") : [];
      const totalPages = lastViewParts.length > 0 ? lastViewParts[lastViewParts.length - 1] : 0;
      const invoices = datos['hydra:member']
      allInvoices = [...allInvoices,...invoices];
      const promises = [];

      for(let i = 2; i <= totalPages; i++){

        const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=
                    ${fechaFin}T06:00:00.000Z&issuedAt[after]=
                    ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=
                    ${i}&itemsPerPage=1000&type=I`;

        const promise =  axios({ 
          method: 'get', 
          url: url, 
          headers: { 'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb' }
        });

        promises.push(promise);
      } 

      await Promise.all(promises).then(function (response) {
        
        for(const key in response){
          const datos = response[key];
          const invoices = datos.data['hydra:member']

          allInvoices = [...allInvoices,...invoices];

        }   
      });
    });

    return allInvoices;
  } catch(error){
    console.log(error)
    return allInvoices;
  }

}//getInvoice

module.exports.validationsGlencore = (invoices, type) => {
  let allInvoices = [];
  let acumuladoMXN = 0;
  let acumuladoLTS = 0;

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
          serie: res.reference,
          folio: res.internalIdentifier,
          tipoComprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
          unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
          claveUnidad: res.items[0] != undefined && res.items[0].unitCode == 'LTR' ? 'Litros' : res.items[0].unitCode,
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
          exchangeRate: res.currency == 'MXN' ? 1 : res.exchangeRate,
          versionCFDI:res.version,
          fechaCompleta:res.issuedAt.substring(0, 10),
          totalMXN: invoiceTotalMXN.toFixed(2),
          tipoFactura: type == 'C' ? 'Compra' : 'Venta',
          inBalance: true,
          fechaNuevaAplicacion: '',
          horaNuevaAplicacion: '',
          justificacionCambio: ''
        }

        acumuladoMXN += parseFloat(invoice.totalMXN);
        acumuladoLTS += parseFloat(invoice.cantidad);
        allInvoices.push(invoice)
        
      }//if unitcode == LTR
    }//if items != undefined
  }//for

  return {allInvoices, acumuladoMXN, acumuladoLTS}
}//validationsGlencore