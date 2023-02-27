const path = require('path');
const fs = require('fs');
const axios = require('axios');

module.exports.getInvoice = async (rfc, fechaInicio, fechaFin, type = 'C') => {

  let allInvoices = [];

  try{
    let pageIndexCompra = 1


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]=${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${pageIndexCompra}&itemsPerPage=1000&type=I`;

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

        const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]=${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${i}&itemsPerPage=1000&type=I`;

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

module.exports.getInvoicesNatgasFirstPart = async (rfc, fechaInicio, fechaFin, type = 'C') => {

  let allInvoices = [];

  try{
    let pageIndexCompra = 1


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]=${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${pageIndexCompra}&itemsPerPage=100&type=I`;

    const firstPromise = axios({ 
      method: 'get', 
      url: url, 
      headers: { 'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb' }
    });


    await Promise.all([firstPromise]).then(async (response) => {
      const datos =  response[0].data;

      const lastView = datos['hydra:view']['hydra:last'];
      const lastViewParts = lastView != undefined ?  lastView.split("=") : [];
      const totalPages = 2; //lastViewParts.length > 0 ? lastViewParts[lastViewParts.length - 1] : 0;
      const invoices = datos['hydra:member']
      allInvoices = [...allInvoices,...invoices];
      const promises = [];

      for(let i = 2; i <= totalPages; i++){

        const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]= ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${i}&itemsPerPage=100&type=I`;

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

}//getInvoicesNatgasFirstPart

module.exports.getInvoicesNatgasSecondPart = async (rfc, fechaInicio, fechaFin, type = 'C') => {

  let allInvoices = [];

  try{
    let pageIndexCompra = 2


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]=${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${pageIndexCompra}&itemsPerPage=1000&type=I`;

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

      for(let i = 3; i <= totalPages; i++){

        const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]= ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${i}&itemsPerPage=1000&type=I`;

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

}//getInvoicesNatgasSecondPart

module.exports.getInvoicesNatgasThirdPart = async (rfc, fechaInicio, fechaFin, type = 'C') => {

  let allInvoices = [];

  try{
    let pageIndexCompra = 10


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]=${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${pageIndexCompra}&itemsPerPage=1000&type=I`;

    const firstPromise = axios({ 
      method: 'get', 
      url: url, 
      headers: { 'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb' }
    });


    await Promise.all([firstPromise]).then(async (response) => {
      const datos =  response[0].data;

      const lastView = datos['hydra:view']['hydra:last'];
      const lastViewParts = lastView != undefined ?  lastView.split("=") : [];
      const totalPages = 19;//lastViewParts.length > 0 ? lastViewParts[lastViewParts.length - 1] : 0;
      const invoices = datos['hydra:member']
      allInvoices = [...allInvoices,...invoices];
      const promises = [];

      for(let i = 11; i <= totalPages; i++){

        const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=${fechaFin}T06:00:00.000Z&issuedAt[after]= ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=${i}&itemsPerPage=500&type=I`;

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

}//getInvoicesNatgasSecondPart

module.exports.getInvoicesByUIID= async() => {
  const promises = [];
  let allInvoices = [];
  const dic = [
    'D19A9C70-8C56-11ED-B1A0-63422FE357BC',
    'FBB00920-91D6-11ED-86C7-5BD3894DE868',
    'FCE13599-91D6-11ED-AC12-8527605341A3',
    '7E4BB619-9C24-11ED-8E12-65FEA27C95FC',
    'FC489F52-91D6-11ED-A50A-65168B9B9AF4',
    'FD79CCAF-91D6-11ED-BF38-97DDFCD0ED48',
    '2BA65C4B-8C6D-11ED-88F8-1F8559D3086A',
    '6784F5CA-8C5C-11ED-9AD9-A989126F446A',
    '69E74F19-8C5C-11ED-BD4E-65FE1F09CCB6',
    '6D7AD64B-8C5C-11ED-91DF-CDC4E441FD78',
    '68B62233-8C5C-11ED-879B-816E1CEF0705',
    '6B187C22-8C5C-11ED-BB1F-A9644C3ECADD',
    '6CE23FF4-8C5C-11ED-AF66-2772512840B4',
    '694EB91D-8C5C-11ED-B514-9FA22E9DFF9C',
    '6A7FE657-8C5C-11ED-9342-25F8F6F7D9FB',
    '6BB112FF-8C5C-11ED-832E-8BCB596EE617',
    '33F79AB4-8C5F-11ED-AEF1-E9AE82C3415E',
    '065923FC-8C54-11ED-B1F7-CD9A109075EA',
    '08BB7E73-8C54-11ED-9FED-6B5D3A8E234B',
    '09541499-8C54-11ED-BB9B-074EF10AF95B',
    '714CCFA4-92D2-11ED-8518-BB5801888487',
    '3B17ABE8-8C51-11ED-A1EB-176B7CD70406',
    '3C48D975-8C51-11ED-991C-D7D275973EF6',
    '3BB04230-8C51-11ED-A8E0-79471FE01228',
    'F483FDB1-91CC-11ED-BAFB-41F603862387',
    'F8B01B7F-91CC-11ED-8AD8-17DBC9228832',
    'F81784CE-91CC-11ED-9BDA-C30C3AAE9BCB',
    'F77EEE18-91CC-11ED-BDBC-496E51BB0052',
    '197E6D1C-91D9-11ED-A5CE-C559E62EC722',
    'F352D0DA-91CC-11ED-977E-197C352B66E8',
    'F6E6573B-91CC-11ED-8761-DF072CA80873',
    'F5B52A9A-91CC-11ED-952E-475195F46BAF',
    '408B6D8E-91DE-11ED-BDA5-7BC823B09924',
    'F51C939E-91CC-11ED-B734-D97734C99125',
    'F483FDBE-91CC-11ED-B914-270AED910C74',
    '2E29FCA8-9045-11ED-8A94-EF9746D250AA',
    '0822E7CD-8C54-11ED-ADBB-05FC58BA5F7A',
    '08BB7E02-8C54-11ED-8D5C-F31F38E1C583',
    '6FD633FB-8C4E-11ED-81AE-7585EC259C10',
    '706ECAEA-8C4E-11ED-B8D4-BDB915836A76',
    '3E4FD574-9061-11ED-BD55-8B8BCC69CE3D',
    'A5C5E88F-8C4B-11ED-AED6-4D6E80716525',
    '08BB7E50-8C54-11ED-A763-83E88FB6FCB1',
    '0822E7E3-8C54-11ED-8A0E-E1425F0699A3',
    '2432B44D-98F7-11ED-BD2D-E182C0929791'
  ]

  for(key in dic){
    const uiid = dic[key];    
    const url = `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?uuid=${uiid}`;

    const promise =  axios({ 
      method: 'get', 
      url: url, 
      headers: { 'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb' }
    });

    promises.push(promise);

    await Promise.all(promises).then(function (response) {
        
      for(const key in response){
        const datos = response[key];
        const invoices = datos.data['hydra:member']

        allInvoices = [...allInvoices,...invoices];

      }   
    });

  }// for
  return allInvoices;
}


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

module.exports.validationsNatgas = (invoices) => {

  const allInvoices = []
  let acumuladoMXN = 0;
  let acumuladoLTS = 0;

  try {
    
    const station = getDataByNatgasStation('PRZ');
    const permisoEstacion = station.permisoEstacion
    
    for (const key in invoices) {
      const res = invoices[key]

      //fecha5 = res.issuedAt.substring(0, 10)
      //fecha4 = fecha5

      if (res.items[0] != undefined ) {
        let rfcNombre = res.receiver.name
        if (rfcNombre.length < 10) {
            for (let index = rfcNombre.length; index < 11; index++) {
              rfcNombre= rfcNombre + ' '
            }
        }//if

        if (res.items.length<2) {
          const identificationNumber = res.items[0].identificationNumber
          if (identificationNumber !== null) {
            try {
              if (identificationNumber.includes(permisoEstacion) == true && res.items[0].productIdentification == '15111512') {
                
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
                  cantidad:res.items[0] != undefined ? res.items[0].quantity : 0.00,
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
                  totalMXN: res.items[0].totalAmount.toFixed(2),
                  tipoFactura: 'Venta',
                  inBalance: true,
                  fechaNuevaAplicacion: '',
                  horaNuevaAplicacion: '',
                  justificacionCambio: '',
                  identificationNumber: identificationNumber
                  
                }
            
                acumuladoMXN += parseFloat(invoice.totalMXN);
                acumuladoLTS += parseFloat(invoice.cantidad);
                allInvoices.push(invoice)
              }
            } catch (error) {
              console.log(error);
            }
          }//if
        } else {
          
          for (const key in res.items) {
            const identificationNumber = res.items[key].identificationNumber
            if (identificationNumber != null) {
              try {
                if (identificationNumber.includes(permisoEstacion) == true && res.items[0].productIdentification == '15111512') {
                  
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
                    cantidad:res.items[0] != undefined ? res.items[0].quantity : 0.00,
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
                    totalMXN: res.items[0].totalAmount.toFixed(2),
                    tipoFactura: 'Venta',
                    inBalance: true,
                    fechaNuevaAplicacion: '',
                    horaNuevaAplicacion: '',
                    justificacionCambio: '',                    
                    identificationNumber: identificationNumber
                    
                  }
                  acumuladoMXN += parseFloat(invoice.totalMXN);
                  acumuladoLTS += parseFloat(invoice.cantidad);
                  allInvoices.push(invoice)             
                }
              } catch (error) {
                console.log(error);
              }//try catch
            }//if
          }//for
        }//if
      }//if
    }//for
    
    return { allInvoices , acumuladoMXN, acumuladoLTS}
  } catch(error){
    console.log(error)
    return { allInvoices , acumuladoMXN, acumuladoLTS}
  }
}//validationsNatgas

module.exports.createJsonNatgasStation = (station, invoices) => {
  let estacion = station.toUpperCase();
  let dataStation = getDataByNatgasStation(estacion);
  let permisoEstacion = dataStation.permisoEstacion
  let numDisp = dataStation.numeroDispensario
  let ClaveInstalacion = dataStation.claveInstalacion
  let productoEstructura = require(path.join(__dirname, '../public/json/NatGas/Mensual/productoEstructura.json'))

  const nov =[
    'B5B0D408-7671-11ED-822D-BDE83B1B2B56',
    '87D95CAF-74C2-11ED-A002-E5B00C2E5FDA',
    '0A422963-896A-11ED-8ABE-A1EAABC586BF',
    '07912557-75B0-11ED-A4CD-79741F910A9C',
    '03FD9E3F-75B0-11ED-9A70-CD318E6B658A',
    '9A0C02CB-772F-11ED-8C8D-D1DB0F71A04F',
    '6EB19573-7D79-11ED-9C6F-717862C1372B',
    'ECFE82AF-7596-11ED-A046-17D4172A3019',
    '712F3308-7685-11ED-9EE2-17CCACDE5971',
    'EF60DC11-7596-11ED-8524-1D7FB1C4EAF4',
    '2AC50A60-7826-11ED-9AD7-0548B97B728D',
    '1719A396-7826-11ED-BFE0-036F92C89A17',
    '5F38C661-7826-11ED-A6C2-21F21770A258',
    '3CA6AD9D-7826-11ED-AF5C-CBC595120E8D',
    '5183408D-7826-11ED-8442-7FCF3E93BFB5',
    '1BDE581C-7826-11ED-AE25-A92AD6F423E6',
    '12ED869D-7826-11ED-8D9C-E3EB970B47E1',
    '1A149446-7826-11ED-B72E-1B51303CC06A',
    '200A7537-7826-11ED-B88F-D12801702F9E',
    '59DB7C18-7826-11ED-9ADC-2BF03625C0CF',
    '2567C017-7826-11ED-A3A7-B993E0F4C63F',
    '40D910E1-7B2F-11ED-BA48-CB11D3CFB6A6',
    '94F64C5D-74C2-11ED-9662-27A6E625BCAB',
    'AF5D13DD-751C-11ED-B128-5FC19EEE59BC',
    'AE2BE6A0-751C-11ED-AA2D-E95EE35FA989',
    'B1BF6D3F-751C-11ED-BA9A-3D2FDFD87BEC',
    '2633D36A-8946-11ED-8981-C5C06711E7B2',
    'E2E72D57-7CD6-11ED-9260-C14F15393A8A'
    ]
  try{

    let noEmpty = 0;
    for (const key in invoices) {
      const res = invoices[key]

      if(res.inBalance){
        let FechaYHoraTransaccion = new Date(res.fechaEmision)
        FechaYHoraTransaccion= FechaYHoraTransaccion.toISOString().slice(0,-5) + '-06:00' 
          
        if (nov.indexOf(res.uuid) == -1) {
          
          let rfcNombre = res.receptor
          if (rfcNombre.length < 10) {
              for (let index = rfcNombre.length; index < 11; index++) {
                rfcNombre= rfcNombre + ' '
              }
          }
          
          const identificationNumber = res.noIdentificacion
        
          if (identificationNumber !== null) {
            try {
              if (identificationNumber.includes(permisoEstacion) == true && res.claveSAT == '15111512') {
  
                const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.rfcReceptor)
                  if (alredyinJson == false) {
  
                    let entrega = {
                      "NombreClienteOProveedor": rfcNombre,
                      "RfcClienteOProveedor": res.rfcReceptor,
                        "CFDIs": [{
                            "Cfdi": res.uuid,
                            "TipoCfdi": "Ingreso",
                            "PrecioCompra": parseFloat(res.valorUnitario.toFixed(2)),
                            "PrecioDeVentaAlPublico": parseFloat(res.valorUnitario.toFixed(2)),
                            "PrecioVentaOCompraOContrap": parseFloat(res.importeConcepto.toFixed(2)),
                            "PrecioVenta": parseFloat(res.importeConcepto.toFixed(2)),
                            "FechaYHoraTransaccion": FechaYHoraTransaccion,
                            "VolumenDocumentado": {
                                "ValorNumerico": parseFloat(res.cantidad.toFixed(2)),
                                "UnidadDeMedida": "UM04"
                            }
                        }]
                        }
                      productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entrega)
                  } else {
                    let entrega = {
                            "Cfdi": res.uuid,
                            "TipoCfdi": "Ingreso",
                            "PrecioCompra": parseFloat(res.valorUnitario.toFixed(2)),
                            "PrecioDeVentaAlPublico": parseFloat(res.valorUnitario.toFixed(2)),
                            "PrecioVentaOCompraOContrap": parseFloat(res.importeConcepto.toFixed(2)),
                            "PrecioVenta": parseFloat(res.importeConcepto.toFixed(2)),
                            "FechaYHoraTransaccion": FechaYHoraTransaccion,
                            "VolumenDocumentado": {
                                "ValorNumerico": parseFloat(res.cantidad.toFixed(2)),
                                "UnidadDeMedida": "UM04"
                            }
                        }
                    productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
                      if (element.RfcClienteOProveedor  == res.rfcReceptor) {
                        element.CFDIs.push(entrega)
                      }
                    });
                  }
                  productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
                  productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.cantidad//ltr
                  productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
                  productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = parseFloat(productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.importeConcepto))//mxn
              }
            } catch (error) {
              console.log(error);
            }
      
          }
        }//if
      }//if in balance
    }//for

    let estructura =require(path.join(__dirname, '../public/json/NatGas/Mensual/estructura.json'))
    estructura.NumPermiso = permisoEstacion
    estructura.NumeroDispensarios = numDisp
    estructura.ClaveInstalacion = ClaveInstalacion
    const event = new Date();
    estructura.FechaYHoraReporteMes = event.toISOString().slice(0,-5) + '-06:00' 
    const importeMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes
    const volumenMes = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico
   
   
    productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = parseFloat( volumenMes.toFixed(2))
    productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = parseFloat(importeMes.toFixed(2))
    estructura.Producto.push(productoEstructura)
    
    let fileNameKey = `MesTempNatGas_${estacion}.json`
    const fileJsonName = path.join(__dirname, `../public/json/NatGas/MensualTemp/${fileNameKey}`);

    //If directory no exist, create
    const dest = path.join(__dirname, '../public/json/NatGas/MensualTemp')
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest,{ recursive: true });
    }

    fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
      if (err)
        return '';
    });
    return estructura;
  } catch (error){
    console.log(error)
    return '';
  }
}//createJsonNatgasStation

