const path = require('path');
const fs = require('fs');
const axios = require('axios');

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

/*module.exports.getInvoicePagination = async (rfc, fechaInicio, fechaFin, type = 'C', page = 1) => {

  let allInvoices = [];

  try{


    const urlType = type == 'C' ? 'receiver.rfc' : 'issuer.rfc';

    const url = `https://api.satws.com/taxpayers/${rfc}/invoices?issuedAt[before]=
                  ${fechaFin}T06:00:00.000Z&issuedAt[after]=
                  ${fechaInicio}T06:00:00.000Z&${urlType}=${rfc}&status=VIGENTE&page=
                  ${page}&itemsPerPage=50&type=I`;

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
      allInvoices = invoices;
    });

    return allInvoices;
  } catch(error){
    console.log(error)
    return allInvoices;
  }

}//getInvoicePagination*/

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

  const station = getDataByNatgasStation('PRZ');
  const permisoEstacion = station.permisoEstacion
  
  for (const key in invoices) {
    const res = invoices[key]

    fecha5 = res.issuedAt.substring(0, 10)
    fecha4 = fecha5

    if (res.items[0] != undefined ) {
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
}//validationsNatgas

module.exports.createJsonNatgasStation = (station, invoices) => {
  let estacion = station.toUpperCase();
  let dataStation = getDataByNatgasStation(estacion);
  let permisoEstacion = dataStation.permisoEstacion
  let numDisp = dataStation.numeroDispensario
  let ClaveInstalacion = dataStation.claveInstalacion
  let productoEstructura = require(path.join(__dirname, '../public/json/NatGas/Mensual/productoEstructura.json'))

  try{

    let noEmpty = 0;
    for (const key in invoices) {
      const res = invoices[key]

      if(res.inBalance){
        let entregaNoGeneral = {
          "NombreClienteOProveedor": res.receptor,
          "RfcClienteOProveedor": res.rfcReceptor,
          "CFDIs": []
        }

        
        const identificationNumber = res.identificationNumber
        if (identificationNumber != null) {
          try {
            if (identificationNumber.includes(permisoEstacion) == true && res.productIdentification == '15111512') {
              noEmpty = 1
              let entregaCFDINoGeneral = {
                "Cfdi": res.uuid,
                "TipoCfdi": "Ingreso",
                "PrecioCompra": res.unitAmount,
                "PrecioDeVentaAlPublico": res.unitAmount,
                "PrecioVenta": res.totalAmount,
                "PrecioVentaOCompraOContrap": (res.totalAmount),
                "FechaYHoraTransaccion": res.issuedAt,
                "VolumenDocumentado": {
                    "ValorNumerico": res.quantity,
                    "UnidadDeMedida": "UM04"
                }
              }
              // entregaCFDINoGeneral.Cfdi = res.uuid
              // entregaCFDINoGeneral.TipoCfdi = 'Ingreso'
              // entregaCFDINoGeneral.PrecioVentaOCompraOContrap = 
              // entregaCFDINoGeneral.FechaYHoraTransaccion = 
              // entregaCFDINoGeneral.VolumenDocumentado.ValorNumerico = 
              const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.receiver.rfc)
              if (alredyinJson == true) {
                ifExist =1
              }
              entregaNoGeneral.CFDIs.push(entregaCFDINoGeneral)
                productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
                productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[key].quantity//ltr
                productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
                productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[key].totalAmount)//mxn
              }
          } catch (error) {
            console.log(error);
          }
          
        }
    
        if (noEmpty != 0) {
          if (ifExist == 1) {
            productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
              if (element.RfcClienteOProveedor  == res.receiver.rfc) {
                entregaNoGeneral.CFDIs.forEach(element2 => {
                  element.CFDIs.push(element2)
                });
              }
            });
          }else{
            productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entregaNoGeneral)
          }
        }
      }//if in balance
    }//for

    let estructura =require(path.join(__dirname, '../public/json/NatGas/Mensual/estructura.json'))
    estructura.NumPermiso = permisoEstacion
    estructura.NumeroDispensarios = numDisp
    estructura.ClaveInstalacion = ClaveInstalacion
    const event = new Date();
    //  estructura.BitacoraMensual[0].NumeroRegistro = indexCompra + indexCompra
    //  estructura.BitacoraMensual[0].FechaYHoraEvento = event.toISOString().slice(0,-1)
    estructura.FechaYHoraReporteMes = event.toISOString().slice(0,-1)
    
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
    return fileNameKey;
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