function getDataByNatgasStation(station){

  const data = {
    '5FB': {
      permisoEstacion: 'G/11779/EXP/ES/FE/2015',
      numeroDispensario: 5,
      claveInstalacion: 'EXO-0001'
    },
    'OBR':{
      permisoEstacion: 'G/12974/EXP/ES/FE/2015',
      numeroDispensario: 7,
      claveInstalacion: 'EXO-0002'
    },
    'PRZ':{
      permisoEstacion: 'G/18923/EXP/ES/FE/2016',
      numeroDispensario: 6,
      claveInstalacion: 'EXO-0003'
    },
    'MXJ':{
      permisoEstacion: 'G/19160/EXP/ES/FE/2016',
      numeroDispensario: 3,
      claveInstalacion: 'EXO-0004'
    },
    'JMC':{
      permisoEstacion: 'G/19725/EXP/ES/FE/2016',
      numeroDispensario: 7,
      claveInstalacion: 'EXO-0005'
    },
    'SJR':{
      permisoEstacion: 'G/20155/EXP/ES/FE/2017',
      numeroDispensario: 3,
      claveInstalacion: 'EXO-0006'
    },
    'LAZ':{
      permisoEstacion: 'G/20600/EXP/ES/FE/2017',
      numeroDispensario: 7,
      claveInstalacion: 'EXO-0007'
    },
    'ELM':{
      permisoEstacion: 'G/20708/EXP/ES/FE/2017',
      numeroDispensario: 3,
      claveInstalacion: 'EXO-0008'
    },
    'NAC':{
      permisoEstacion: 'G/20997/EXP/ES/FE/2018',
      numeroDispensario: 6,
      claveInstalacion: 'EXO-0009'
    },
    'JUR':{
      permisoEstacion: 'G/21142/EXP/ES/FE/2018',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0010'
    },
    'PBQ':{
      permisoEstacion: 'G/21188/EXP/ES/FE/2018',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0011'
    },
    'ABA':{
      permisoEstacion: 'G/21397/EXP/ES/FE/2018',
      numeroDispensario: 8,
      claveInstalacion: 'EXO-0013'
    },
    'MAL':{
      permisoEstacion: 'G/21699/EXP/ES/FE/2018',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0014'
    },
    'FUG':{
      permisoEstacion: 'G/21699/EXP/ES/FE/2018',
      numeroDispensario: 6,
      claveInstalacion: 'EXO-0015'
    },
    'LIN':{
      permisoEstacion: 'G/22990/EXP/ES/FE/2019',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0016'
    },
    'AGP':{
      permisoEstacion: 'G/22989/EXP/ES/FE/2019',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0017'
    },
    'XXI':{
      permisoEstacion: 'G/23572/EXP/ES/FE/2020',
      numeroDispensario: 5,
      claveInstalacion: 'EXO-0018'
    },
    '108':{
      permisoEstacion: 'G/23578/EXP/ES/FE/2020',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0019'
    },
    'LEN':{
      permisoEstacion: 'G/23453/EXP/ES/FE/2020',
      numeroDispensario: 4,
      claveInstalacion: 'EXO-0020'
    },
    'CRR':{
      permisoEstacion: 'G/23711/EXP/ES/FE/2020',
      numeroDispensario: 5,
      claveInstalacion: 'EXO-0021'
    },
    'OCA':{
      permisoEstacion: 'G/23894/EXP/ES/FE/2021',
      numeroDispensario: 6,
      claveInstalacion: 'EXO-0022'
    },
    'COL':{
      permisoEstacion: 'G/23454/EXP/ES/FE/2020',
      numeroDispensario: 6,
      claveInstalacion: 'EXO-0023'
    }
  }

  return data[station]
}//getDataByNatgasStation
