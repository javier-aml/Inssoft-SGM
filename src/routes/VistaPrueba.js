const express = require('express');
const router = express.Router();
const app = express();
const pool = require('../database');
const path = require('path');
const fs = require('fs');
 var dirRoot = arbolArchivos();
const multer = require('multer');
const { file } = require('pdfkit');
let jsonDiario = require(path.join(__dirname, '../public/json/glencore/glencoreEstructura.json'))

const storage = multer.diskStorage({
     destination:  path.join(__dirname, '../public/pdf/certificaciones'),
     filename: function(req,file,cb) {
       cb("",acomodarFecha(DateNow())+'-'+file.originalname);
     }

   })
// const multer = require('multer')({
//       dest: path.join(__dirname, '../public/pdf/Test')
//    })
   const upload = multer({
     storage:storage
   })

   const storage2 = multer.diskStorage({
    destination:  path.join(__dirname, '../public/img/equipos'),
    filename: function(req,file,cb) {
      cb("",acomodarFecha(DateNow())+'-'+file.originalname);
    }

  })

  const upload2 = multer({
    storage:storage2
  })

  const storage3 = multer.diskStorage({
    destination:  path.join(__dirname, '../public/pdf/equipo/certificaciones'),
    filename: function(req,file,cb) {
      cb("",acomodarFecha(DateNow())+'-'+file.originalname);
    }

  })

  const upload3 = multer({
    storage:storage3
  })

  const storage4 = multer.diskStorage({
    destination:  path.join(__dirname, '../public/pdf/equipo/documentos'),
    filename: function(req,file,cb) {
      cb("",acomodarFecha(DateNow())+'-'+file.originalname);
    }

  })

  const upload4 = multer({
    storage:storage4
  })
  const storage5 = multer.diskStorage({
    destination:  path.join(__dirname, '../public/pdf/equipo/incertidumbres'),
    filename: function(req,file,cb) {
      cb("",acomodarFecha(DateNow())+'-'+file.originalname);
    }

  })

  const upload5 = multer({
    storage:storage5
  })
  const storage6 = multer.diskStorage({
    destination:   path.join(__dirname, '../public/Excel/'),
    filename: function(req,file,cb) {
      cb("",file.originalname);
    }

  })

  const upload6 = multer({
    storage:storage6
  })
  const storage7 = multer.diskStorage({
    destination:   path.join(__dirname, '../public/pdf/tabla/certificaciones'),
    filename: function(req,file,cb) {
      cb("",file.originalname);
    }

  })

  const upload7 = multer({
    storage:storage7
  })
  // const upload6 = multer({ dest: path.join(__dirname, '../public/Excel/'),})
router.get('/',  async (req,res) => {
  const tareas = await pool.query("select *,DATE_FORMAT(Fecha,'%d-%m-%Y') AS date from tarea");
  const fechas = codigoFecha(tareas);
  const pathToDirCompraDiario = path.join(__dirname, "../public/json/jsonGenerados/Diario/Compra")
  const pathToDirVentaDiario = path.join(__dirname, "../public/json/jsonGenerados/Diario/Venta")
   removeDirDiario(pathToDirCompraDiario)
   removeDirDiario(pathToDirVentaDiario)
    // const a = getJson()


    // console.log(estructura)
     const Curso = sortObject(fechas.Curso);
     const retraso = sortObject(fechas.retraso);

     res.render('VistaPrueba/index',{Curso,retraso});
});
router.get('/tabla/:id',  async (req,res) => {
     const id = req.params.id;
      const tareas = await pool.query("select *,DATE_FORMAT(Fecha,'%d-%m-%Y') AS date from tarea where tarea = ?",[id]);
     const Tarea = id

     res.render('VistaPrueba/tareas',{tareas,Tarea});
});
router.get('/estructura',  async (req,res) => {

     res.render('VistaPrueba/estructura');
});
router.get('/estructura2',  async (req,res) => {
  //  dirRoot = await arbolArchivos();
     const root = await dirRoot;
     res.render('VistaPrueba/estructura2',{root});
});
router.get('/CertificadoTabla',  async (req,res) => {
  const tabla = await pool.query(`select Nombre,DATE_FORMAT(Fecha,'%d-%m-%Y') as Fecha,File  from certificado`)
     res.render('VistaPrueba/CertificadosTabla',{tabla});
});
router.get('/Mapa',  async (req,res) => {

     res.render('VistaPrueba/Mapa');
});
router.get('/TiempoReal',  async (req,res) => {
     res.render('VistaPrueba/TiempoReal');
});
router.get('/SeleccionTanque',  async (req,res) => {
     res.render('VistaPrueba/SeleccionTanque');
});
router.get('/Equipos',  async (req,res) => {
  const tabla = await pool.query("Select *,DATE_FORMAT(fCalibracion,'%d-%m-%Y') as date from equipo");

  res.render('VistaPrueba/Equipos',{tabla});
});
router.get('/Equipos/Certificados/:id',  async (req,res) => {
  const id = req.params.id
  let img = await pool.query(`Select img from equipo where id = ${id}`);
  img= img[0].img

  const tabla = await pool.query(`Select *,DATE_FORMAT(Fecha_Ingreso,'%d-%m-%Y') as date from certificado_equipo where id_equipo = ${id}`);
  // console.log(tabla);
  res.render('VistaPrueba/certificados',{id,tabla,img});
});
router.get('/Equipos/Documentos/:id',  async (req,res) => {
  const id = req.params.id
  let img = await pool.query(`Select img from equipo where id = ${id}`);
  img= img[0].img

  const tabla = await pool.query(`Select *,DATE_FORMAT(Fecha_Ingreso,'%d-%m-%Y') as date from documental_equipo where id_equipo = ${id}`);

  res.render('VistaPrueba/controlDocumental',{id,tabla,img});
});
router.get('/Equipos/:id',  async (req,res) => {
  const id = req.params.id
  const tabla = await pool.query(`Select *,DATE_FORMAT(fCalibracion,'%d-%m-%Y') as date from equipo where id = ${id}`);

const {
  Nombre,
  Descripcion,
  idInstrumento	,
  Marca,
  nSerie,
  Fabricante,
  nActivo,
  Prioridad,
  nCertificado,
  Clasificacion,
  Proveedor,
  fCalibracion,
  hPromedio,
  Habilitado,
  fServicio,
  Modelo,
  date,img} = tabla[0]
  res.render('VistaPrueba/equipoEspecifico',{  id,Nombre,
    Descripcion,
    idInstrumento,
    Marca,
    nSerie,
    Fabricante,
    nActivo,
    Prioridad,
    nCertificado,
    Clasificacion,
    Proveedor,
    fCalibracion,
    hPromedio,
    Habilitado,
    fServicio,
    Modelo,
    date,img});
});
router.get('/QR',  async (req,res) => {

  res.render('VistaPrueba/QRscanner.hbs');
});
router.get('/Visualizar/:id/:ids', async (req, res) => {

           const id = req.params.id
           const ids = req.params.ids
           const pdf = await pool.query('select fileName from treefile2 where id = ?',[id]);
           const directory = path.join(__dirname, `../public/pdf/certificaciones/${pdf[0].fileName}.pdf`);
           // const nQR = req.params.id\
          //  C:\Users\USER\Desktop\AdrianQR\AdrianQR\src\public\pdf\certificaciones\MESS-CC-PRP-0125-2021.pdf
           fs.readFile(directory , function (err,data){
               res.contentType("application/pdf");
               res.send(data);
           });

   });
   router.get('/Visualizar2/:id', async (req, res) => {

     const id = req.params.id
     const directory = path.join(__dirname, `../public/pdf/certificaciones/${id}.pdf`);
     // const nQR = req.params.id\
    //  C:\Users\USER\Desktop\AdrianQR\AdrianQR\src\public\pdf\certificaciones\MESS-CC-PRP-0125-2021.pdf
     fs.readFile(directory , function (err,data){
         res.contentType("application/pdf");
         res.send(data);
     });

});
router.get('/Equipos/Certificados/:id/view/:ids', async (req, res) => {

  const id = req.params.ids
 let fileName = await pool.query(`Select FileName from certificado_equipo where id = ${id}`);
 fileName= fileName[0].FileName
  const directory = path.join(__dirname, `../public/pdf/equipo/certificaciones/${fileName}`);
  // const nQR = req.params.id\
 //  C:\Users\USER\Desktop\AdrianQR\AdrianQR\src\public\pdf\certificaciones\MESS-CC-PRP-0125-2021.pdf
  fs.readFile(directory , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

});
router.get('/Equipos/Documentos/:id/view/:ids', async (req, res) => {

  const id = req.params.ids
 let fileName = await pool.query(`Select FileName from documental_equipo where id = ${id}`);
 fileName= fileName[0].FileName
  const directory = path.join(__dirname, `../public/pdf/equipo/documentos/${fileName}`);
  // const nQR = req.params.id\
 //  C:\Users\USER\Desktop\AdrianQR\AdrianQR\src\public\pdf\certificaciones\MESS-CC-PRP-0125-2021.pdf
  fs.readFile(directory , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

});
router.get('/JsonGenerator', async (req, res) => {

  res.render('VistaPrueba/jsonGenerator');

});
var datoCompraDiario
var datoVentaDiario

// var datoCompraMensual = ExcelMensualCompra()
// var datoVentaMensual = ExcelMensualVenta()

// 

// var datoCompraMensual = ExcelMensualCompra()
// var datoVentaMensual = ExcelMensualVenta()
var datoCompraMensual;
var datoVentaMensual;
// apiDiario('2022-10-25')
// async function apiDiario(fecha) {
//    datoCompra =  await ApiDiarioCompra(fecha)
//    console.log(datoCompra);
//  datoVenta =    await ApiDiarioVenta(fecha)
// }

router.get('/Diario/:fecha', async (req, res) => {
  var request = require('request');
  // let temp;2022-10-25
  var datoCompra;
  const xl = require('excel4node');
  console.log("Empieza");
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Compra');
  const ws2 = wb.addWorksheet('Venta');
  const headingColumnNames = [
    "UUID",
    "RFC Emisor",
    "Nombre del Emisor",
    "RFC Receptor",
    "Nombre del Receptor",
    "Tipo",
    "Estatus",
    "PAC",
    "Moneda",
    "Fecha de Certificación",
    "Método de Pago",
    "Fecha de Emisión",
    "Condiciones de pago (original)",
    "No. Identificación",
    "Clave del producto y/o servicio",
    "Descripción",
    "Cantidad",
    "Clave de unidad",
    "Valor unitario",
    "Descuento",
    "Impuesto",
    "Subtotal",
    "Total",
    "TotalMXN"
]
  let fecha = req.params.fecha
  let fechasplit = fecha.split("-")
  console.log(fechasplit[2].length );
  console.log(fechasplit[2].length );
  let fechaArreglada;
  if (fechasplit[2].length == 1) {
    fecha = `${fechasplit[0]}-${fechasplit[1]}-0${fechasplit[2]}`

  }
   fechasplit = fecha.split("-")
  console.log(fecha);
  if (fechasplit[1].length == 1) {

    fecha = `${fechasplit[0]}-0${fechasplit[1]}-${fechasplit[2]}`
  }
  console.log(fecha);
  console.log(fecha)
  if (fecha== null) {
    fecha = acomodarFecha(DateNow())
  }
  let headingColumnIndex = 1;
  let headingColumnIndex2 = 1;
  let rowIndex = 2;
  const compra = [

  ]
  let rowIndex2 = 2;
 //  let index2 = 0
  const venta = [

 ]
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
  headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++)
        .string(heading)
});//Write Data in Excel file headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
    ws2.cell(1, headingColumnIndex2++)
        .string(heading)
});//Write Data in Excel file
if (fechasplit[2].length == 1) {
  fecha = `${fechasplit[0]}-${fechasplit[1]}-0${fechasplit[2]}`

}
console.log(fecha);
console.log("^^^^^");
    while (ApiLength > 0 && fecha == fecha2) {
        console.log(fecha == fecha2);
        console.log(fecha);
console.log("^^^^^");
console.log(fecha2);
console.log("^^^^^");
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      pagIndexCompra++

      let fecha3;

      await request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
                    // console.log(diario);


        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        console.log("@@@@@@@@@@@");
        ApiLength = temp.length
        console.log(ApiLength);
        console.log(pagIndexCompra);
        for (const key in temp) {
          const res = temp[key]
          switch (res.paymentMethod) {
            case 01:
              metodoPago = 'Efectivo'
              break;
              case 02:
                metodoPago = 'Cheque de nómina'
                break;
                case 03:
                  metodoPago = 'Transferencia electrónica'
                  break;
                  case 04:
                    metodoPago = 'Tarjeta de crédito'
                    break;
                    case 05:
                      metodoPago = 'Monedero electrónico'
                      break;
                      case 06:
                        metodoPago = 'Dinero digital'
                        break;
                        case 08:
                          metodoPago = 'Vales de despensa'
                          break;
                          case 12:
                            metodoPago = 'Liquidación'
                            break;
                            case 13:
                              metodoPago = 'Pago por subrogación'
                              break;
                              case 14:
                                metodoPago = 'Pago por consignación'
                                break;
                                case 15:
                                  metodoPago = 'Condonación'
                                  break;
                                  case 17:
                                    metodoPago = 'Compensación'
                                    break;
                                    case 23:
                                      metodoPago = 'Novacion'
                                      break;
                                      case 24:
                                        metodoPago = 'Confusión'
                                        break;
                                        case 25:
                                          metodoPago = 'Envío de deuda'
                                          break;
                                          case 26:
                                            metodoPago = 'Prescripción o caducidad'
                                            break;
                                            case 27:
                                              metodoPago = 'A satisfacción del acreedor'
                                              break;
                                              case 28:
                                                metodoPago = 'Tarjeta de débito'
                                                break;
                                                case 29:
                                                  metodoPago = 'Tarjeta de servicio'
                                                  break;
              
          
            default:
              metodoPago = 'Por definir'
              break;
          }
          fecha3 = res.issuedAt.substring(0, 10)
          console.log(fecha3);
          console.log("::::::::::::::::::::");
          fecha2 = fecha3
          console.log(fecha2 + "<-----------------");
          console.log(indexCompra);
          if (fecha3!=fecha) {
            break;
          }
          if (res.items[0] != undefined ) {
            if (res.items[0].unitCode == 'LTR') {
              let RECEPCION = {
                "NumeroDeRegistro": indexCompra,
                "VolumenInicialTanque": {
                    "ValorNumerico": 0.0,
                    "UnidadDeMedida": "UM03"
                },
                "VolumenFinalTanque": 0.0,
                "VolumenRecepcion": {
                    "ValorNumerico": res.items[0].quantity,
                    "UnidadDeMedida": "UM03"
                },
                "Temperatura": 20.0,
                "PresionAbsoluta": 101.325,
                "FechaYHoraInicialEntrega": res.issuedAt,
                "FechaYHoraFinalEntrega": res.issuedAt,
                "Complemento": {
                    "TipoComplemento": "Comercializacion",
                    "Nacional": [{
                        "RfcClienteOProveedor": res.issuer.rfc,
                        "NombreClienteOProveedor": res.issuer.name,
                        "PermisoClienteOProveedor": res.items[0].identificationNumber,
                        "CFDIs": [{
                            "Cfdi": res.uuid,
                            "TipoCfdi": "Ingreso",
                            "PrecioVentaOCompraOContrap": res.items[0].totalAmount,
                            "FechaYHoraTransaccion": res.issuedAt,
                            "VolumenDocumentado": {
                                "ValorNumerico": res.items[0].quantity,
                                "UnidadDeMedida": "UM03"
                            }
                        }]
                    }]
                }
            }
              if (res.currency == 'MXN') {
                if (res.issuer.rfc == 'PTI151101TE5') {
                  // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
                  RECEPCION.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
                  RECEPCION.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
                  RECEPCION.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
                  // RECEPCION.Tanque = res.Tanque
                  // entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
                  // entrega.VolumenFinalTanque = res.VolumenFinalTanque
                  RECEPCION.VolumenInicialTanque.ValorNumerico = 0.0
                  RECEPCION.VolumenFinalTanque = 0.0
                  RECEPCION.VolumenRecepcion.ValorNumerico = res.items[0].quantity
                  RECEPCION.Temperatura = 20
                  RECEPCION.PresionAbsoluta = 101.325
                  RECEPCION.FechaYHoraInicioRecepcion = res.issuedAt
                  RECEPCION.FechaYHoraFinalRecepcion = res.issuedAt
                // console.log(tabla);
                  if (res.items[0].productIdentification == '15101514') {
                    let tanques = [2,5,8]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 2:
                        tanque2.Recepciones.RECEPCION.push(RECEPCION)
                        tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                        tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                        tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)//mxn
                        break;
                        case 5:
                          tanque5.Recepciones.RECEPCION.push(RECEPCION)
                          tanque5.Recepciones.TotalRecepciones= tanque5.Recepciones.TotalRecepciones + 1
                          tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque5.Recepciones.TotalDocumentos = tanque5.Recepciones.TotalDocumentos + 1
                          tanque5.Recepciones.SumaCompras = tanque5.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                          break;
                          case 8:
                            tanque8.Recepciones.RECEPCION.push(RECEPCION)
                            tanque8.Recepciones.TotalRecepciones= tanque8.Recepciones.TotalRecepciones + 1
                            tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                            tanque8.Recepciones.TotalDocumentos = tanque8.Recepciones.TotalDocumentos + 1
                            tanque8.Recepciones.SumaCompras = tanque8.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                            break;
                    
                      default:
                        tanque2.Recepciones.RECEPCION.push(RECEPCION)
                        tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                        tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                        tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                        break;
                    }
                  }
                  if (res.items[0].productIdentification == '15101515') {
                    let tanques = [6,3]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 6:
                        tanque6.Recepciones.RECEPCION.push(RECEPCION)
                        tanque6.Recepciones.TotalRecepciones= tanque6.Recepciones.TotalRecepciones + 1
                        tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque6.Recepciones.TotalDocumentos = tanque6.Recepciones.TotalDocumentos + 1
                        tanque6.Recepciones.SumaCompras = tanque6.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                        break;
                        case 3:
                          tanque3.Recepciones.RECEPCION.push(RECEPCION)
                          tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                          tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                          tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                          break;
                    
                      default:
                        tanque3.Recepciones.RECEPCION.push(RECEPCION)
                        tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                        tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                        tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                        break;
                    }
                  }
                  if (res.items[0].productIdentification == '15101505') {
                    let tanques = [1,7]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 1:
                        tanque1.Recepciones.RECEPCION.push(RECEPCION)
                        tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                        tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                        tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                        break;
                        case 7:
                          tanque7.Recepciones.RECEPCION.push(RECEPCION)
                          tanque7.Recepciones.TotalRecepciones= tanque7.Recepciones.TotalRecepciones + 1
                          tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque7.Recepciones.TotalDocumentos = tanque7.Recepciones.TotalDocumentos + 1
                          tanque7.Recepciones.SumaCompras = tanque7.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                          break;
                    
                      default:
                        tanque1.Recepciones.RECEPCION.push(RECEPCION)
                        tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                        tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                        tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount) //mxn
                        break;
                    }
                  }
                  const dataTabla = {
                    "UUID":res.uuid,
                    "RFC Emisor":res.issuer.rfc,
                    "Nombre del Emisor":res.issuer.name,
                    "RFC Receptor":res.receiver.rfc,
                    "Nombre del Receptor":res.receiver.name,
                    "Tipo":res.type == 'I' ? 'Ingreso':'',
                    "Estatus":res.status,
                    "PAC":res.pac,
                    "Moneda":res.currency,
                    "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                    "Método de Pago":metodoPago,
                    "Fecha de Emisión":res.issuedAt.substring(0, 10),
                    "Condiciones de pago (original)":res.paymentTermsRaw,
                    "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber : '',
                    "Clave del producto y/o servicio":res.items[0].productIdentification,
                    "Descripción":res.items[0].description,
                    "Cantidad":res.items[0].quantity,
                    "Clave de unidad":res.items[0].unitCode,
                    "Valor unitario":res.items[0].unitAmount,
                    "Descuento":res.discount,
                    "Impuesto":res.tax,
                    "Subtotal":res.items[0].totalAmount,
                    "Total":(res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount),
                    "TotalMXN": (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)
                   }
                  const tabla = {
                    RFCEmisor:res.issuer.rfc,
                    Emisor:res.issuer.name,
                    RegimenFiscal:res.issuer.taxRegime,
                    RFCReceptor:res.receiver.rfc,
                    Receptor:res.receiver.rfc,
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
                    ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                    Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                    TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
                    Moneda:res.currency,
                    VersionCFDI:res.version,
                    Fechacompleta:res.issuedAt.substring(0, 10),
                    TotalMXN:(res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)
                  }
                  if (fecha3!=fecha) {
                    break;
                  }
                   TotalMXN += parseFloat(tabla.TotalMXN);
              
                   TotalLTS += parseFloat(tabla.Cantidad);
                   jsonCompra[indexCompra] = tabla
                   compra[indexCompra] = dataTabla
                   indexCompra++
                } else {
                  // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
                  RECEPCION.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
                  RECEPCION.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
                  RECEPCION.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.items[0].totalAmount
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                  RECEPCION.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
                  // RECEPCION.Tanque = res.Tanque
                  // RECEPCION.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
                  // RECEPCION.VolumenFinalTanque = res.VolumenFinalTanque
                  RECEPCION.VolumenInicialTanque.ValorNumerico = 0.0
                  RECEPCION.VolumenFinalTanque = 0.0
                  RECEPCION.VolumenRecepcion.ValorNumerico = res.items[0].quantity
                  RECEPCION.Temperatura = 20
                  RECEPCION.PresionAbsoluta = 101.325
                  RECEPCION.FechaYHoraInicioRecepcion = res.issuedAt
                  RECEPCION.FechaYHoraFinalRecepcion = res.issuedAt
                // console.log(tabla);
                  if (res.items[0].productIdentification == '15101514') {
                    let tanques = [2,5,8]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 2:
                        tanque2.Recepciones.RECEPCION.push(RECEPCION)
                        tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                        tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                        tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                        case 5:
                          tanque5.Recepciones.RECEPCION.push(RECEPCION)
                          tanque5.Recepciones.TotalRecepciones= tanque5.Recepciones.TotalRecepciones + 1
                          tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque5.Recepciones.TotalDocumentos = tanque5.Recepciones.TotalDocumentos + 1
                          tanque5.Recepciones.SumaCompras = tanque5.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                          break;
                          case 8:
                            tanque8.Recepciones.RECEPCION.push(RECEPCION)
                            tanque8.Recepciones.TotalRecepciones= tanque8.Recepciones.TotalRecepciones + 1
                            tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                            tanque8.Recepciones.TotalDocumentos = tanque8.Recepciones.TotalDocumentos + 1
                            tanque8.Recepciones.SumaCompras = tanque8.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                            break;
                    
                      default:
                        tanque2.Recepciones.RECEPCION.push(RECEPCION)
                        tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                        tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                        tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                    }
                  }
                  if (res.items[0].productIdentification == '15101515') {
                    let tanques = [6,3]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 6:
                        tanque6.Recepciones.RECEPCION.push(RECEPCION)
                        tanque6.Recepciones.TotalRecepciones= tanque6.Recepciones.TotalRecepciones + 1
                        tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque6.Recepciones.TotalDocumentos = tanque6.Recepciones.TotalDocumentos + 1
                        tanque6.Recepciones.SumaCompras = tanque6.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                        case 3:
                          tanque3.Recepciones.RECEPCION.push(RECEPCION)
                          tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                          tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                          tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                          break;
                    
                      default:
                        tanque3.Recepciones.RECEPCION.push(RECEPCION)
                        tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                        tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                        tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                    }
                  }
                  if (res.items[0].productIdentification == '15101505') {
                    let tanques = [1,7]
                    let indexT = tanques.length * Math.random() | 0
                    switch (tanques[indexT]) {
                      case 1:
                        tanque1.Recepciones.RECEPCION.push(RECEPCION)
                        tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                        tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                        tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                        case 7:
                          tanque7.Recepciones.RECEPCION.push(RECEPCION)
                          tanque7.Recepciones.TotalRecepciones= tanque7.Recepciones.TotalRecepciones + 1
                          tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque7.Recepciones.TotalDocumentos = tanque7.Recepciones.TotalDocumentos + 1
                          tanque7.Recepciones.SumaCompras = tanque7.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                          break;
                    
                      default:
                        tanque1.Recepciones.RECEPCION.push(RECEPCION)
                        tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                        tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                        tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  res.items[0].totalAmount //mxn
                        break;
                    }
                  }
                  const dataTabla = {
                    "UUID":res.uuid,
                    "RFC Emisor":res.issuer.rfc,
                    "Nombre del Emisor":res.issuer.name,
                    "RFC Receptor":res.receiver.rfc,
                    "Nombre del Receptor":res.receiver.name,
                    "Tipo":res.type == 'I' ? 'Ingreso':'',
                    "Estatus":res.status,
                    "PAC":res.pac,
                    "Moneda":res.currency,
                    "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                    "Método de Pago":metodoPago,
                    "Fecha de Emisión":res.issuedAt.substring(0, 10),
                    "Condiciones de pago (original)":res.paymentTermsRaw,
                    "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber : '',
                    "Clave del producto y/o servicio":res.items[0].productIdentification,
                    "Descripción":res.items[0].description,
                    "Cantidad":res.items[0].quantity,
                    "Clave de unidad":res.items[0].unitCode,
                    "Valor unitario":res.items[0].unitAmount,
                    "Descuento":res.discount,
                    "Impuesto":res.tax,
                    "Subtotal":res.subtotal,
                    "Total":res.total,
                    "TotalMXN": (res.total)
                   }
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
                    ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                    Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                    TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
                    Moneda:res.currency,
                    VersionCFDI:res.version,
                    Fechacompleta:res.issuedAt.substring(0, 10),
                    TotalMXN:res.total
                  }
                  if (fecha3!=fecha) {
                    break;
                  }
                   TotalMXN += parseFloat(tabla.TotalMXN);
              
                   TotalLTS += parseFloat(tabla.Cantidad);
                   jsonCompra[indexCompra] = tabla
                   compra[indexCompra] = dataTabla
                   indexCompra++
                }
              } else {
                // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
                RECEPCION.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
                RECEPCION.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
                RECEPCION.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
                RECEPCION.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
                RECEPCION.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
                RECEPCION.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount * res.exchangeRate)
                RECEPCION.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                RECEPCION.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
                // RECEPCION.Tanque = res.Tanque
                // RECEPCION.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
                // RECEPCION.VolumenFinalTanque = res.VolumenFinalTanque
                RECEPCION.VolumenInicialTanque.ValorNumerico = 0.0
                RECEPCION.VolumenFinalTanque = 0.0
                RECEPCION.VolumenRecepcion.ValorNumerico = res.items[0].quantity
                RECEPCION.Temperatura = 20
                RECEPCION.PresionAbsoluta = 101.325
                RECEPCION.FechaYHoraInicioRecepcion = res.issuedAt
                RECEPCION.FechaYHoraFinalRecepcion = res.issuedAt
              // console.log(tabla);
                if (res.items[0].productIdentification == '15101514') {
                  let tanques = [2,5,8]
                  let indexT = tanques.length * Math.random() | 0
                  switch (tanques[indexT]) {
                    case 2:
                      tanque2.Recepciones.RECEPCION.push(RECEPCION)
                      tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                      tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                      tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                      case 5:
                        tanque5.Recepciones.RECEPCION.push(RECEPCION)
                        tanque5.Recepciones.TotalRecepciones= tanque5.Recepciones.TotalRecepciones + 1
                        tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque5.Recepciones.TotalDocumentos = tanque5.Recepciones.TotalDocumentos + 1
                        tanque5.Recepciones.SumaCompras = tanque5.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                        break;
                        case 8:
                          tanque8.Recepciones.RECEPCION.push(RECEPCION)
                          tanque8.Recepciones.TotalRecepciones= tanque8.Recepciones.TotalRecepciones + 1
                          tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque8.Recepciones.TotalDocumentos = tanque8.Recepciones.TotalDocumentos + 1
                          tanque8.Recepciones.SumaCompras = tanque8.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                          break;
                  
                    default:
                      tanque2.Recepciones.RECEPCION.push(RECEPCION)
                      tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                      tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                      tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                  }
                }
                if (res.items[0].productIdentification == '15101515') {
                  let tanques = [6,3]
                  let indexT = tanques.length * Math.random() | 0
                  switch (tanques[indexT]) {
                    case 6:
                      tanque6.Recepciones.RECEPCION.push(RECEPCION)
                      tanque6.Recepciones.TotalRecepciones= tanque6.Recepciones.TotalRecepciones + 1
                      tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque6.Recepciones.TotalDocumentos = tanque6.Recepciones.TotalDocumentos + 1
                      tanque6.Recepciones.SumaCompras = tanque6.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                      case 3:
                        tanque3.Recepciones.RECEPCION.push(RECEPCION)
                        tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                        tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                        tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                        break;
                  
                    default:
                      tanque3.Recepciones.RECEPCION.push(RECEPCION)
                      tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                      tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                      tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                  }
                }
                if (res.items[0].productIdentification == '15101505') {
                  let tanques = [1,7]
                  let indexT = tanques.length * Math.random() | 0
                  switch (tanques[indexT]) {
                    case 1:
                      tanque1.Recepciones.RECEPCION.push(RECEPCION)
                      tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                      tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                      tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                      case 7:
                        tanque7.Recepciones.RECEPCION.push(RECEPCION)
                        tanque7.Recepciones.TotalRecepciones= tanque7.Recepciones.TotalRecepciones + 1
                        tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                        tanque7.Recepciones.TotalDocumentos = tanque7.Recepciones.TotalDocumentos + 1
                        tanque7.Recepciones.SumaCompras = tanque7.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                        break;
                  
                    default:
                      tanque1.Recepciones.RECEPCION.push(RECEPCION)
                      tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                      tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                      tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                      tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].totalAmount * res.exchangeRate) //mxn
                      break;
                  }
                }
                const dataTabla = {
                  "UUID":res.uuid,
                  "RFC Emisor":res.issuer.rfc,
                  "Nombre del Emisor":res.issuer.name,
                  "RFC Receptor":res.receiver.rfc,
                  "Nombre del Receptor":res.receiver.name,
                  "Tipo":res.type == 'I' ? 'Ingreso':'',
                  "Estatus":res.status,
                  "PAC":res.pac,
                  "Moneda":res.currency,
                  "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                  "Método de Pago":metodoPago,
                  "Fecha de Emisión":res.issuedAt.substring(0, 10),
                  "Condiciones de pago (original)":res.paymentTermsRaw,
                  "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber : '',
                  "Clave del producto y/o servicio":res.items[0].productIdentification,
                  "Descripción":res.items[0].description,
                  "Cantidad":res.items[0].quantity,
                  "Clave de unidad":res.items[0].unitCode,
                  "Valor unitario":res.items[0].unitAmount,
                  "Descuento":res.discount,
                  "Impuesto":res.tax,
                  "Subtotal":res.subtotal,
                  "Total":res.total,
                  "TotalMXN":(res.total * res.exchangeRate)
                 }
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
                  ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                  Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                  TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
                  Moneda:res.currency,
                  VersionCFDI:res.version,
                  Fechacompleta:res.issuedAt.substring(0, 10),
                  TotalMXN:(res.total * res.exchangeRate)
                }
                if (fecha3!=fecha) {
                  break;
                }
                 TotalMXN += parseFloat(tabla.TotalMXN);
            
                 TotalLTS += parseFloat(tabla.Cantidad);
                 jsonCompra[indexCompra] = tabla
                 compra[indexCompra] = dataTabla
                 indexCompra++
              }
            }

          }


        // console.log(tabla);
        }

    });
    await delay(2300);
    }
    console.log("paso");
     datoCompra = {
      data:jsonCompra,
      totalMXN:TotalMXN,
      totalLTS:TotalLTS
    }
    datoCompraDiario = {
      data:datoCompra.data
    }
     tabla = datoCompra.data
     totalMXNC = datoCompra.totalMXN
     totalLTSC = datoCompra.totalLTS
     compra.forEach( record => {
      let columnIndex= 1;
      Object.keys(record ).forEach(columnName =>{
        if (isNumber(record [columnName])) {
          ws.cell(rowIndex,columnIndex++)
          .number(parseFloat(record [columnName]))
        } else {
          
          ws.cell(rowIndex,columnIndex++)
              .string(record [columnName])
        }
      });
      rowIndex++;
  }); 
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
while (ApiLengthVenta > 0 && fecha == fecha4) {
  var options = {
    'method': 'GET',
    'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
    'headers': {
      'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
    }
  };
  pagIndexVenta++

  let fecha5;

  await request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
                // console.log(diario);


    let temp = JSON.parse(response.body);
    temp = temp['hydra:member']
    ApiLengthVenta = temp.length
    for (const key in temp) {
      const res = temp[key]

      console.log(fecha5);
      fecha5 = res.issuedAt.substring(0, 10)
      fecha4 = fecha5
      // if (fecha3!=fecha) {
      //   break;
      // }
      if (res.items[0] != undefined ) {
        console.log(res.items[0].unitCode);
        if (res.items[0].unitCode == 'LTR') {

          let entrega = {
            "NumeroDeRegistro": indexVenta,
            "VolumenInicialTanque": {
                "ValorNumerico": 0.0,
                "UnidadDeMedida": "UM03"
            },
            "VolumenFinalTanque": 0.0,
            "VolumenEntregado": {
                "ValorNumerico": res.items[0].quantity,
                "UnidadDeMedida": "UM03"
            },
            "Temperatura": 20.0,
            "PresionAbsoluta": 101.325,
            "FechaYHoraInicialEntrega": res.issuedAt,
            "FechaYHoraFinalEntrega": res.issuedAt,
            "Complemento": {
                "TipoComplemento": "Comercializacion",
                "Nacional": [{
                    "RfcClienteOProveedor": res.issuer.rfc,
                    "NombreClienteOProveedor": res.issuer.name,
                    "PermisoClienteOProveedor": res.items[0].identificationNumber,
                    "CFDIs": [{
                        "Cfdi": res.uuid,
                        "TipoCfdi": "Ingreso",
                        "PrecioVentaOCompraOContrap": res.items[0].totalAmount,
                        "FechaYHoraTransaccion": res.issuedAt,
                        "VolumenDocumentado": {
                            "ValorNumerico": res.items[0].quantity,
                            "UnidadDeMedida": "UM03"
                        }
                    }]
                }]
            }
        }
          if (res.currency == 'MXN') {
            // entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.items[0].totalAmount
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
            // entrega.Tanque = res.Tanque
            // entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            // entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenInicialTanque.ValorNumerico = 0.0
            entrega.VolumenFinalTanque = 0.0
            entrega.VolumenEntregado.ValorNumerico = res.items[0].quantity
            entrega.Temperatura = 20
            entrega.PresionAbsoluta = 101.325
            entrega.FechaYHoraInicioRecepcion = res.issuedAt
            entrega.FechaYHoraFinalRecepcion = res.issuedAt
          // console.log(tabla);
            if (res.items[0].productIdentification == '15101514') {
              let tanques = [2,5,8]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 2:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
                  case 5:
                    tanque5.Entregas.Entrega.push(entrega)
                    tanque5.Entregas.TotalEntregas= tanque5.Entregas.TotalEntregas + 1
                    tanque5.Entregas.SumaVolumenEntregado.ValorNumerico = tanque5.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque5.Entregas.TotalDocumentos = tanque5.Entregas.TotalDocumentos + 1
                    tanque5.Entregas.SumaCompras = tanque5.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                    break;
                    case 8:
                      tanque8.Entregas.Entrega.push(entrega)
                      tanque8.Entregas.TotalEntregas= tanque8.Entregas.TotalEntregas + 1
                      tanque8.Entregas.SumaVolumenEntregado.ValorNumerico = tanque8.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                      tanque8.Entregas.TotalDocumentos = tanque8.Entregas.TotalDocumentos + 1
                      tanque8.Entregas.SumaCompras = tanque8.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                      break;
              
                default:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101515') {
              let tanques = [6,3]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 6:
                  tanque6.Entregas.Entrega.push(entrega)
                  tanque6.Entregas.TotalEntregas= tanque6.Entregas.TotalEntregas + 1
                  tanque6.Entregas.SumaVolumenEntregado.ValorNumerico = tanque6.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque6.Entregas.TotalDocumentos = tanque6.Entregas.TotalDocumentos + 1
                  tanque6.Entregas.SumaCompras = tanque6.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
                  case 3:
                    tanque3.Entregas.Entrega.push(entrega)
                    tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                    tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                    tanque3.Entregas.SumaCompras = tanque3.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                    break;
              
                default:
                  tanque3.Entregas.Entrega.push(entrega)
                  tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                  tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                  tanque3.Entregas.SumaCompras = tanque3.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101505') {
              let tanques = [1,7]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 1:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
                  case 7:
                    tanque7.Entregas.Entrega.push(entrega)
                    tanque7.Entregas.TotalEntregas= tanque7.Entregas.TotalEntregas + 1
                    tanque7.Entregas.SumaVolumenEntregado.ValorNumerico = tanque7.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque7.Entregas.TotalDocumentos = tanque7.Entregas.TotalDocumentos + 1
                    tanque7.Entregas.SumaCompras = tanque7.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                    break;
              
                default:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.SumaCompras +  res.items[0].totalAmount //mxn
                  break;
              }
            }
            const dataTabla = {
              "UUID":res.uuid,
              "RFC Emisor":res.issuer.rfc,
              "Nombre del Emisor":res.issuer.name,
              "RFC Receptor":res.receiver.rfc,
              "Nombre del Receptor":res.receiver.name,
              "Tipo":res.type == 'I' ? 'Ingreso':'',
              "Estatus":res.status,
              "PAC":res.pac,
              "Moneda":res.currency,
              "Fecha de Certificación":res.certifiedAt.substring(0, 10),
              "Método de Pago":metodoPago,
              "Fecha de Emisión":res.issuedAt.substring(0, 10),
              "Condiciones de pago (original)":res.paymentTermsRaw,
              "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
              "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
              "Descripción":res.items[0].description,
              "Cantidad":res.items[0].quantity.toString(),
              "Clave de unidad":res.items[0].unitCode,
              "Valor unitario":res.items[0].unitAmount.toString(),
              "Descuento":res.discount.toString(),
              "Impuesto":res.tax.toString(),
              "Subtotal":res.subtotal.toString(),
              "Total":res.total.toString(),
              "TotalMXN": (res.total).toString()
             }
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
              ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
              Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
              TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
              Moneda:res.currency,
              VersionCFDI:res.version,
              Fechacompleta:res.issuedAt.substring(0, 10),
              TotalMXN:res.total
            }
            
            if (fecha5!=fecha) {
              break;
            }
            totalMXNVT += parseFloat(tabla.TotalMXN);
            totalLTSVT += parseFloat(tabla.Cantidad);
            jsonVenta[indexVenta] = tabla
            venta[indexVenta] = dataTabla
             indexVenta++
          } else {
            // entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.total * res.exchangeRate)
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
            // entrega.Tanque = res.Tanque
            // entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            // entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenInicialTanque.ValorNumerico = 0.0
            entrega.VolumenFinalTanque = 0.0
            entrega.VolumenEntregado.ValorNumerico = res.items[0].quantity
            entrega.Temperatura = 20
            entrega.PresionAbsoluta = 101.325
            entrega.FechaYHoraInicioRecepcion = res.issuedAt
            entrega.FechaYHoraFinalRecepcion = res.issuedAt
          // console.log(tabla);
            if (res.items[0].productIdentification == '15101514') {
              let tanques = [2,5,8]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 2:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
                  case 5:
                    tanque5.Entregas.Entrega.push(entrega)
                    tanque5.Entregas.TotalEntregas= tanque5.Entregas.TotalEntregas + 1
                    tanque5.Entregas.SumaVolumenEntregado.ValorNumerico = tanque5.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque5.Entregas.TotalDocumentos = tanque5.Entregas.TotalDocumentos + 1
                    tanque5.Entregas.SumaCompras = tanque5.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                    break;
                    case 8:
                      tanque8.Entregas.Entrega.push(entrega)
                      tanque8.Entregas.TotalEntregas= tanque8.Entregas.TotalEntregas + 1
                      tanque8.Entregas.SumaVolumenEntregado.ValorNumerico = tanque8.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                      tanque8.Entregas.TotalDocumentos = tanque8.Entregas.TotalDocumentos + 1
                      tanque8.Entregas.SumaCompras = tanque8.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                      break;
              
                default:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101515') {
              let tanques = [6,3]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 6:
                  tanque6.Entregas.Entrega.push(entrega)
                  tanque6.Entregas.TotalEntregas= tanque6.Entregas.TotalEntregas + 1
                  tanque6.Entregas.SumaVolumenEntregado.ValorNumerico = tanque6.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque6.Entregas.TotalDocumentos = tanque6.Entregas.TotalDocumentos + 1
                  tanque6.Entregas.SumaCompras = tanque6.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
                  case 3:
                    tanque3.Entregas.Entrega.push(entrega)
                    tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                    tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                    tanque3.Entregas.SumaCompras = tanque3.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                    break;
              
                default:
                  tanque3.Entregas.Entrega.push(entrega)
                  tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                  tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                  tanque3.Entregas.SumaCompras = tanque3.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101505') {
              let tanques = [1,7]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 1:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
                  case 7:
                    tanque7.Entregas.Entrega.push(entrega)
                    tanque7.Entregas.TotalEntregas= tanque7.Entregas.TotalEntregas + 1
                    tanque7.Entregas.SumaVolumenEntregado.ValorNumerico = tanque7.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque7.Entregas.TotalDocumentos = tanque7.Entregas.TotalDocumentos + 1
                    tanque7.Entregas.SumaCompras = tanque7.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                    break;
              
                default:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.SumaCompras +  (res.total * res.exchangeRate) //mxn
                  break;
              }
            }
            const dataTabla = {
              "UUID":res.uuid,
              "RFC Emisor":res.issuer.rfc,
              "Nombre del Emisor":res.issuer.name,
              "RFC Receptor":res.receiver.rfc,
              "Nombre del Receptor":res.receiver.name,
              "Tipo":res.type == 'I' ? 'Ingreso':'',
              "Estatus":res.status,
              "PAC":res.pac,
              "Moneda":res.currency,
              "Fecha de Certificación":res.certifiedAt.substring(0, 10),
              "Método de Pago":metodoPago,
              "Fecha de Emisión":res.issuedAt.substring(0, 10),
              "Condiciones de pago (original)":res.paymentTermsRaw,
              "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
              "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
              "Descripción":res.items[0].description,
              "Cantidad":res.items[0].quantity.toString(),
              "Clave de unidad":res.items[0].unitCode,
              "Valor unitario":res.items[0].unitAmount.toString(),
              "Descuento":res.discount.toString(),
              "Impuesto":res.tax.toString(),
              "Subtotal":res.subtotal.toString(),
              "Total":res.total.toString(),
              "TotalMXN": (res.total * res.exchangeRate).toString()
             }
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
              ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
              Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
              TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
              Moneda:res.currency,
              VersionCFDI:res.version,
              Fechacompleta:res.issuedAt.substring(0, 10),
              TotalMXN:(res.total * res.exchangeRate)
            }
            
            if (fecha5!=fecha) {
              break;
            }
            totalMXNVT += parseFloat(tabla.TotalMXN);
            totalLTSVT += parseFloat(tabla.Cantidad);
            jsonVenta[indexVenta] = tabla
            venta[indexVenta] = dataTabla
             indexVenta++
          }
        }

      }


    // console.log(tabla);
    }

});
await delay(2300);
venta.forEach( record => {
  let columnIndex2= 1;
  Object.keys(record ).forEach(columnName =>{
    if (isNumber(record [columnName])) {
      ws2.cell(rowIndex2,columnIndex2++)
      .number(parseFloat(record [columnName]))
    } else {
      
      ws2.cell(rowIndex2,columnIndex2++)
          .string(record [columnName])
    }
  });
  rowIndex2++;
}); 
}
const datoVenta = {
  data:jsonVenta,
  totalMXN:totalMXNVT,
  totalLTS:totalLTSVT
}
datoVentaDiario = {
  data:datoVenta.data
}
// console.log(data);
 tablaVenta = datoVenta.data
 totalMXNV = datoVenta.totalMXN
 totalLTSV = datoVenta.totalLTS
  
const diferenciaMXN = (totalMXNC - totalMXNV).toFixed(2)
const diferenciaLTS = (totalLTSC - totalLTSV).toFixed(2)
await delay(1000);
let gas87 =require(path.join(__dirname, '../public/json/glencore/separarGas87.json'))
let gas91 =require(path.join(__dirname, '../public/json/glencore/separarGas91.json'))
let disel =require(path.join(__dirname, '../public/json/glencore/separarDisel.json'))

let estructura =require(path.join(__dirname, '../public/json/glencore/glencoreEstructura.json'))
gas87.Tanque.push(tanque2)
gas87.Tanque.push(tanque5)
gas87.Tanque.push(tanque8)

gas91.Tanque.push(tanque1)
gas91.Tanque.push(tanque7)

disel.Tanque.push(tanque3)
disel.Tanque.push(tanque6)
const event = new Date();
// expected output: Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)
// (note: your timezone may vary)


estructura.Bitacora[0].NumeroRegistro = indexCompra + indexCompra
estructura.Bitacora[0].FechaYHoraEvento = event.toISOString().slice(0,-1)
estructura.FechaYHoraCorte = event.toISOString().slice(0,-1)

estructura.Producto.push(gas87)
estructura.Producto.push(gas91)
estructura.Producto.push(disel)

let fileNameKey = `DiarioTemp`

// const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
//  fs.promises.mkdir(dirpath, { recursive: true })
const fileJsonName = path.join(__dirname, `../public/json/glencore/DiarioTemp/${fileNameKey}.json`);
fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
  if (err) return console.log(err);

});
const FileCompra = path.join(__dirname, `../public/json/glencore/DiarioTemp/Compra${fecha}.json`);
fs.writeFile(FileCompra, JSON.stringify(datoCompra,null, 2), function writeJSON(err) {
  if (err) return console.log(err);

});
const FileVenta = path.join(__dirname, `../public/json/glencore/DiarioTemp/Venta${fecha}.json`);
fs.writeFile(FileVenta, JSON.stringify(datoVenta,null, 2), function writeJSON(err) {
  if (err) return console.log(err);

});
wb.write(path.join(__dirname, `../public/Excel/Diario_${fecha}.xlsx`));

await delay(2000);
  res.render('VistaPrueba/diario',{tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS});








});
router.get('/Mensual/:fecha', async (req, res) => {
  console.log("mess");
  const xl = require('excel4node');
console.log("Empieza");
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Compra');
const ws2 = wb.addWorksheet('Venta');

const headingColumnNames = [
  "UUID",
  "RFC Emisor",
  "Nombre del Emisor",
  "RFC Receptor",
  "Nombre del Receptor",
  "Tipo",
  "Estatus",
  "PAC",
  "Moneda",
  "Fecha de Certificación",
  "Método de Pago",
  "Fecha de Emisión",
  "Condiciones de pago (original)",
  "No. Identificación",
  "Clave del producto y/o servicio",
  "Descripción",
  "Cantidad",
  "Clave de unidad",
  "Valor unitario",
  "Descuento",
  "Impuesto",
  "Subtotal",
  "Total",
  "TotalMXN"
]//Write Column Title in Excel file

var pagIndexCompra = 1
var pagIndexVenta = 1
let headingColumnIndex = 1;
let headingColumnIndex2 = 1;
let rowIndex = 2;
const compra = [

]
let rowIndex2 = 2;
//  let index2 = 0
const venta = [

]
headingColumnNames.forEach(heading => {
ws.cell(1, headingColumnIndex++)
    .string(heading)
});//Write Data in Excel file headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
ws2.cell(1, headingColumnIndex2++)
    .string(heading)
});//Write Data in Excel file

var request = require('request');
// let temp;2022-10-25
var datoCompra;

let fecha = req.params.fecha
const fechasplit = fecha.split("-")
if (fechasplit[1].length == 1) {

  fecha = `${fechasplit[0]}-0${fechasplit[1]}`
}
console.log(fecha)


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
      'method': 'GET',
      'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
      'headers': {
        'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
      }
    };
    pagIndexCompra++

    let fecha3;

  /*
  
  15101505 == DISEL 
  15101514 == 87 OCTANOS
  15101515 == 91 OCTANOS
  */
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
                  // console.log(diario);


      let temp = JSON.parse(response.body);
      temp = temp['hydra:member']
      console.log("@@@@@@@@@@@");
      ApiLength = temp.length

      for (const key in temp) {
        const res = temp[key]
        fecha3 = res.issuedAt.substring(0, 10)
        fecha2 = fecha3
        console.log(fecha3);
        if (res.items[0] != undefined ) {
          if (res.items[0].unitCode == 'LTR') {
            let RECEPCION = {
              "TipoComplemento": "Comercializacion",
              "Nacional": [{
                  "RfcClienteOProveedor": "PTI151101TE5",
                  "NombreClienteOProveedor": "PEMEX TRANSFORMACION INDUSTRIAL",
                  "PermisoClienteOProveedor": "H/09857/COM/2015",
                  "CFDIs": [{
                      "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
                      "TipoCfdi": "Ingreso",
                      "PrecioVentaOCompraOContrap": 0.0,
                      "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
                      "VolumenDocumentado": {
                          "ValorNumerico": 0.0,
                          "UnidadDeMedida": "UM03"
                      }
                  }]
              }]
          }
            if (res.currency == 'MXN') {
              if (res.issuer.rfc == 'PTI151101TE5') {
                console.log("pemex");
                // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
                RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
                RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
                RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
                RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
                RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
                RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)
                RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
               
              // console.log(tabla);
                if (res.items[0].productIdentification == '15101514') {

                  productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)//mxn
                  
                  productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
                }
                if (res.items[0].productIdentification == '15101515') {
                  productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)//mxn

                  productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

                }
                if (res.items[0].productIdentification == '15101505') {
                  productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)//mxn
                  productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

                }
                let metodoPago = ''
                switch (res.paymentMethod) {
                  case 01:
                    metodoPago = 'Efectivo'
                    break;
                    case 02:
                      metodoPago = 'Cheque de nómina'
                      break;
                      case 03:
                        metodoPago = 'Transferencia electrónica'
                        break;
                        case 04:
                          metodoPago = 'Tarjeta de crédito'
                          break;
                          case 05:
                            metodoPago = 'Monedero electrónico'
                            break;
                            case 06:
                              metodoPago = 'Dinero digital'
                              break;
                              case 08:
                                metodoPago = 'Vales de despensa'
                                break;
                                case 12:
                                  metodoPago = 'Liquidación'
                                  break;
                                  case 13:
                                    metodoPago = 'Pago por subrogación'
                                    break;
                                    case 14:
                                      metodoPago = 'Pago por consignación'
                                      break;
                                      case 15:
                                        metodoPago = 'Condonación'
                                        break;
                                        case 17:
                                          metodoPago = 'Compensación'
                                          break;
                                          case 23:
                                            metodoPago = 'Novacion'
                                            break;
                                            case 24:
                                              metodoPago = 'Confusión'
                                              break;
                                              case 25:
                                                metodoPago = 'Envío de deuda'
                                                break;
                                                case 26:
                                                  metodoPago = 'Prescripción o caducidad'
                                                  break;
                                                  case 27:
                                                    metodoPago = 'A satisfacción del acreedor'
                                                    break;
                                                    case 28:
                                                      metodoPago = 'Tarjeta de débito'
                                                      break;
                                                      case 29:
                                                        metodoPago = 'Tarjeta de servicio'
                                                        break;
                    
                
                  default:
                    metodoPago = 'Por definir'
                    break;
                }
                const dataExcel = {
                  "UUID":res.uuid,
                  "RFC Emisor":res.issuer.rfc,
                  "Nombre del Emisor":res.issuer.name,
                  "RFC Receptor":res.receiver.rfc,
                  "Nombre del Receptor":res.receiver.name,
                  "Tipo":res.type == 'I' ? 'Ingreso':'',
                  "Estatus":res.status,
                  "PAC":res.pac,
                  "Moneda":res.currency,
                  "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                  "Método de Pago":metodoPago,
                  "Fecha de Emisión":res.issuedAt.substring(0, 10),
                  "Condiciones de pago (original)":res.paymentTermsRaw,
                  "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                  "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                  "Descripción":res.items[0].description,
                  "Cantidad":res.items[0].quantity.toString(),
                  "Clave de unidad":res.items[0].unitCode,
                  "Valor unitario":res.items[0].unitAmount.toString(),
                  "Descuento":res.discount.toString(),
                  "Impuesto":res.tax.toString(),
                  "Subtotal":res.items[0].totalAmount.toString(),
                  "Total":(res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount).toString(),
                  "TotalMXN": (res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount).toString()
                 }
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
                  ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                  Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                  TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
                  Moneda:res.currency,
                  VersionCFDI:res.version,
                  Fechacompleta:res.issuedAt.substring(0, 10),
                  TotalMXN:(res.items[0].discountAmount-res.items[0].taxAmount+res.items[0].totalAmount)
                }
                // if (fecha3!=fecha) {
                //   break;
                // }
                 TotalMXN += parseFloat(tabla.TotalMXN);
            
                 TotalLTS += parseFloat(tabla.Cantidad);
                 jsonCompra[indexCompra] = tabla
                 compra[indexCompra] = dataExcel
                 indexCompra++
              } else {
                console.log("normal");
                RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
                RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
                RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
                RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
                RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
                RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
                RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
               
              // console.log(tabla);
                if (res.items[0].productIdentification == '15101514') {

                  productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
                  
                  productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
                }
                if (res.items[0].productIdentification == '15101515') {
                  productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn

                  productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

                }
                if (res.items[0].productIdentification == '15101505') {
                  productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
                  productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

                }
                let metodoPago = ''
                switch (res.paymentMethod) {
                  case 01:
                    metodoPago = 'Efectivo'
                    break;
                    case 02:
                      metodoPago = 'Cheque de nómina'
                      break;
                      case 03:
                        metodoPago = 'Transferencia electrónica'
                        break;
                        case 04:
                          metodoPago = 'Tarjeta de crédito'
                          break;
                          case 05:
                            metodoPago = 'Monedero electrónico'
                            break;
                            case 06:
                              metodoPago = 'Dinero digital'
                              break;
                              case 08:
                                metodoPago = 'Vales de despensa'
                                break;
                                case 12:
                                  metodoPago = 'Liquidación'
                                  break;
                                  case 13:
                                    metodoPago = 'Pago por subrogación'
                                    break;
                                    case 14:
                                      metodoPago = 'Pago por consignación'
                                      break;
                                      case 15:
                                        metodoPago = 'Condonación'
                                        break;
                                        case 17:
                                          metodoPago = 'Compensación'
                                          break;
                                          case 23:
                                            metodoPago = 'Novacion'
                                            break;
                                            case 24:
                                              metodoPago = 'Confusión'
                                              break;
                                              case 25:
                                                metodoPago = 'Envío de deuda'
                                                break;
                                                case 26:
                                                  metodoPago = 'Prescripción o caducidad'
                                                  break;
                                                  case 27:
                                                    metodoPago = 'A satisfacción del acreedor'
                                                    break;
                                                    case 28:
                                                      metodoPago = 'Tarjeta de débito'
                                                      break;
                                                      case 29:
                                                        metodoPago = 'Tarjeta de servicio'
                                                        break;
                    
                
                  default:
                    metodoPago = 'Por definir'
                    break;
                }
                const dataExcel = {
                  "UUID":res.uuid,
                  "RFC Emisor":res.issuer.rfc,
                  "Nombre del Emisor":res.issuer.name,
                  "RFC Receptor":res.receiver.rfc,
                  "Nombre del Receptor":res.receiver.name,
                  "Tipo":res.type == 'I' ? 'Ingreso':'',
                  "Estatus":res.status,
                  "PAC":res.pac,
                  "Moneda":res.currency,
                  "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                  "Método de Pago":metodoPago,
                  "Fecha de Emisión":res.issuedAt.substring(0, 10),
                  "Condiciones de pago (original)":res.paymentTermsRaw,
                  "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                  "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                  "Descripción":res.items[0].description,
                  "Cantidad":res.items[0].quantity.toString(),
                  "Clave de unidad":res.items[0].unitCode,
                  "Valor unitario":res.items[0].unitAmount.toString(),
                  "Descuento":res.discount.toString(),
                  "Impuesto":res.tax.toString(),
                  "Subtotal":res.subtotal.toString(),
                  "Total":res.total.toString(),
                  "TotalMXN": (res.items[0].totalAmount).toString()
                 }
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
                  ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                  Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                  TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
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
              console.log("usd");
              RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
              RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
              RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
              RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
              RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
              RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount * res.exchangeRate)
              RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
              RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
             
            // console.log(tabla);
              if (res.items[0].productIdentification == '15101514') {

                productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
                productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn
                
                productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
              }
              if (res.items[0].productIdentification == '15101515') {
                productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn

                productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

              }
              if (res.items[0].productIdentification == '15101505') {
                productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn
                productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

              }
              let metodoPago = ''
              switch (res.paymentMethod) {
                case 01:
                  metodoPago = 'Efectivo'
                  break;
                  case 02:
                    metodoPago = 'Cheque de nómina'
                    break;
                    case 03:
                      metodoPago = 'Transferencia electrónica'
                      break;
                      case 04:
                        metodoPago = 'Tarjeta de crédito'
                        break;
                        case 05:
                          metodoPago = 'Monedero electrónico'
                          break;
                          case 06:
                            metodoPago = 'Dinero digital'
                            break;
                            case 08:
                              metodoPago = 'Vales de despensa'
                              break;
                              case 12:
                                metodoPago = 'Liquidación'
                                break;
                                case 13:
                                  metodoPago = 'Pago por subrogación'
                                  break;
                                  case 14:
                                    metodoPago = 'Pago por consignación'
                                    break;
                                    case 15:
                                      metodoPago = 'Condonación'
                                      break;
                                      case 17:
                                        metodoPago = 'Compensación'
                                        break;
                                        case 23:
                                          metodoPago = 'Novacion'
                                          break;
                                          case 24:
                                            metodoPago = 'Confusión'
                                            break;
                                            case 25:
                                              metodoPago = 'Envío de deuda'
                                              break;
                                              case 26:
                                                metodoPago = 'Prescripción o caducidad'
                                                break;
                                                case 27:
                                                  metodoPago = 'A satisfacción del acreedor'
                                                  break;
                                                  case 28:
                                                    metodoPago = 'Tarjeta de débito'
                                                    break;
                                                    case 29:
                                                      metodoPago = 'Tarjeta de servicio'
                                                      break;
                  
              
                default:
                  metodoPago = 'Por definir'
                  break;
              }
              const dataExcel = {
                "UUID":res.uuid,
                "RFC Emisor":res.issuer.rfc,
                "Nombre del Emisor":res.issuer.name,
                "RFC Receptor":res.receiver.rfc,
                "Nombre del Receptor":res.receiver.name,
                "Tipo":res.type == 'I' ? 'Ingreso':'',
                "Estatus":res.status,
                "PAC":res.pac,
                "Moneda":res.currency,
                "Fecha de Certificación":res.certifiedAt.substring(0, 10),
                "Método de Pago":metodoPago,
                "Fecha de Emisión":res.issuedAt.substring(0, 10),
                "Condiciones de pago (original)":res.paymentTermsRaw,
                "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                "Descripción":res.items[0].description,
                "Cantidad":res.items[0].quantity.toString(),
                "Clave de unidad":res.items[0].unitCode,
                "Valor unitario":res.items[0].unitAmount.toString(),
                "Descuento":res.discount.toString(),
                "Impuesto":res.tax.toString(),
                "Subtotal":res.subtotal.toString(),
                "Total":res.total.toString(),
                "TotalMXN": (res.items[0].totalAmount * res.exchangeRate).toString()
               }
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
                ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
                Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
                TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
                Moneda:res.currency,
                VersionCFDI:res.version,
                Fechacompleta:res.issuedAt.substring(0, 10),
                TotalMXN:(res.items[0].totalAmount * res.exchangeRate)
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
          }

        }


      // console.log(tabla);
      }

  });
  await delay(2300);
  }
  console.log("paso");
   datoCompra = {
    data:jsonCompra,
    totalMXN:TotalMXN,
    totalLTS:TotalLTS
  }
  datoCompraMensual = {
    data:datoCompra.data
  }
   tabla = datoCompra.data
   totalMXNC = datoCompra.totalMXN
   totalLTSC = datoCompra.totalLTS

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
  'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
  'headers': {
    'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
  }
};
pagIndexVenta++

let fecha5;

await request(options, function (error, response) {
  if (error) throw new Error(error);
  // console.log(response.body);
              // console.log(diario);


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
        let entrega = {
          "TipoComplemento": "Comercializacion",
          "Nacional": [{
              "RfcClienteOProveedor": "PTI151101TE5",
              "NombreClienteOProveedor": "PEMEX TRANSFORMACION INDUSTRIAL",
              "PermisoClienteOProveedor": "H/09857/COM/2015",
              "CFDIs": [{
                  "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
                  "TipoCfdi": "Ingreso",
                  "PrecioVentaOCompraOContrap": 0.0,
                  "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
                  "VolumenDocumentado": {
                      "ValorNumerico": 0.0,
                      "UnidadDeMedida": "UM03"
                  }
              }]
          }]
      }
        if (res.currency == 'MXN') {
            entrega.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
            entrega.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
            entrega.Nacional[0].PermisoClienteOProveedor = res.name
            entrega.Nacional[0].CFDIs[0].Cfdi = res.uuid
            entrega.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            entrega.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
            entrega.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            entrega.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
           
          // console.log(tabla);
            if (res.items[0].productIdentification == '15101514') {

              productoGas87.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
              productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
              
              productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
            }
            if (res.items[0].productIdentification == '15101515') {
              productoGas91.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
              productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn

              productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

            }
            if (res.items[0].productIdentification == '15101505') {
              productoDisel.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
              productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
              productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

            }
            let metodoPago = ''
            switch (res.paymentMethod) {
              case 01:
                metodoPago = 'Efectivo'
                break;
                case 02:
                  metodoPago = 'Cheque de nómina'
                  break;
                  case 03:
                    metodoPago = 'Transferencia electrónica'
                    break;
                    case 04:
                      metodoPago = 'Tarjeta de crédito'
                      break;
                      case 05:
                        metodoPago = 'Monedero electrónico'
                        break;
                        case 06:
                          metodoPago = 'Dinero digital'
                          break;
                          case 08:
                            metodoPago = 'Vales de despensa'
                            break;
                            case 12:
                              metodoPago = 'Liquidación'
                              break;
                              case 13:
                                metodoPago = 'Pago por subrogación'
                                break;
                                case 14:
                                  metodoPago = 'Pago por consignación'
                                  break;
                                  case 15:
                                    metodoPago = 'Condonación'
                                    break;
                                    case 17:
                                      metodoPago = 'Compensación'
                                      break;
                                      case 23:
                                        metodoPago = 'Novacion'
                                        break;
                                        case 24:
                                          metodoPago = 'Confusión'
                                          break;
                                          case 25:
                                            metodoPago = 'Envío de deuda'
                                            break;
                                            case 26:
                                              metodoPago = 'Prescripción o caducidad'
                                              break;
                                              case 27:
                                                metodoPago = 'A satisfacción del acreedor'
                                                break;
                                                case 28:
                                                  metodoPago = 'Tarjeta de débito'
                                                  break;
                                                  case 29:
                                                    metodoPago = 'Tarjeta de servicio'
                                                    break;
                
            
              default:
                metodoPago = 'Por definir'
                break;
            }
            const dataExcel = {
              "UUID":res.uuid,
              "RFC Emisor":res.issuer.rfc,
              "Nombre del Emisor":res.issuer.name,
              "RFC Receptor":res.receiver.rfc,
              "Nombre del Receptor":res.receiver.name,
              "Tipo":res.type == 'I' ? 'Ingreso':'',
              "Estatus":res.status,
              "PAC":res.pac,
              "Moneda":res.currency,
              "Fecha de Certificación":res.certifiedAt,
              "Método de Pago":metodoPago,
              "Fecha de Emisión":res.issuedAt,
              "Condiciones de pago (original)":res.paymentTermsRaw,
              "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
              "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
              "Descripción":res.items[0].description,
              "Cantidad":res.items[0].quantity.toString(),
              "Clave de unidad":res.items[0].unitCode,
              "Valor unitario":res.items[0].unitAmount.toString(),
              "Descuento":res.discount.toString(),
              "Impuesto":res.tax.toString(),
              "Subtotal":res.subtotal.toString(),
              "Total":res.total.toString(),
              "TotalMXN": (res.items[0].totalAmount).toString()
             }
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
              ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
              Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
              TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
              Moneda:res.currency,
              VersionCFDI:res.version,
              Fechacompleta:res.issuedAt.substring(0, 10),
              TotalMXN:(res.items[0].totalAmount)
            }
            // if (fecha5!=fecha) {
            //   break;
            // }
             venta[indexVenta] = dataExcel
             totalMXNVT += parseFloat(tabla.TotalMXN);
             totalLTSVT += parseFloat(tabla.Cantidad);
             jsonVenta[indexVenta] = tabla
              indexVenta++

        } else {
            // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
            entrega.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
            entrega.Nacional[0].PermisoClienteOProveedor = res.name
            entrega.Nacional[0].CFDIs[0].Cfdi = res.uuid
            entrega.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            entrega.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.total * res.exchangeRate)
            entrega.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            entrega.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
           
          // console.log(tabla);
            if (res.items[0].productIdentification == '15101514') {

              productoGas87.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
              productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn
              
              productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
            }
            if (res.items[0].productIdentification == '15101515') {
              productoGas91.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
              productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn

              productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

            }
            if (res.items[0].productIdentification == '15101505') {
              productoDisel.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
              productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
              productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
              productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn
              productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

            }
            let metodoPago = ''
            switch (res.paymentMethod) {
              case 01:
                metodoPago = 'Efectivo'
                break;
                case 02:
                  metodoPago = 'Cheque de nómina'
                  break;
                  case 03:
                    metodoPago = 'Transferencia electrónica'
                    break;
                    case 04:
                      metodoPago = 'Tarjeta de crédito'
                      break;
                      case 05:
                        metodoPago = 'Monedero electrónico'
                        break;
                        case 06:
                          metodoPago = 'Dinero digital'
                          break;
                          case 08:
                            metodoPago = 'Vales de despensa'
                            break;
                            case 12:
                              metodoPago = 'Liquidación'
                              break;
                              case 13:
                                metodoPago = 'Pago por subrogación'
                                break;
                                case 14:
                                  metodoPago = 'Pago por consignación'
                                  break;
                                  case 15:
                                    metodoPago = 'Condonación'
                                    break;
                                    case 17:
                                      metodoPago = 'Compensación'
                                      break;
                                      case 23:
                                        metodoPago = 'Novacion'
                                        break;
                                        case 24:
                                          metodoPago = 'Confusión'
                                          break;
                                          case 25:
                                            metodoPago = 'Envío de deuda'
                                            break;
                                            case 26:
                                              metodoPago = 'Prescripción o caducidad'
                                              break;
                                              case 27:
                                                metodoPago = 'A satisfacción del acreedor'
                                                break;
                                                case 28:
                                                  metodoPago = 'Tarjeta de débito'
                                                  break;
                                                  case 29:
                                                    metodoPago = 'Tarjeta de servicio'
                                                    break;
                
            
              default:
                metodoPago = 'Por definir'
                break;
            }
            const dataExcel = {
              "UUID":res.uuid,
              "RFC Emisor":res.issuer.rfc,
              "Nombre del Emisor":res.issuer.name,
              "RFC Receptor":res.receiver.rfc,
              "Nombre del Receptor":res.receiver.name,
              "Tipo":res.type == 'I' ? 'Ingreso':'',
              "Estatus":res.status,
              "PAC":res.pac,
              "Moneda":res.currency,
              "Fecha de Certificación":res.certifiedAt,
              "Método de Pago":metodoPago,
              "Fecha de Emisión":res.issuedAt,
              "Condiciones de pago (original)":res.paymentTermsRaw,
              "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
              "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
              "Descripción":res.items[0].description,
              "Cantidad":res.items[0].quantity.toString(),
              "Clave de unidad":res.items[0].unitCode,
              "Valor unitario":res.items[0].unitAmount.toString(),
              "Descuento":res.discount.toString(),
              "Impuesto":res.tax.toString(),
              "Subtotal":res.subtotal.toString(),
              "Total":res.total.toString(),
              "TotalMXN": (res.total * res.exchangeRate).toString()
             }
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
              ImporteImpuesto:res.items[0] != undefined ? res.items[0].taxes[0].amount : '',
              Impuesto:res.items[0] != undefined ? res.items[0].taxes[0].tax : '',
              TasaOCuota:res.items[0] != undefined ? res.items[0].taxes[0].factor.amount : '',
              Moneda:res.currency,
              VersionCFDI:res.version,
              Fechacompleta:res.issuedAt.substring(0, 10),
              TotalMXN:(res.total * res.exchangeRate)
            }
            // if (fecha5!=fecha) {
            //   break;
            // }
             venta[indexVenta] = dataExcel
             totalMXNVT += parseFloat(tabla.TotalMXN);
             totalLTSVT += parseFloat(tabla.Cantidad);
             jsonVenta[indexVenta] = tabla
              indexVenta++
        }
      }

    }


  // console.log(tabla);
  }

});
await delay(2300);

}
const datoVenta = {
data:jsonVenta,
totalMXN:totalMXNVT,
totalLTS:totalLTSVT
}
datoVentaMensual = {
  data:datoVenta.data
}
// console.log(data);
tablaVenta = datoVenta.data
totalMXNV = datoVenta.totalMXN
totalLTSV = datoVenta.totalLTS

const diferenciaMXN = (totalMXNC - totalMXNV).toFixed(2)
const diferenciaLTS = (totalLTSC - totalLTSV).toFixed(2)
await delay(1000);


let estructura =require(path.join(__dirname, '../public/json/glencore/Mensual/MensualEstructura.json'))
const event = new Date();
estructura.BitacoraMensual[0].NumeroRegistro = indexCompra + indexCompra
estructura.BitacoraMensual[0].FechaYHoraEvento = event.toISOString().slice(0,-1)
estructura.FechaYHoraReporteMes = event.toISOString().slice(0,-1)

estructura.Producto.push(productoGas87)
estructura.Producto.push(productoGas91)
estructura.Producto.push(productoDisel)
compra.forEach( record => {
let columnIndex= 1;
Object.keys(record ).forEach(columnName =>{
  if (isNumber(record [columnName])) {
    ws.cell(rowIndex,columnIndex++)
    .number(parseFloat(record [columnName]))
  } else {
    
    ws.cell(rowIndex,columnIndex++)
        .string(record [columnName])
  }
});
rowIndex++;
}); 
await delay(1000);
console.log("Venta");
venta.forEach( record => {
    let columnIndex2= 1;
    Object.keys(record ).forEach(columnName =>{
      if (isNumber(record [columnName])) {
        ws2.cell(rowIndex2,columnIndex2++)
        .number(parseFloat(record [columnName]))
      } else {
        
        ws2.cell(rowIndex2,columnIndex2++)
            .string(record [columnName])
      }
    });
    rowIndex2++;
  }); 
wb.write(path.join(__dirname, `../public/Excel/Mes_${fecha}.xlsx`));
let fileNameKey = `MesTemp`

// const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
//  fs.promises.mkdir(dirpath, { recursive: true })
const fileJsonName = path.join(__dirname, `../public/json/glencore/DiarioTemp/${fileNameKey}.json`);
fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
if (err) return console.log(err);

});
await delay(2000);
res.render('VistaPrueba/Mensual',{tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS});


});

router.post('/calendar/simple',async (req,res) =>{
     const tareas = await pool.query("select *,DATE_FORMAT(Fecha,'%d-%m-%Y') AS date from tarea");
     res.send(tareas)

});
router.post('/Diario/json/modalCompra',async (req,res) =>{
  const id = req.body.id
  const tabla = datoCompraDiario.data[`${id}`]
  res.send(tabla)
});
router.post('/Diario/json/modalVenta',async (req,res) =>{
  const id = req.body.id
  const tabla = datoVentaDiario.data[`${id}`]
  res.send(tabla)
});
router.post('/Mensual/json/modalCompraMensual',async (req,res) =>{
  const id = req.body.id
  const tabla = datoCompraMensual.data[`${id}`]
  res.send(tabla)
});
router.post('/Mensual/json/modalVentaMensual',async (req,res) =>{
  const id = req.body.id
  const tabla = datoVentaMensual.data[`${id}`]
  res.send(tabla)
});
router.post('/json/borrarVenta',async (req,res) =>{
  const id = req.body.id
  delete datoVenta.data[`${id}`]

  let TotalMXNC = 0.00;
  let TotalLTSC = 0.00;
  let TotalMXNV = 0.00;
  let TotalLTSV = 0.00;
  for (const key in datoCompra.data) {
    TotalMXNC += parseFloat(datoCompra.data[key].TotalMXN);
    TotalLTSC += parseFloat(datoCompra.data[key].Cantidad);
  }
  datoCompra.totalMXN = TotalMXNC
  datoCompra.totalLTS = TotalLTSC
  for (const key in datoVenta.data) {
    TotalMXNV += parseFloat(datoVenta.data[key].Monto.slice(2, -1).replace(',',''));

    TotalLTSV += parseFloat(datoVenta.data[key].Cantidad);
  }
  datoVenta.totalMXN = TotalMXNV
  datoVenta.totalLTS = TotalLTSV
  res.send(datoVenta.data)
});
router.post('/json/borrarCompra',async (req,res) =>{
  const id = req.body.id
  delete datoCompra.data[`${id}`]
  let TotalMXNC = 0.00;
  let TotalLTSC = 0.00;
  let TotalMXNV = 0.00;
  let TotalLTSV = 0.00;
  for (const key in datoCompra.data) {
    TotalMXNC += parseFloat(datoCompra.data[key].TotalMXN);
    TotalLTSC += parseFloat(datoCompra.data[key].Cantidad);
  }
  datoCompra.totalMXN = TotalMXNC
  datoCompra.totalLTS = TotalLTSC
  for (const key in datoVenta.data) {
    TotalMXNV += parseFloat(datoVenta.data[key].Monto.slice(2, -1).replace(',',''));

    TotalLTSV += parseFloat(datoVenta.data[key].Cantidad);
  }
  datoVenta.totalMXN = TotalMXNV
  datoVenta.totalLTS = TotalLTSV
  res.send(datoCompra.data)
});
router.post('/json/borrarVentaMensual',async (req,res) =>{
  const id = req.body.id
  delete datoVentaMensual.data[`${id}`]
  let TotalMXNC = 0.00;
  let TotalLTSC = 0.00;
  let TotalMXNV = 0.00;
  let TotalLTSV = 0.00;
  for (const key in datoCompraMensual.data) {
    TotalMXNC += parseFloat(datoCompraMensual.data[key].TotalMXN);
    TotalLTSC += parseFloat(datoCompraMensual.data[key].Cantidad);
  }
  datoCompraMensual.totalMXN = TotalMXNC
  datoCompraMensual.totalLTS = TotalLTSC
  for (const key in datoVentaMensual.data) {
    TotalMXNV += parseFloat(datoVentaMensual.data[key].Monto.slice(2, -1).replace(',',''));

    TotalLTSV += parseFloat(datoVentaMensual.data[key].Cantidad);
  }
  datoVentaMensual.totalMXN = TotalMXNV
  datoVentaMensual.totalLTS = TotalLTSV
  res.send(datoVentaMensual.data)
});
router.post('/json/borrarCompraMensual',async (req,res) =>{
  const id = req.body.id
  delete datoCompraMensual.data[`${id}`]
  let TotalMXNC = 0.00;
  let TotalLTSC = 0.00;
  let TotalMXNV = 0.00;
  let TotalLTSV = 0.00;
  for (const key in datoCompraMensual.data) {
    TotalMXNC += parseFloat(datoCompraMensual.data[key].TotalMXN);
    TotalLTSC += parseFloat(datoCompraMensual.data[key].Cantidad);
  }
  datoCompraMensual.totalMXN = TotalMXNC
  datoCompraMensual.totalLTS = TotalLTSC
  for (const key in datoVentaMensual.data) {
    TotalMXNV += parseFloat(datoVentaMensual.data[key].Monto.slice(2, -1).replace(',',''));

    TotalLTSV += parseFloat(datoVentaMensual.data[key].Cantidad);
  }
  datoVentaMensual.totalMXN = TotalMXNV
  datoVentaMensual.totalLTS = TotalLTSV
  res.send(datoCompraMensual.data)
});
router.post('/get/pdf',async (req,res) =>{
     const id = req.body.id
     let id_file = await pool.query("select * from tarea where id = ?", [id]);
     id_file = id_file[0].id_File
     const idF = id_file
     let file = await pool.query("select * from treefile2 where id = ?", [idF]);
     file = file[0].fileName
     res.send(`${file}`)

});
router.post('/create/pdfTask',async (req,res) =>{
     // const tareas = await pool.query("select *,DATE_FORMAT(Fecha,'%d-%m-%Y') AS date from tarea");

     const info = req.body
     const id = info['data[id]']
     let tareas = await pool.query(`select * from tarea where id = ${id}`);
     tareas = tareas[0]

     let nameFile = tareas.descTarea + id + acomodarFecha(DateNow())
     nameFile = nameFile.replace(' ', '')
     nameFile = nameFile.replace('  ', '')

     const data = {
          volumenIts : info['data[volumenIts]'],
          volumenBbls : info['data[volumenBbls]'],
          fechaMuestreo : info['data[fechaMuestreo]'],
          fehcaOR : info['data[fehcaOR]'],
          fechaED : info['data[fechaED]'],
          fechaAnalisis : info['data[fechaAnalisis]'],
          Producto : info['data[Producto]'],
          nRegistro : info['data[nRegistro]'],
          Objeto : info['data[Objeto]'],
          nombre : nameFile
     }

     const dataFile = {
          fileName: nameFile,
          ext:'pdf',
          position : '9.7.1',
          Avalible:1,
          date:acomodarFecha(DateNow())
     }
     PDF(data)
     await pool.query("INSERT INTO treefile2 SET ?",[dataFile])
     let idmax = await pool.query("select MAX(id) as id from treefile2");

     idmax = idmax[0].id

     await pool.query(`update tarea set id_File = ${idmax} where id = ${id}`);
     res.send(data)

});
router.post('/add/file',async (req,res) =>{
     try {
          const fileP = req.body.position
          let max
      
          let dataP;
          if (fileP ==  '1') {
            dataP = '1.1'
          } else {
           max = await pool.query(`SELECT position as position FROM treefile2 where position like '${fileP}%';`);
           let  positions = [];
           const dots = fileP.split(".").length;

           let max1 = null;
           if (max == null) {
                dataP = fileP + '.1'
           }else{
                for (const key in max) {
                     const temp =max[key].position
                     if (temp.split(".").length - 1 == dots) {

                          positions.push(temp.substr(temp.length - 1) - 1 + 1)
                          max1 = max[key].position
                     }
                }
                const maxP = Math.max(...positions) + 1
          
                if (max1==null) {
                     dataP = fileP + '.1'
                } else {

                     dataP = max1.replace(/.$/,`${maxP}`)
                }
           }
          }

          var fileName = req.body.fileName
          var file = fileName.split('.')

          const data = {
               fileName: file[0],
               ext:file[1],
               position : dataP,
               Avalible:1,
               date:acomodarFecha(DateNow())
          }

          await pool.query("INSERT INTO treefile2 SET ?",[data])
          dirRoot = arbolArchivos();
           res.send(dirRoot)
     } catch (error) {
          console.log(error);
          res.send(error)
     }

});
router.post('/addFile', upload.single('file'),  function (req, res, next) {
     const fileName = req.file.originalname
     res.send(acomodarFecha(DateNow())+'-'+fileName)
})
router.post('/add/file/Certificado',async (req,res) =>{
  try {
      const Nombre = req.body.Nombre
      var fileName = req.body.fileName
      const data = {
        Nombre:Nombre,
        Fecha:acomodarFecha(DateNow()),
        File:fileName

      }
      await pool.query("INSERT INTO certificado SET ?",[data])
      const tabla = await pool.query(`select Nombre,DATE_FORMAT(Fecha,'%d-%m-%Y') as Fecha,File  from certificado`)
      res.send(tabla)
  } catch (error) {
       console.log(error);
       res.send(error)
  }

});
router.post('/addFile/Certificado', upload7.single('file'),  function (req, res, next) {
  const fileName = req.file.originalname
  res.send(fileName)
})
router.post('/create/json', upload6.single('excel'),  function (req, res, next) {
  const fileName = req.file.originalname;
  ExcelJson(fileName)
  res.send('holla')

})
router.post('/add/equipo',  async (req, res) => {
  const data = req.body
  await pool.query("INSERT INTO equipo SET ?",[data])

  const tabla = await pool.query("Select *,DATE_FORMAT(fCalibracion,'%d-%m-%Y') as date from equipo");
  res.send(tabla)

})
const delay = ms => new Promise(res => setTimeout(res, ms));
router.post('/Diario/Excel/Diario/:fecha',  async (req, res) => {
  let fecha = req.params.fecha
  const fechasplit = fecha.split("-")
  if (fechasplit[2].length == 1) {
    fecha = `${fechasplit[0]}-${fechasplit[1]}-0${fechasplit[2]}`
  }
  if (fechasplit[1].length == 1) {

    fecha = `${fechasplit[0]}-0${fechasplit[1]}-${fechasplit[2]}`
  }
  console.log(fecha);
  const tabla = await ExcelApiCreate(fecha)
  await delay(5000);
  // if (fs.existsSync(path.join(__dirname, `../public/excel/Diario_${fecha}.xlsx`))) {
  //   console.log('file exists');
  // } else {
  //   console.log('file not found!');
  // }
  while (!fs.existsSync(path.join(__dirname, `../public/excel/Diario_${fecha}.xlsx`))) {
    await delay(2000);
  }

  res.send("ok")

})

router.get('/Diario/Download/ExcelDiario/:fecha', async(req, res) => {
    let fecha = req.params.fecha
    const fechasplit = fecha.split("-")
    if (fechasplit[2].length == 1) {
      fecha = `${fechasplit[0]}-${fechasplit[1]}-0${fechasplit[2]}`
    }
    if (fechasplit[1].length == 1) {

      fecha = `${fechasplit[0]}-0${fechasplit[1]}-${fechasplit[2]}`
    }
    const pathExcel = path.join(__dirname, `../public/excel/Diario_${fecha}.xlsx`);
    res.download(pathExcel);
    // res.send('ok')
  })

  
  router.get('/Mensual/Download/ExcelMensual/:fecha', async(req, res) => {
      let fecha = req.params.fecha

      const pathExcel = path.join(__dirname, `../public/excel/Mes_${fecha}.xlsx`);
      res.download(pathExcel);
      // res.send('ok')
    })

router.get('/Diario/Download/ZipDiario/:fecha', async(req, res) => {
  const fecha = req.params.fecha
  const letters = ['a','b','c','d','e','f']
const mayus = ['A','B','C','D','E','F']

let keyEnvio = ''
indexletters = 1
for (let index = 0; index < 32; index++) {
  // console.log(keyEnvio);
  if ((index== 8) ||(index== 12) ||(index== 16)||(index== 20) ) {
      keyEnvio+="-";
  }
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      keyEnvio+=Math.floor(Math.random() * 10);
      break;
      case 1:
        keyEnvio+=letters[Math.floor(Math.random() * 6)]
        break;
        case 2:
          keyEnvio+=mayus[Math.floor(Math.random() * 6)]
          break;
  
    default:
      break;
  }
  indexletters++;
}
let diario =require(path.join(__dirname, '../public/json/glencore/DiarioTemp/DiarioTemp.json'))
const pathJson = path.join(__dirname, "../public/json/glencoreTest/")
removeDirDiario(pathJson)
  let fileNameKey = `D_${keyEnvio}_GEM161104H39_XAX010101000_${fecha}_CMN-0001_CMN_JSON`
  // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
  //  fs.promises.mkdir(dirpath, { recursive: true })
  const fileJsonName = path.join(__dirname, `../public/json/glencoreTest/${fileNameKey}.json`);
  fs.writeFile(fileJsonName, JSON.stringify(diario,null, 2), function writeJSON(err) {
    if (err) return console.log(err);

  });

  const files = path.join(__dirname, `../public/json/glencoreTest`);
  const zip = path.join(__dirname, `../public/json/${fileNameKey}.zip`);
  await zipDirectory(files,zip)
  const pathZip = path.join(__dirname, `../public/json/${fileNameKey}.zip`);
  res.download(pathZip);
  // res.send('ok')
})
router.get('/Mensual/Download/ZipMensual/:fecha', async(req, res) => {
  const fecha = req.params.fecha
  const letters = ['a','b','c','d','e','f']
  const mayus = ['A','B','C','D','E','F']
  
  let keyEnvio = ''
  indexletters = 1
  for (let index = 0; index < 32; index++) {
    // console.log(keyEnvio);
    if ((index== 8) ||(index== 12) ||(index== 16)||(index== 20) ) {
        keyEnvio+="-";
    }
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        keyEnvio+=Math.floor(Math.random() * 10);
        break;
        case 1:
          keyEnvio+=letters[Math.floor(Math.random() * 6)]
          break;
          case 2:
            keyEnvio+=mayus[Math.floor(Math.random() * 6)]
            break;
    
      default:
        break;
    }
    indexletters++;
  }
  let Mensual =require(path.join(__dirname, '../public/json/glencore/DiarioTemp/MesTemp.json'))

  const pathJson = path.join(__dirname, "../public/json/glencore/glencoreMensualJson/")
  removeDirDiario(pathJson)
  let fechaSplit = fecha.split("-")
  let lastDayMonth = new Date(fechaSplit[0],fechaSplit[1],0);
  lastDayMonth = lastDayMonth.toString().split(" ")
    let fileNameKey = `M_${keyEnvio}_GEM161104H39_XAX010101000_${fecha}-${lastDayMonth[2]}_CMN-0001_CMN_JSON`
    // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
    //  fs.promises.mkdir(dirpath, { recursive: true })
    const fileJsonName = path.join(__dirname, `../public/json/glencore/glencoreMensualJson/${fileNameKey}.json`);
    fs.writeFile(fileJsonName, JSON.stringify(Mensual,null, 2), function writeJSON(err) {
      if (err) return console.log(err);
  
    });
  
    const files = path.join(__dirname, `../public/json/glencore/glencoreMensualJson`);
    const zip = path.join(__dirname, `../public/json/${fileNameKey}.zip`);
    await zipDirectory(files,zip)
    const pathZip = path.join(__dirname, `../public/json/${fileNameKey}.zip`);
    res.download(pathZip);
  // res.send('ok')
})
router.post('/add/task',async (req,res) =>{
     try {
          const fileP = req.body.position
          let max = await pool.query(`SELECT position as position FROM treefile2 where position like '${fileP}%';`);
          let  positions = [];
          const dots = fileP.split(".").length;

          let dataP;
          let max1 = null;
          if (max == null) {
               dataP = fileP + '.1'
          }else{
               for (const key in max) {
                    const temp =max[key].position
                    if (temp.split(".").length - 1 == dots) {

                         positions.push(temp.substr(temp.length - 1) - 1 + 1)
                         max1 = max[key].position
                    }
               }
               const maxP = Math.max(...positions) + 1
               
               if (max1==null) {
                    dataP = fileP + '.1'
               } else {

                    dataP = max1.replace(/.$/,`${maxP}`)
               }
          }
          var fileName = req.body.fileName
          var file = fileName.split('.')

          const data = {
               fileName: file[0],
               ext:file[1],
               position : dataP,
               Avalible:0,
               date:acomodarFecha(DateNow())
          }

          await pool.query("INSERT INTO treefile2 SET ?",[data])
          const last_id = await pool.query('SELECT max(id) as id FROM treefile2')
            dirRoot = await arbolArchivos();
            const nameTask = req.body.name
            const dateTask = req.body.date
            const tarea = req.body.task
            const dataTask = {
               descTarea: nameTask,
               tarea:tarea,
               id_File : last_id[0].id,
               Finished:0,
               Fecha:dateTask
          }
          await pool.query("INSERT INTO tarea SET ?",[dataTask])
           res.send(true)
     } catch (error) {
          console.log(error);
          res.send(error)
     }

});
router.post('/change/img',async (req,res) =>{

       const id = req.body.id
       const fileName = req.body.fileName
       await pool.query(`update equipo set img = "${fileName}" where id = ${id}`);
       res.send(fileName)

});

router.post('/add/certificado',async (req,res) =>{

  const id = req.body.id
  const fileName = req.body.fileName
  const Certificado = req.body.Certificado
  const Nombre = req.body.Nombre

  const data= {
    id_equipo:id,
    Nombre:Nombre,
    Certificado:Certificado,
    Fecha_Ingreso:acomodarFecha(DateNow()),
    FileName:fileName
  }
  await pool.query("INSERT INTO certificado_equipo SET ?",[data])
  const tabla = await pool.query(`Select *,DATE_FORMAT(Fecha_Ingreso,'%d-%m-%Y') as date from certificado_equipo where id_equipo = ${id}`);

  res.send(tabla)

});
router.post('/add/documento',async (req,res) =>{

  const id = req.body.id
  const fileName = req.body.fileName
  const Tipo = req.body.Tipo
  const Nombre = req.body.Nombre
  
  const data= {
    id_equipo:id,
    Nombre:Nombre,
    Tipo:Tipo,
    Fecha_Ingreso:acomodarFecha(DateNow()),
    FileName:fileName
  }
  await pool.query("INSERT INTO documental_equipo SET ?",[data])
  const tabla = await pool.query(`Select *,DATE_FORMAT(Fecha_Ingreso,'%d-%m-%Y') as date from documental_equipo where id_equipo = ${id}`);

  res.send(tabla)

});
router.post('/addTask', upload.single('task'),  function (req, res, next) {
     const fileName = req.file.originalname
     res.send(acomodarFecha(DateNow())+'-'+fileName)
})
router.post('/changeIMG', upload2.single('task'),  function (req, res, next) {
  const fileName = req.file.originalname
  res.send(acomodarFecha(DateNow())+'-'+fileName)
})
router.post('/addCertificado', upload3.single('task'),  function (req, res, next) {
  const fileName = req.file.originalname
  res.send(acomodarFecha(DateNow())+'-'+fileName)
})
router.post('/addDocumento', upload4.single('task'),  function (req, res, next) {
  const fileName = req.file.originalname
  res.send(acomodarFecha(DateNow())+'-'+fileName)
})
router.post('/finish/task',async (req,res) =>{
     const id = req.body.id
     const file_id = req.body.file_id
     await pool.query("update tarea set Finished = 1 where id = ?",[id]);
     await pool.query("update treefile2 set Avalible = 1 where id = ?",[file_id]);

     res.send(true)

});



// var getMostRecent = function (dir, cb) {
//   var dir = path.resolve(dir);
//   var files = fs.readdir(dir, function (err, files) {
//     // console.log(files);
//           var sorted = files.map(function(v) {
//             var filepath = path.resolve(dir, v);
//             if (filepath.indexOf('.pdf') != -1) {

//                 // console.log(filepath);
//                 return {
//                   name:v,
//                   time:fs.statSync(filepath).mtime.getTime()
//                 };
//             }


//         })
//         .sort(function(a, b) { return b.time - a.time; })
//         .map(function(v) { if (v != undefined) {
//           return v.name;
//         }  });

//           if (sorted.length > 0) {
//               cb(null, sorted[0]);
//           } else {
//               cb('Y U NO have files in this dir?');
//           }

//   })
// }
 function codigoFecha(tareas) {
     var datoFecha = {}
     datoFecha["Curso"] = {};
     datoFecha["retraso"] = {};


     for (const key in tareas) {

           var dateObj = new Date();
           var mes = dateObj.getUTCMonth() + 1; //mes de 1-12
           var dia = dateObj.getUTCDate();
           var año = dateObj.getUTCFullYear();
           const fecha1 = `${dia}-${mes}-${año}`;
           const fecha2 = tareas[key].date;
           const resta = restaFechas(fecha1, fecha2);
           if (resta < 0) {

             datoFecha["retraso"][`${tareas[key].descTarea}`] = {Fecha:resta,proveedor:tareas[key].tarea};
           }
           else {
             datoFecha["Curso"][`${tareas[key].descTarea}`] = {Fecha:resta,proveedor:tareas[key].tarea};
           }
     }


     return datoFecha;

   }
   function sortObject(obj) {
     var arr = [];
     for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
             arr.push({
                 'Fecha': prop,
                 'proveedor': obj[prop]
             });
         }
     }
     arr.sort(function(a, b) { return a.value - b.value; });
     //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
     return arr; // returns array
   }
   restaFechas = function (f1, f2) {
     var aFecha1 = f1.split('-');
     var aFecha2 = f2.split('-');
     var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
     var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
     var dif = fFecha2 - fFecha1;
     var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
     return dias;
   }

  async function arbolArchivos(){
     const file = await pool.query('SELECT * FROM `treefile2` where Avalible = 1')
     const directory = await pool.query('SELECT * FROM `treedirectory2`');
     let root = {};
     for (const key in directory) {
          let directoryname =directory[key].position
          if (directoryname.indexOf(".") == -1) {
               root[directory[key].position] = {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
          }else{
               let position = directoryname.split(".")
               switch (position.length) {
                    case 2:
                         root[position[0]]['dir'][position[1]]= {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
                         break;
                         case 3:
                              root[position[0]]['dir'][position[1]]['dir'][position[2]]= {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
                              break;
                              case 4:
                                // console.log(root[position[0]]['dir'][position[1]]['dir']);
                                // console.log(position);
                                   root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]= {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
                                   break;
                                   case 5:
                                        root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]['dir'][position[4]]= {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
                                        break;
                                        case 6:
                                          root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]['dir'][position[4]]['dir'][position[5]]= {dirName:directory[key].dirName,file:{},dir:{},position:directoryname}
                                          break;

                    default:
                         break;
               }
          }
     }
     for (const key in file) {
          let fileP =file[key].position

          let position = fileP.split(".")

          switch (position.length) {
               case 2:
                    root[position[0]]['file'][position[1]]= {fileName:file[key].fileName,ext:file[key].ext}
                    break;
                    case 3:
                         root[position[0]]['dir'][position[1]]['file'][position[2]]= {fileName:file[key].fileName,ext:file[key].ext}
                         break;
                         case 4:
                              root[position[0]]['dir'][position[1]]['dir'][position[2]]['file'][position[3]]= {fileName:file[key].fileName,ext:file[key].ext}
                              break;
                              case 5:
                                   root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]['file'][position[4]]= {fileName:file[key].fileName,ext:file[key].ext}
                                   break;
                                   case 6:
                                        root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]['dir'][position[4]]['file'][position[5]]= {fileName:file[key].fileName,ext:file[key].ext}
                                        break;
                                        case 7:
                                          root[position[0]]['dir'][position[1]]['dir'][position[2]]['dir'][position[3]]['dir'][position[4]]['dir'][position[5]]['file'][position[6]]= {fileName:file[key].fileName,ext:file[key].ext}
                                          break;

               default:
                    break;
          }
     }
     return root;
  }

  function acomodarFecha(date) {
     const split = date.split("-");
     const fecha = `${split[2]}-${split[1]}-${split[0]}`;
     return fecha;
   }
   function DateNow() {
     let date = new Date()

     let day = date.getDate()
     let month = date.getMonth() + 1
     let year = date.getFullYear()
     let fecha = "";
     if (month < 10) {
       fecha = `${day}-0${month}-${year}`
     } else {
       fecha = `${day}-${month}-${year}`
     }
     return fecha
   }


    function ExcelJson(fileName) {
      const path = require('path');
      // Requiring the module
      const reader = require('xlsx')

      const file = reader.readFile(path.join(__dirname, '../public/Excel/',fileName));

      try {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[2]], {
            raw: false
          })
          const json = {}

          let index=0
        temp.forEach((res) => {
          json[index] = res;
          index++;
        })
        const fileJsonName = path.join(__dirname, '../public/json/json.json');
        fs.writeFile(fileJsonName, JSON.stringify(json,null, 2), function writeJSON(err) {
          if (err) return console.log(err);
          // console.log(JSON.stringify(temp));

        });
      } catch (e) {
        console.log(e);
      }


    }
    function ExcelDiarioCompra() {
      const path = require('path');
      // Requiring the module

      const reader = require('xlsx')
      var today = new Date();
      var today1 = today.toISOString()
      const file = reader.readFile(path.join(__dirname, '../public/Excel/kotch.xlsx'));

      // console.log(diario);
      const json = {}
      let TotalMXN = 0.00;
      let TotalLTS = 0.00;
      try {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[0]], {
            raw: false
          })
          const titulosReducido ={}
          let index=0
        temp.forEach((res) => {
          const tabla = {
            RFCEmisor:res['RFC Emisor'],
            Emisor:res['Emisor'],
            RegimenFiscal:res['Regimen Fiscal'],
            LugarExpedicion:res['Lugar Expedicion'],
            RFCReceptor:res['RFC Receptor'],
            Receptor:res['Receptor'],
            RegimenFiscalReceptor:res['RegimenFiscalReceptor'],
            DomicilioFiscalReceptor:res['DomicilioFiscalReceptor'],
            UsoCFDI:res['UsoCFDI'],
            Exportacion:res['Exportacion'],
            Estatus:res['Estatus'],
            FechaEmision:res['Fecha Emision'],
            FullDate:res['Full Date'],
            SerieFolio:res['SerieFolio'],
            Serie:res['Serie'],
            Folio:res['Folio'],
            Subtotal:res['Subtotal'],
            Descuento:res['Descuento'],
            IVA:res['IVA'],
            ISR:res['ISR'],
            IEPS:res['IEPS'],
            TASAIVA:res['TASA IVA'],
            TASAISR:res['TASA ISR'],
            TASAIEPS:res['TASA IEPS'],
            Total:res['Total'],
            UUID:res['UUID'],
            Tipocomprobante:res['Tipo comprobante'],
            Unidad:res['Unidad'],
            ClaveUnidad:res['Clave Unidad'],
            Cantidad:res['Cantidad'],
            Descripcion:res['Descripcion'],
            Valorunitario:res['Valor unitario'],
            ImporteConcepto:res['Importe Concepto'],
            DescuentoConcepto:res['Descuento Concepto'],
            NoIdentificacion:res['No Identificacion'],
            ClaveSAT:res['Clave SAT'],
            ObjetoIMP:res['ObjetoIMP'],
            DescripcionSAT:res['Descripcion SAT'],
            Base:res['Base'],
            ImporteImpuesto:res['Importe Impuesto'],
            Impuesto:res['Impuesto'],
            TasaOCuota:res['TasaOCuota'],
            TipoFactor:res['TipoFactor'],
            Emisor_1:res['Emisor_1'],
            Receptor_1:res['Receptor_1'],
            Moneda:res['Moneda'],
            TipoCambio:res['Tipo Cambio'],
            TASAIMP_LOCAL_T:res['TASA IMP_LOCAL_T'],
            IMP_LOCAL_T:res['IMP_LOCAL_T'],
            LugarExpedicion_1:res['Lugar Expedicion_1'],
            VersionCFDI:res['Version CFDI'],
            Fechacompleta:res['Fecha completa'].substring(0, 10),
            TotalMXN:res['Total MXN']
          }
           TotalMXN += parseFloat(tabla.TotalMXN);

           TotalLTS += parseFloat(tabla.Cantidad);
          json[index] = tabla
          index++
        })



      } catch (e) {
        console.log(e);
      }

      const data = {
        data:json,
        totalMXN:TotalMXN,
        totalLTS:TotalLTS
      }
    return data

    }
    function ExcelDiarioVenta() {
      const path = require('path');
      // Requiring the module
      // const diario = require(path.join(__dirname, '../public/json/GuiasJsonBase/jsonDiarioGlencoreDisel.json'))

      const reader = require('xlsx')
      var today = new Date();
      var today1 = today.toISOString()
      const file = reader.readFile(path.join(__dirname, '../public/Excel/ventas.xlsx'));

      // console.log(diario);
      const json = {}
      let TotalMXN = 0.00;
      let TotalLTS = 0.00;
      try {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[0]], {
            raw: false
          })
          const titulosReducido ={}
          let index=0
        temp.forEach((res) => {
          let OCTANOS = res['Producto'].split(' ')
          OCTANOS= OCTANOS[3];

          const tabla = {
            Voucher: res[' Voucher'] ,
            Folio: res['Folio'] ,
            Tipo: res['Tipo'] ,
            Estatus: res['Estatus'] ,
            Cliente: res['Cliente'] ,
            Fecha: res['Fecha'] ,
            FechaVencimiento:res['Fecha Vencimiento'],
            Subtotal: res[' Subtotal '] ,
            Iva: res[' Iva '] ,
            Monto: res['Monto'] ,
            Interes: res['Interes'] ,
            Moneda: res['Moneda'] ,
            PorVencer: res['Por Vencer'] ,
            Atraso: res['Atraso'] ,
            Observaciones: res['Observaciones'] ,
            Cantidad: res['Cantidad'] ,
            OrdendeCompra: res['Orden de Compra'] ,
            Producto: res['Producto'] ,
            UUID: res['UUID'] ,
            Source_name: res['Source.name'] ,
            __EMPTY: 'PEMEX'
          }
          let diario;
          TotalMXN += parseFloat(tabla.Monto.slice(2, -1).replace(',',''));

          TotalLTS += parseFloat(tabla.Cantidad);
          json[index] = tabla
          index++
        })



      } catch (e) {
        console.log(e);
      }
      const data = {
        data:json,
        totalMXN:TotalMXN,
        totalLTS:TotalLTS
      }
    return data

    }
   async function ApiDiarioCompra(fecha) {
      var request = require('request');
      // let temp;2022-10-25
      var data;
      if (fecha== null) {
        fecha = acomodarFecha(DateNow())
      }
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      await request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
                    // console.log(diario);
            let index = 0;
            const json = {}
            let TotalMXN = 0.00;
            let TotalLTS = 0.00;
        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        // console.log(temp);
        for (const key in temp) {
          const res = temp[key]
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
          Unidad:res.items[0].unitCode,
          Cantidad:res.items[0].quantity,
          Descripcion:res.items[0].description,
          Valorunitario:res.items[0].unitAmount,
          ImporteConcepto:res.items[0].totalAmount,
          DescuentoConcepto:res.items[0].discountAmount,
          NoIdentificacion:res.items[0].identificationNumber,
          ClaveSAT:res.items[0].productIdentification,
          ImporteImpuesto:res.items[0].taxes[0].amount,
          Impuesto:res.items[0].taxes[0].tax,
          TasaOCuota:res.items[0].taxes[0].factor.amount,
          Moneda:res.currency,
          VersionCFDI:res.version,
          Fechacompleta:res.issuedAt.substring(0, 10),
          TotalMXN:res.total
        }
         TotalMXN += parseFloat(tabla.TotalMXN);
  
         TotalLTS += parseFloat(tabla.Cantidad);
        json[index] = tabla
        index++
        // console.log(tabla);
        }
       data = {
        data:json,
        totalMXN:TotalMXN,
        totalLTS:TotalLTS
      }
      // console.log(data);
    return  data
    });






    }
    async function ApiDiarioVenta(fecha) {
      var request = require('request');
      // let temp;2022-10-25
      if (fecha== null) {
        fecha = acomodarFecha(DateNow())
      }
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&issuer.rfc=GEM161104H39`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      await request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
                    // console.log(diario);
            let index = 0;
            const json = {}
            let TotalMXN = 0.00;
            let TotalLTS = 0.00;
        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        // console.log(temp);
        for (const key in temp) {
          const res = temp[key]
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
          Unidad:res.items[0].unitCode,
          Cantidad:res.items[0].quantity,
          Descripcion:res.items[0].description,
          Valorunitario:res.items[0].unitAmount,
          ImporteConcepto:res.items[0].totalAmount,
          DescuentoConcepto:res.items[0].discountAmount,
          NoIdentificacion:res.items[0].identificationNumber,
          ClaveSAT:res.items[0].productIdentification,
          ImporteImpuesto:res.items[0].taxes[0].amount,
          Impuesto:res.items[0].taxes[0].tax,
          TasaOCuota:res.items[0].taxes[0].factor.amount,
          Moneda:res.currency,
          VersionCFDI:res.version,
          Fechacompleta:res.issuedAt.substring(0, 10),
          TotalMXN:res.total
        }
         TotalMXN += parseFloat(tabla.TotalMXN);
  
         TotalLTS += parseFloat(tabla.Cantidad);
        json[index] = tabla
        index++
        // console.log(tabla);
        }
        const data = {
          data:json,
          totalMXN:TotalMXN,
          totalLTS:TotalLTS
        }
      // console.log(data);
       return data
      });


    }
    function ExcelMensualVenta() {
      const path = require('path');
      // Requiring the module
      // const diario = require(path.join(__dirname, '../public/json/GuiasJsonBase/jsonDiarioGlencoreDisel.json'))

      const reader = require('xlsx')
      var today = new Date();
      var today1 = today.toISOString()
      const file = reader.readFile(path.join(__dirname, '../public/Excel/ventas1.xlsx'));

      // console.log(diario);
      const json = {}
      let TotalMXN = 0.00;
      let TotalLTS = 0.00;
      try {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[0]], {
            raw: false
          })
          const titulosReducido ={}
          let index=0
        temp.forEach((res) => {
          let OCTANOS = res['Producto'].split(' ')
          OCTANOS= OCTANOS[3];

          const tabla = {
            Voucher: res[' Voucher'] ,
            Folio: res['Folio'] ,
            Tipo: res['Tipo'] ,
            Estatus: res['Estatus'] ,
            Cliente: res['Cliente'] ,
            Fecha: res['Fecha'] ,
            FechaVencimiento:res['Fecha Vencimiento'],
            Subtotal: res[' Subtotal '] ,
            Iva: res[' Iva '] ,
            Monto: res['Monto'] ,
            Interes: res['Interes'] ,
            Moneda: res['Moneda'] ,
            PorVencer: res['Por Vencer'] ,
            Atraso: res['Atraso'] ,
            Observaciones: res['Observaciones'] ,
            Cantidad: res['Cantidad'] ,
            OrdendeCompra: res['Orden de Compra'] ,
            Producto: res['Producto'] ,
            UUID: res['UUID'] ,
            Source_name: res['Source.name'] ,
            __EMPTY: 'PEMEX'
          }
          let diario;
          TotalMXN += parseFloat(tabla.Monto.slice(2, -1).replace(',',''));

          TotalLTS += parseFloat(tabla.Cantidad);
          if (res['Producto'].indexOf('GASOLINA') != -1) {
             diario = require(path.join(__dirname, '../public/json/GuiasJsonBase/jsonDiarioGlencoreGasolina.json'))
            let OCTANOS = res['Producto'].split(' ')
            OCTANOS= OCTANOS[3];
            diario.ControlesVolumetricos.PRODUCTO.Gasolina.ComposOctanajeGasolina =  OCTANOS

          }else{
             diario = require(path.join(__dirname, '../public/json/GuiasJsonBase/jsonDiarioGlencoreDisel.json'))
          }
          const date = new Date(tabla.Fecha).toISOString()

          diario.ControlesVolumetricos.RfcContribuyente = 'GEM161104H39';
          diario.ControlesVolumetricos.RfcRepresentanteLegal = 'GEM161104H39'
          diario.ControlesVolumetricos.RfcProveedor =  ''
          diario.ControlesVolumetricos.FechaYHoraCorte =  date
          diario.ControlesVolumetricos.BITACORA.NumeroRegistro =  index
          diario.ControlesVolumetricos.BITACORA.FechaYHoraEvento =  today1
          diario.Complemento_Comercializacion.RfcClienteOProveedor =  ''
          diario.Complemento_Comercializacion.NombreClienteOProveedor = tabla.Cliente
          // diario.Complemento_Comercializacion.PermisoProveedor =


          diario.Complemento_Comercializacion.NACIONAL.CFDIs.CFDI = tabla.UUID,
          diario.Complemento_Comercializacion.NACIONAL.CFDIs.TipoCFDI = 'Egreso',
          diario.Complemento_Comercializacion.NACIONAL.CFDIs.PrecioVentaOCompraOContrap = tabla.Monto,
          diario.Complemento_Comercializacion.NACIONAL.CFDIs.FechayHoraTransaccion =  date,

          diario.Complemento_Comercializacion.NACIONAL.CFDIs.VolumenDocumentado.ValorNumerico = tabla.Cantidad,
          diario.Complemento_Comercializacion.NACIONAL.CFDIs.VolumenDocumentado.UM = "UM03"

           json[index] = tabla;
          // console.log(res);
          index++;
          const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Venta/${tabla.OrdendeCompra}`);
           fs.promises.mkdir(dirpath, { recursive: true })
          const fileJsonName = path.join(__dirname, `../public/json/jsonGenerados/Diario/Venta/${tabla.OrdendeCompra}/${tabla.Voucher}.json`);
          const pathXML = path.join(__dirname, `../public/json/jsonGenerados/Diario/Venta/${tabla.OrdendeCompra}/${tabla.Voucher}.xml`);
          fs.writeFile(fileJsonName, JSON.stringify(diario,null, 2), function writeJSON(err) {
            if (err) return console.log(err);

          });
          const   xml2js = require('xml2js');
          // console.log(json);
            var parser = new xml2js.Builder();
          var xml = parser.buildObject(diario);
          //  console.log(xml);
            fs.writeFile(pathXML, xml, function(err) {
              if (err) return console.log(err);

            });
        })



      } catch (e) {
        console.log(e);
      }
      datoVentaMensual = {
        data:json,
        totalMXN:TotalMXN,
        totalLTS:TotalLTS
      }
      const data = {
        data:json,
        totalMXN:TotalMXN,
        totalLTS:TotalLTS
      }
    return data

    }
    let tanque1 =require(path.join(__dirname, '../public/json/glencore/tanque1.json'))
    let tanque2 =require(path.join(__dirname, '../public/json/glencore/tanque2.json'))
    let tanque3 =require(path.join(__dirname, '../public/json/glencore/tanque3.json'))
    let tanque4 =require(path.join(__dirname, '../public/json/glencore/tanque4.json'))
    let tanque5 =require(path.join(__dirname, '../public/json/glencore/tanque5.json'))
    let tanque6 =require(path.join(__dirname, '../public/json/glencore/tanque6.json'))
    let tanque7 =require(path.join(__dirname, '../public/json/glencore/tanque7.json'))
    let tanque8 =require(path.join(__dirname, '../public/json/glencore/tanque8.json'))

    let productoGas87 = require(path.join(__dirname, '../public/json/glencore/Mensual/mensualGas87.json'))
    
    let productoGas91 = require(path.join(__dirname, '../public/json/glencore/Mensual/mensualGas91.json'))
    
    let productoDisel = require(path.join(__dirname, '../public/json/glencore/Mensual/mensualDisel.json'))
    // testJsonApi()
    // console.log(productoDisel);
    // console.log(productoDisel.ReporteDeVolumenMensual.Recepciones);
    async function testJsonApi() {
      await apiDiarioJsonZip()
    
    //   console.log(gas87);
    //   let gas87 =require(path.join(__dirname, '../public/json/glencore/separarGas87.json'))
    //   let gas91 =require(path.join(__dirname, '../public/json/glencore/separarGas91.json'))
    //   let disel =require(path.join(__dirname, '../public/json/glencore/separarDisel.json'))
    
    //   let estructura =require(path.join(__dirname, '../public/json/glencore/glencoreEstructura.json'))
    //   gas87.Tanque.push(tanque2)
    //   gas87.Tanque.push(tanque5)
    //   gas87.Tanque.push(tanque8)
    
    //   gas91.Tanque.push(tanque1)
    //   gas91.Tanque.push(tanque7)
    
    //   disel.Tanque.push(tanque3)
    //   disel.Tanque.push(tanque6)
    
    //   estructura.Producto.push(gas87)
    //   estructura.Producto.push(gas91)
    //   estructura.Producto.push(disel)
    //   const letters = ['a','b','c','d','e','f']
    // const mayus = ['A','B','C','D','E','F']
    
    // let keyEnvio = ''
    // indexletters = 1
    // for (let index = 0; index < 32; index++) {
    //   // console.log(keyEnvio);
    //   if ((index== 8) ||(index== 12) ||(index== 16)||(index== 20) ) {
    //       keyEnvio+="-";
    //   }
    //   switch (Math.floor(Math.random() * 3)) {
    //     case 0:
    //       keyEnvio+=Math.floor(Math.random() * 10);
    //       break;
    //       case 1:
    //         keyEnvio+=letters[Math.floor(Math.random() * 6)]
    //         break;
    //         case 2:
    //           keyEnvio+=mayus[Math.floor(Math.random() * 6)]
    //           break;
      
    //     default:
    //       break;
    //   }
    //   indexletters++;
    // }
    //   let fileNameKey = `D_${keyEnvio}_GEM161104H39_XAX010101000_2022-05-02_CMN-0001_CMN_JSON`
    //   console.log(fileNameKey);
    //   // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
    //   //  fs.promises.mkdir(dirpath, { recursive: true })
    //   const fileJsonName = path.join(__dirname, `../public/json/glencoreTest/${fileNameKey}.json`);
    //   fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
    //     if (err) return console.log(err);
    
    //   });
    }
    function getJson(){
      const path = require('path');


      const reader = require('xlsx')

      const file = reader.readFile(path.join(__dirname, '../public/Excel/datajson.xlsx'));

      // console.log(diario);
      // let jsonTanque = require(path.join(__dirname, '../public/json/glencore/tanque.json'))

      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[3]], {
            raw: false
          })
        temp.forEach((res) => {
          switch (res['Nombre de Dato']) {
            case 'ClaveIdentificacionTanque':
              tanque1.ClaveIdentificacionTanque = res.Tanque1
              tanque2.ClaveIdentificacionTanque = res.Tanque2
              tanque3.ClaveIdentificacionTanque = res.Tanque3
              tanque4.ClaveIdentificacionTanque = res.Tanque4
              tanque5.ClaveIdentificacionTanque = res.Tanque5
              tanque6.ClaveIdentificacionTanque = res.Tanque6
              tanque7.ClaveIdentificacionTanque = res.Tanque7
              tanque8.ClaveIdentificacionTanque = res.Tanque8
              break;
              case 'Localizaciony/oDescripcionTanque':
                tanque1['Localizaciony/oDescripcionTanque'] = res.Tanque1
                tanque2['Localizaciony/oDescripcionTanque'] = res.Tanque2
                tanque3['Localizaciony/oDescripcionTanque'] = res.Tanque3
                tanque4['Localizaciony/oDescripcionTanque'] = res.Tanque4
                tanque5['Localizaciony/oDescripcionTanque'] = res.Tanque5
                tanque6['Localizaciony/oDescripcionTanque'] = res.Tanque6
                tanque7['Localizaciony/oDescripcionTanque'] = res.Tanque7
                tanque8['Localizaciony/oDescripcionTanque'] = res.Tanque8
                break;
                case 'VigenciaCalibracionTanque':
                  tanque1.VigenciaCalibracionTanque = res.Tanque1
                  tanque2.VigenciaCalibracionTanque = res.Tanque2
                  tanque3.VigenciaCalibracionTanque = res.Tanque3
                  tanque4.VigenciaCalibracionTanque = res.Tanque4
                  tanque5.VigenciaCalibracionTanque = res.Tanque5
                  tanque6.VigenciaCalibracionTanque = res.Tanque6
                  tanque7.VigenciaCalibracionTanque = res.Tanque7
                  tanque8.VigenciaCalibracionTanque = res.Tanque8
                  break;
                  case 'CapacidadTotalTanque':
                    tanque1.CapacidadTotalTanque.ValorNumerico = res.Tanque1
                    tanque2.CapacidadTotalTanque.ValorNumerico = res.Tanque2
                    tanque3.CapacidadTotalTanque.ValorNumerico = res.Tanque3
                    tanque4.CapacidadTotalTanque.ValorNumerico = res.Tanque4
                    tanque5.CapacidadTotalTanque.ValorNumerico = res.Tanque5
                    tanque6.CapacidadTotalTanque.ValorNumerico = res.Tanque6
                    tanque7.CapacidadTotalTanque.ValorNumerico = res.Tanque7
                    tanque8.CapacidadTotalTanque.ValorNumerico = res.Tanque8
                    break;
                    case 'CapacidadOperativaTanque':
                      tanque1.CapacidadOperativaTanque.ValorNumerico = res.Tanque1
                      tanque2.CapacidadOperativaTanque.ValorNumerico = res.Tanque2
                      tanque3.CapacidadOperativaTanque.ValorNumerico = res.Tanque3
                      tanque4.CapacidadOperativaTanque.ValorNumerico = res.Tanque4
                      tanque5.CapacidadOperativaTanque.ValorNumerico = res.Tanque5
                      tanque6.CapacidadOperativaTanque.ValorNumerico = res.Tanque6
                      tanque7.CapacidadOperativaTanque.ValorNumerico = res.Tanque7
                      tanque8.CapacidadOperativaTanque.ValorNumerico = res.Tanque8
                      break;
                      case 'CapacidadUtilTanque':
                        tanque1.CapacidadUtilTanque.ValorNumerico = res.Tanque1
                        tanque2.CapacidadUtilTanque.ValorNumerico = res.Tanque2
                        tanque3.CapacidadUtilTanque.ValorNumerico = res.Tanque3
                        tanque4.CapacidadUtilTanque.ValorNumerico = res.Tanque4
                        tanque5.CapacidadUtilTanque.ValorNumerico = res.Tanque5
                        tanque6.CapacidadUtilTanque.ValorNumerico = res.Tanque6
                        tanque7.CapacidadUtilTanque.ValorNumerico = res.Tanque7
                        tanque8.CapacidadUtilTanque.ValorNumerico = res.Tanque8
                        break;
                        case 'CapacidadFondajeTanque':
                          tanque1.CapacidadFondajeTanque.ValorNumerico = res.Tanque1
                          tanque2.CapacidadFondajeTanque.ValorNumerico = res.Tanque2
                          tanque3.CapacidadFondajeTanque.ValorNumerico = res.Tanque3
                          tanque4.CapacidadFondajeTanque.ValorNumerico = res.Tanque4
                          tanque5.CapacidadFondajeTanque.ValorNumerico = res.Tanque5
                          tanque6.CapacidadFondajeTanque.ValorNumerico = res.Tanque6
                          tanque7.CapacidadFondajeTanque.ValorNumerico = res.Tanque7
                          tanque8.CapacidadFondajeTanque.ValorNumerico = res.Tanque8
                          break;
                          case 'VolumenMinimoOperacion':
                            tanque1.VolumenMinimoOperacion.ValorNumerico = res.Tanque1
                            tanque2.VolumenMinimoOperacion.ValorNumerico = res.Tanque2
                            tanque3.VolumenMinimoOperacion.ValorNumerico = res.Tanque3
                            tanque4.VolumenMinimoOperacion.ValorNumerico = res.Tanque4
                            tanque5.VolumenMinimoOperacion.ValorNumerico = res.Tanque5
                            tanque6.VolumenMinimoOperacion.ValorNumerico = res.Tanque6
                            tanque7.VolumenMinimoOperacion.ValorNumerico = res.Tanque7
                            tanque8.VolumenMinimoOperacion.ValorNumerico = res.Tanque8
                            break;
                            case 'EstadoTanque':
                              tanque1.EstadoTanque = res.Tanque1
                              tanque2.EstadoTanque = res.Tanque2
                              tanque3.EstadoTanque = res.Tanque3
                              tanque4.EstadoTanque = res.Tanque4
                              tanque5.EstadoTanque = res.Tanque5
                              tanque6.EstadoTanque = res.Tanque6
                              tanque7.EstadoTanque = res.Tanque7
                              tanque8.EstadoTanque = res.Tanque8
                              break;
                              case 'SistemaMedicionTanque':
                                tanque1.Medidores[0].SistemaMedicionTanque = res.Tanque1
                                tanque2.Medidores[0].SistemaMedicionTanque = res.Tanque2
                                tanque3.Medidores[0].SistemaMedicionTanque = res.Tanque3
                                tanque4.Medidores[0].SistemaMedicionTanque = res.Tanque4
                                tanque5.Medidores[0].SistemaMedicionTanque = res.Tanque5
                                tanque6.Medidores[0].SistemaMedicionTanque = res.Tanque6
                                tanque7.Medidores[0].SistemaMedicionTanque = res.Tanque7
                                tanque8.Medidores[0].SistemaMedicionTanque = res.Tanque8
                                break;
                                case 'LocalizODescripSistMedicionTanque':
                                  tanque1.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque1
                                  tanque2.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque2
                                  tanque3.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque3
                                  tanque4.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque4
                                  tanque5.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque5
                                  tanque6.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque6
                                  tanque7.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque7
                                  tanque8.Medidores[0].LocalizODescripSistMedicionTanque = res.Tanque8
                                  break;
                                  case 'VigenciaCalibracionSistMedicionTanque':
                                    tanque1.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque1
                                    tanque2.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque2
                                    tanque3.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque3
                                    tanque4.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque4
                                    tanque5.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque5
                                    tanque6.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque6
                                    tanque7.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque7
                                    tanque8.Medidores[0].VigenciaCalibracionSistMedicionTanque = res.Tanque8
                                    break;
                                    case 'IncertidumbreMedicionSistMedicionTanque':
                                      tanque1.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque1
                                      tanque2.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque2
                                      tanque3.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque3
                                      tanque4.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque4
                                      tanque5.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque5
                                      tanque6.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque6
                                      tanque7.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque7
                                      tanque8.Medidores[0].IncertidumbreMedicionSistMedicionTanque = res.Tanque8
                                      break;

            default:
              break;
          }
        })

      } catch (e) {
        console.log(e);
      }
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[6]], {
            raw: false
          })
        temp.forEach((res) => {
          switch (res['Nombre de Dato']) {
            case 'VolumenExistenciasAnterior':
              tanque1.Existencias.VolumenExistenciasAnterior = res.Tanque1
              tanque2.Existencias.VolumenExistenciasAnterior = res.Tanque2
              tanque3.Existencias.VolumenExistenciasAnterior = res.Tanque3
              tanque4.Existencias.VolumenExistenciasAnterior = res.Tanque4
              tanque5.Existencias.VolumenExistenciasAnterior = 0.0
              tanque6.Existencias.VolumenExistenciasAnterior = 0.0
              tanque7.Existencias.VolumenExistenciasAnterior = 0.0
              tanque8.Existencias.VolumenExistenciasAnterior = 0.0
              break;
              case 'VolumenAcumOpsEntrega':
                tanque1.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque1
                tanque2.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque2
                tanque3.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque3
                tanque4.Existencias.VolumenAcumOpsEntrega.ValorNumerico = 0.0
                tanque5.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque5
                tanque6.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque6
                tanque7.Existencias.VolumenAcumOpsEntrega.ValorNumerico = res.Tanque7
                tanque8.Existencias.VolumenAcumOpsEntrega.ValorNumerico = 0.0

                break;
                case 'VolumenAcumOpsRecepcion':

                  tanque1.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = 0.0
                  tanque2.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = 0.0
                  tanque3.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = 0.0
                  tanque4.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = 0.0
                  tanque5.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = res.Tanque5
                  tanque6.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = res.Tanque6
                  tanque7.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = res.Tanque7
                  tanque8.Existencias.VolumenAcumOpsRecepcion.ValorNumerico = res.Tanque8
                  break;
                case 'HoraEntregaAcumulado':
                  tanque1.Existencias.HoraEntregaAcumulado = res.Tanque1
                  tanque2.Existencias.HoraEntregaAcumulado = res.Tanque2
                  tanque3.Existencias.HoraEntregaAcumulado = res.Tanque3
                  tanque4.Existencias.HoraEntregaAcumulado = res.Tanque4
                  tanque5.Existencias.HoraEntregaAcumulado = res.Tanque5
                  tanque6.Existencias.HoraEntregaAcumulado = res.Tanque6
                  tanque7.Existencias.HoraEntregaAcumulado = res.Tanque7
                  tanque8.Existencias.HoraEntregaAcumulado = res.Tanque8
                  break;
                  case 'VolumenExistencias':
                    tanque1.Existencias.VolumenExistencias = res.Tanque1
                    tanque2.Existencias.VolumenExistencias = res.Tanque2
                    tanque3.Existencias.VolumenExistencias = res.Tanque3
                    tanque4.Existencias.VolumenExistencias = res.Tanque4
                    tanque5.Existencias.VolumenExistencias = 0.0
                    tanque6.Existencias.VolumenExistencias = 0.0
                    tanque7.Existencias.VolumenExistencias = 0.0
                    tanque8.Existencias.VolumenExistencias = 0.0

      
      
                    break;
                  case 'FechaYHoraEstaMedicion':
                    tanque1.Existencias.FechaYHoraEstaMedicion = res.Tanque1
                    tanque2.Existencias.FechaYHoraEstaMedicion = res.Tanque2
                    tanque3.Existencias.FechaYHoraEstaMedicion = res.Tanque3
                    tanque4.Existencias.FechaYHoraEstaMedicion = res.Tanque4
                    tanque5.Existencias.FechaYHoraEstaMedicion = res.Tanque5
                    tanque6.Existencias.FechaYHoraEstaMedicion = res.Tanque6
                    tanque7.Existencias.FechaYHoraEstaMedicion = res.Tanque7
                    tanque8.Existencias.FechaYHoraEstaMedicion = res.Tanque8
                    break;
                    case 'FechaYHoraMedicionAnterior':
                      tanque1.Existencias.FechaYHoraMedicionAnterior = res.Tanque1
                      tanque2.Existencias.FechaYHoraMedicionAnterior = res.Tanque2
                      tanque3.Existencias.FechaYHoraMedicionAnterior = res.Tanque3
                      tanque4.Existencias.FechaYHoraMedicionAnterior = res.Tanque4
                      tanque5.Existencias.FechaYHoraMedicionAnterior = res.Tanque5
                      tanque6.Existencias.FechaYHoraMedicionAnterior = res.Tanque6
                      tanque7.Existencias.FechaYHoraMedicionAnterior = res.Tanque7
                      tanque8.Existencias.FechaYHoraMedicionAnterior = res.Tanque8
                      break;
            default:
              break;
          }
        })

      } catch (e) {
        console.log(e);
      }
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[7]], {
            raw: false
          })
        temp.forEach((res) => {
          switch (res.ReporteMovimientos) {
            case 'TotalRecepciones':
              if (res.Tanque1.indexOf("  ") != -1) {
                tanque1.Recepciones.TotalRecepciones = 0
              } else {
                tanque1.Recepciones.TotalRecepciones = res.Tanque1
              }
              if (res.Tanque2.indexOf("  ") != -1) {
                tanque2.Recepciones.TotalRecepciones = 0
              } else {
                tanque2.Recepciones.TotalRecepciones = res.Tanque2
              }
              if (res.Tanque3.indexOf("  ") != -1) {
                tanque3.Recepciones.TotalRecepciones = 0
              } else {
                tanque3.Recepciones.TotalRecepciones = res.Tanque3
              }
              if (res.Tanque4.indexOf("  ") != -1) {
                tanque4.Recepciones.TotalRecepciones = 0
              } else {
                tanque4.Recepciones.TotalRecepciones = res.Tanque4
              }
              tanque5.Recepciones.TotalRecepciones = res.Tanque5
              tanque6.Recepciones.TotalRecepciones = res.Tanque6
              tanque7.Recepciones.TotalRecepciones = res.Tanque7
              tanque8.Recepciones.TotalRecepciones = res.Tanque8

              break;
              case 'SumaVolumenRecepcion':
                // if (res.Tanque1.indexOf("  ") != -1) {
                //   tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = 0.0
                // } else {
                //   tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque1
                // }
                // if (res.Tanque2.indexOf("  ") != -1) {
                //   tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = 0.0
                // } else {
                //   tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque2
                // }
                // if (res.Tanque3.indexOf("  ") != -1) {
                //   tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = 0.0
                // } else {
                //   tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque3
                // }
                // if (res.Tanque4.indexOf("  ") != -1) {
                //   tanque4.Recepciones.SumaVolumenRecepcion.ValorNumerico = 0.0
                // } else {
                //   tanque4.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque4
                // }
                // tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque5
                // tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque6
                // tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque7
                // tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = res.Tanque8
                break;
                case 'TotalDocumentosNacional':
                  if (res.Tanque1.indexOf("  ") != -1) {
                    tanque1.Recepciones.TotalDocumentos = 0
                  } else {
                    tanque1.Recepciones.TotalDocumentos = res.Tanque1
                  }
                  if (res.Tanque2.indexOf("  ") != -1) {
                    tanque2.Recepciones.TotalDocumentos = 0
                  } else {
                    tanque2.Recepciones.TotalDocumentos = res.Tanque2
                  }
                  if (res.Tanque3.indexOf("  ") != -1) {
                    tanque3.Recepciones.TotalDocumentos = 0
                  } else {
                    tanque3.Recepciones.TotalDocumentos = res.Tanque3
                  }
                  if (res.Tanque4.indexOf("  ") != -1) {
                    tanque4.Recepciones.TotalDocumentos = 0
                  } else {
                    tanque4.Recepciones.TotalDocumentos = res.Tanque4
                  }
                  tanque5.Recepciones.TotalDocumentos = res.Tanque5
                  tanque6.Recepciones.TotalDocumentos = res.Tanque6
                  tanque7.Recepciones.TotalDocumentos = res.Tanque7
                  tanque8.Recepciones.TotalDocumentos = res.Tanque8
    
                  break;
                case 'TotalDocumentosExtranjero':
                  tanque1.Recepciones.TotalDocumentos += 0
                  tanque2.Recepciones.TotalDocumentos += 0
                  tanque3.Recepciones.TotalDocumentos += 0
                  tanque4.Recepciones.TotalDocumentos += 0
                  tanque5.Recepciones.TotalDocumentos += 0
                  tanque6.Recepciones.TotalDocumentos += 0
                  tanque7.Recepciones.TotalDocumentos += 0
                  tanque8.Recepciones.TotalDocumentos += 0
                  break;
                  case 'SumaCompras':
                    if (res.Tanque1.indexOf("  ") != -1) {
                      tanque1.Recepciones.SumaCompras = 0.0
                    } else {
                      tanque1.Recepciones.SumaCompras = res.Tanque1
                    }
                    if (res.Tanque2.indexOf("  ") != -1) {
                      tanque2.Recepciones.SumaCompras = 0.0
                    } else {
                      tanque2.Recepciones.SumaCompras = res.Tanque2
                    }
                    if (res.Tanque3.indexOf("  ") != -1) {
                      tanque3.Recepciones.SumaCompras = 0.0
                    } else {
                      tanque3.Recepciones.SumaCompras = res.Tanque3
                    }
                    if (res.Tanque4.indexOf("  ") != -1) {
                      tanque4.Recepciones.SumaCompras = 0.0
                    } else {
                      tanque4.Recepciones.SumaCompras = res.Tanque4
                    }
                    tanque5.Recepciones.SumaCompras = res.Tanque5
                    tanque6.Recepciones.SumaCompras = res.Tanque6
                    tanque7.Recepciones.SumaCompras = res.Tanque7
                    tanque8.Recepciones.SumaCompras = res.Tanque8

                    break;
                  case 'TotalEntregas':
                    tanque1.Entregas.TotalEntregas = res.Tanque1
                    tanque2.Entregas.TotalEntregas = res.Tanque2
                    tanque3.Entregas.TotalEntregas = res.Tanque3
                    tanque4.Entregas.TotalEntregas = 0
                    tanque5.Entregas.TotalEntregas = res.Tanque5
                    tanque6.Entregas.TotalEntregas = res.Tanque6
                    tanque7.Entregas.TotalEntregas = res.Tanque7
                    tanque8.Entregas.TotalEntregas = res.Tanque8
                    break;
                    case 'SumaVolumenEntregado':
                      tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque1
                      tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque2
                      tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque3
                      tanque4.Entregas.SumaVolumenEntregado.ValorNumerico = 0.0
                      tanque5.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque5
                      tanque6.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque6
                      tanque7.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque7
                      tanque8.Entregas.SumaVolumenEntregado.ValorNumerico = res.Tanque8
                      break;
                      case 'TotalDocumentos':
                        tanque1.Entregas.TotalDocumentos = res.Tanque1
                        tanque2.Entregas.TotalDocumentos = res.Tanque2
                        tanque3.Entregas.TotalDocumentos = res.Tanque3
                        tanque4.Entregas.TotalDocumentos = 0
                        tanque5.Entregas.TotalDocumentos = res.Tanque5
                        tanque6.Entregas.TotalDocumentos = res.Tanque6
                        tanque7.Entregas.TotalDocumentos = res.Tanque7
                        tanque8.Entregas.TotalDocumentos = res.Tanque8
                        break;
                        case 'SumaVentas':
                          tanque1.Entregas.SumaVentas = res.Tanque1
                          tanque2.Entregas.SumaVentas = res.Tanque2
                          tanque3.Entregas.SumaVentas = res.Tanque3
                          tanque4.Entregas.SumaVentas = 0.0
                          tanque5.Entregas.SumaVentas = res.Tanque5
                          tanque6.Entregas.SumaVentas = res.Tanque6
                          tanque7.Entregas.SumaVentas = res.Tanque7
                          tanque8.Entregas.SumaVentas = res.Tanque8
                          break;
            default:
              break;
          }
        })

      } catch (e) {
        console.log(e);
      }
      // const data = {
      //   data:json,
      //   totalMXN:TotalMXN,
      //   totalLTS:TotalLTS
      // }

    return 'data'
    }
    async function apiDiarioJsonZip() {
      var request = require('request');
      let fecha = '2022-05-02'
      if (fecha== null) {
        fecha = acomodarFecha(DateNow())
      }
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      await request(options, function (error, response) {
        if (error) throw new Error(error);
        let tanque1Rep = []
        let tanque2Rep = ['2']
        let tanque3Rep = []
        let tanque4Rep = []
        let tanque5Rep = []
        let tanque6Rep = []
        let tanque7Rep = []
        let tanque8Rep = []

        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        let index= 0;
        
        for(const key in temp) {
          const res = temp[key]
          let RECEPCION = {
            "NumeroDeRegistro": index,
            "VolumenInicialTanque": {
                "ValorNumerico": 0.0,
                "UnidadDeMedida": "UM03"
            },
            "VolumenFinalTanque": 0.0,
            "VolumenRecepcion": {
                "ValorNumerico": res.items[0].quantity,
                "UnidadDeMedida": "UM03"
            },
            "Temperatura": 20.0,
            "PresionAbsoluta": 101.325,
            "FechaYHoraInicialEntrega": res.issuedAt,
            "FechaYHoraFinalEntrega": res.issuedAt,
            "Complemento": {
                "TipoComplemento": "Comercializacion",
                "Nacional": [{
                    "RfcClienteOProveedor": res.issuer.rfc,
                    "NombreClienteOProveedor": res.issuer.name,
                    "PermisoClienteOProveedor": res.items[0].identificationNumber,
                    "CFDIs": [{
                        "Cfdi": res.uuid,
                        "TipoCfdi": "Ingreso",
                        "PrecioVentaOCompraOContrap": res.items[0].totalAmount,
                        "FechaYHoraTransaccion": res.issuedAt,
                        "VolumenDocumentado": {
                            "ValorNumerico": res.items[0].quantity,
                            "UnidadDeMedida": "UM03"
                        }
                    }]
                }]
            }
        }
          // RECEPCION.NumeroDeRegistro = index
          // RECEPCION.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
          // RECEPCION.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.name
          // RECEPCION.Complemento.Nacional[0].PermisoClienteOProveedor = res.issuer.identificationNumber
          // RECEPCION.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
          // RECEPCION.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
          // RECEPCION.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.items[0].totalAmount
          // RECEPCION.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
          // RECEPCION.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
          // RECEPCION.Tanque = res.Tanque
          // RECEPCION.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
          // RECEPCION.VolumenFinalTanque = res.VolumenFinalTanque
          // RECEPCION.VolumenInicialTanque.ValorNumerico = 0.0
          // RECEPCION.VolumenFinalTanque = 0.0
          // RECEPCION.VolumenRecepcion.ValorNumerico = res.items[0].quantity
          // RECEPCION.Temperatura = 20
          // RECEPCION.PresionAbsoluta = 101.325
          // RECEPCION.FechaYHoraInicioRecepcion = res.issuedAt
          // RECEPCION.FechaYHoraFinalRecepcion = res.issuedAt
          // const rep = RECEPCION
          
         index++;
          if (res.items[0].productIdentification == '15101514') {
            let tanques = [2,5,8]
            let indexT = tanques.length * Math.random() | 0
 
            switch (tanques[indexT]) {
              case 2:
                tanque2.Recepciones.RECEPCION.push(RECEPCION)
                tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                tanque2.Recepciones.SumaCompras = tanque2.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 5:
                  tanque5.Recepciones.RECEPCION.push(RECEPCION)
                  tanque5.Recepciones.TotalRecepciones= tanque5.Recepciones.TotalRecepciones + 1
                  tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                  tanque5.Recepciones.TotalDocumentos = tanque5.Recepciones.TotalDocumentos + 1
                  tanque5.Recepciones.SumaCompras = tanque5.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
                  case 8:
                    tanque8.Recepciones.RECEPCION.push(RECEPCION)
                    tanque8.Recepciones.TotalRecepciones= tanque8.Recepciones.TotalRecepciones + 1
                    tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                    tanque8.Recepciones.TotalDocumentos = tanque8.Recepciones.TotalDocumentos + 1
                    tanque8.Recepciones.SumaCompras = tanque8.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                    break;
            
              default:
                tanque2.Recepciones.RECEPCION.push(RECEPCION)
                tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                tanque2.Recepciones.SumaCompras = tanque2.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }
          if (res.items[0].productIdentification == '15101515') {
            let tanques = [6,3]
            let indexT = tanques.length * Math.random() | 0
            switch (tanques[indexT]) {
              case 6:
                
                tanque6.Recepciones.RECEPCION.push(RECEPCION)
                tanque6.Recepciones.TotalRecepciones= tanque6.Recepciones.TotalRecepciones + 1
                tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque6.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque6.Recepciones.TotalDocumentos = tanque6.Recepciones.TotalDocumentos + 1
                tanque6.Recepciones.SumaCompras = tanque6.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 3:
                  tanque3.Recepciones.RECEPCION.push(RECEPCION)
                  tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                  tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                  tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                  tanque3.Recepciones.SumaCompras = tanque3.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
            
              default:
                tanque3.Recepciones.RECEPCION.push(RECEPCION)
                tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                tanque3.Recepciones.SumaCompras = tanque3.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }
          if (res.items[0].productIdentification == '15101505') {
            let tanques = [1,7]
            let indexT = tanques.length * Math.random() | 0
            switch (tanques[indexT]) {
              case 1:
              
                tanque1.Recepciones.RECEPCION.push(RECEPCION)
                tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                tanque1.Recepciones.SumaCompras = tanque1.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 7:
                  tanque7.Recepciones.RECEPCION.push(RECEPCION)
                  tanque7.Recepciones.TotalRecepciones= tanque7.Recepciones.TotalRecepciones + 1
                  tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                  tanque7.Recepciones.TotalDocumentos = tanque7.Recepciones.TotalDocumentos + 1
                  tanque7.Recepciones.SumaCompras = tanque7.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
            
              default:
                tanque1.Recepciones.RECEPCION.push(RECEPCION)
                tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                tanque1.Recepciones.SumaCompras = tanque1.Recepciones.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }

        }

        var options = {
          'method': 'GET',
          'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE`,
          'headers': {
            'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
          }
        };
         request(options, function (error, response) {
          if (error) throw new Error(error);

          let index = 0;
          let temp = JSON.parse(response.body);
          temp = temp['hydra:member']
          // console.log(temp);
          for (const key in temp) {
            const res = temp[key]
            let entrega = {
              "NumeroDeRegistro": index,
              "VolumenInicialTanque": {
                  "ValorNumerico": 0.0,
                  "UnidadDeMedida": "UM03"
              },
              "VolumenFinalTanque": 0.0,
              "VolumenEntregado": {
                  "ValorNumerico": res.items[0].quantity,
                  "UnidadDeMedida": "UM03"
              },
              "Temperatura": 20.0,
              "PresionAbsoluta": 101.325,
              "FechaYHoraInicialEntrega": res.issuedAt,
              "FechaYHoraFinalEntrega": res.issuedAt,
              "Complemento": {
                  "TipoComplemento": "Comercializacion",
                  "Nacional": [{
                      "RfcClienteOProveedor": res.issuer.rfc,
                      "NombreClienteOProveedor": res.issuer.name,
                      "PermisoClienteOProveedor": res.items[0].identificationNumber,
                      "CFDIs": [{
                          "Cfdi": res.uuid,
                          "TipoCfdi": "Ingreso",
                          "PrecioVentaOCompraOContrap": res.items[0].totalAmount,
                          "FechaYHoraTransaccion": res.issuedAt,
                          "VolumenDocumentado": {
                              "ValorNumerico": res.items[0].quantity,
                              "UnidadDeMedida": "UM03"
                          }
                      }]
                  }]
              }
          }

            // entrega.NumeroDeRegistro = res.NumeroDeRegistro
            // entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
            // entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
            // entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
            // entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
            // entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            // entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.items[0].totalAmount
            // entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            // entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
            // // entrega.Tanque = res.Tanque
            // // entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            // // entrega.VolumenFinalTanque = res.VolumenFinalTanque
            // entrega.VolumenInicialTanque.ValorNumerico = 0.0
            // entrega.VolumenFinalTanque = 0.0
            // entrega.VolumenEntregado.ValorNumerico = res.items[0].quantity
            // entrega.Temperatura = 20
            // entrega.PresionAbsoluta = 101.325
            // entrega.FechaYHoraInicioRecepcion = res.issuedAt
            // entrega.FechaYHoraFinalRecepcion = res.issuedAt
          // console.log(tabla);
          index++;
            if (res.items[0].productIdentification == '15101514') {
              let tanques = [2,5,8]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 2:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
                  case 5:
                    tanque5.Entregas.Entrega.push(entrega)
                    tanque5.Entregas.TotalEntregas= tanque5.Entregas.TotalEntregas + 1
                    tanque5.Entregas.SumaVolumenEntregado.ValorNumerico = tanque5.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque5.Entregas.TotalDocumentos = tanque5.Entregas.TotalDocumentos + 1
                    tanque5.Entregas.SumaCompras = tanque5.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                    break;
                    case 8:
                      tanque8.Entregas.Entrega.push(entrega)
                      tanque8.Entregas.TotalEntregas= tanque8.Entregas.TotalEntregas + 1
                      tanque8.Entregas.SumaVolumenEntregado.ValorNumerico = tanque8.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                      tanque8.Entregas.TotalDocumentos = tanque8.Entregas.TotalDocumentos + 1
                      tanque8.Entregas.SumaCompras = tanque8.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                      break;
              
                default:
                  tanque2.Entregas.Entrega.push(entrega)
                  tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                  tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                  tanque2.Entregas.SumaCompras = tanque2.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101515') {
              let tanques = [6,3]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 6:
                  tanque6.Entregas.Entrega.push(entrega)
                  tanque6.Entregas.TotalEntregas= tanque6.Entregas.TotalEntregas + 1
                  tanque6.Entregas.SumaVolumenEntregado.ValorNumerico = tanque6.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque6.Entregas.TotalDocumentos = tanque6.Entregas.TotalDocumentos + 1
                  tanque6.Entregas.SumaCompras = tanque6.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
                  case 3:
                    tanque3.Entregas.Entrega.push(entrega)
                    tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                    tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                    tanque3.Entregas.SumaCompras = tanque3.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                    break;
              
                default:
                  tanque3.Entregas.Entrega.push(entrega)
                  tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                  tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                  tanque3.Entregas.SumaCompras = tanque3.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
              }
            }
            if (res.items[0].productIdentification == '15101505') {
              let tanques = [1,7]
              let indexT = tanques.length * Math.random() | 0
              switch (tanques[indexT]) {
                case 1:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
                  case 7:
                    tanque7.Entregas.Entrega.push(entrega)
                    tanque7.Entregas.TotalEntregas= tanque7.Entregas.TotalEntregas + 1
                    tanque7.Entregas.SumaVolumenEntregado.ValorNumerico = tanque7.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque7.Entregas.TotalDocumentos = tanque7.Entregas.TotalDocumentos + 1
                    tanque7.Entregas.SumaCompras = tanque7.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                    break;
              
                default:
                  tanque1.Entregas.Entrega.push(entrega)
                  tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                  tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                  tanque1.Entregas.SumaCompras = tanque1.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
              }
            }
          }
          let gas87 =require(path.join(__dirname, '../public/json/glencore/separarGas87.json'))
          let gas91 =require(path.join(__dirname, '../public/json/glencore/separarGas91.json'))
          let disel =require(path.join(__dirname, '../public/json/glencore/separarDisel.json'))
        
          let estructura =require(path.join(__dirname, '../public/json/glencore/glencoreEstructura.json'))
          gas87.Tanque.push(tanque2)
          gas87.Tanque.push(tanque5)
          gas87.Tanque.push(tanque8)
        
          gas91.Tanque.push(tanque1)
          gas91.Tanque.push(tanque7)
        
          disel.Tanque.push(tanque3)
          disel.Tanque.push(tanque6)
        
          estructura.Producto.push(gas87)
          estructura.Producto.push(gas91)
          estructura.Producto.push(disel)
          const letters = ['a','b','c','d','e','f']
        const mayus = ['A','B','C','D','E','F']
        
        let keyEnvio = ''
        indexletters = 1
        for (let index = 0; index < 32; index++) {
          // console.log(keyEnvio);
          if ((index== 8) ||(index== 12) ||(index== 16)||(index== 20) ) {
              keyEnvio+="-";
          }
          switch (Math.floor(Math.random() * 3)) {
            case 0:
              keyEnvio+=Math.floor(Math.random() * 10);
              break;
              case 1:
                keyEnvio+=letters[Math.floor(Math.random() * 6)]
                break;
                case 2:
                  keyEnvio+=mayus[Math.floor(Math.random() * 6)]
                  break;
          
            default:
              break;
          }
          indexletters++;
        }
          let fileNameKey = `D_${keyEnvio}_GEM161104H39_XAX010101000_${fecha}_CMN-0001_CMN_JSON`

          // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
          //  fs.promises.mkdir(dirpath, { recursive: true })
          const fileJsonName = path.join(__dirname, `../public/json/glencoreTest/${fileNameKey}.json`);
          fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        
          });
        });
      
      // console.log(data);
    
    });
    }
    function getJsonApi(params) {
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fecha}T23:59:59.000Z&issuedAt[after]=${fecha}T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
       request(options, function (error, response) {
        if (error) throw new Error(error);
        let entrega =require(path.join(__dirname, '../public/json/glencore/entregaTanque.json'))

        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        // console.log(temp);
        for (const key in temp) {
          const res = temp[key]
          entrega.NumeroDeRegistro = res.NumeroDeRegistro
          entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
          entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
          entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.name
          entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.uuid
          entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
          entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.items[0].totalAmount
          entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
          entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
          // entrega.Tanque = res.Tanque
          // entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
          // entrega.VolumenFinalTanque = res.VolumenFinalTanque
          entrega.VolumenInicialTanque.ValorNumerico = 0.0
          entrega.VolumenFinalTanque = 0.0
          entrega.VolumenEntregado.ValorNumerico = res.items[0].quantity
          entrega.Temperatura = 20
          entrega.PresionAbsoluta = 101.325
          entrega.FechaYHoraInicioRecepcion = res.issuedAt
          entrega.FechaYHoraFinalRecepcion = res.issuedAt
        // console.log(tabla);
          if (res.items[0].productIdentification == '15101514') {
            let tanques = [2,5,8]
            let indexT = tanques.length * Math.random() | 0
            switch (tanques[indexT]) {
              case 2:
                tanque2.Entregas.Entrega.push(entrega)
                tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                tanque2.Entregas.SumaCompras = tanque2.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 5:
                  tanque5.Entregas.Entrega.push(entrega)
                  tanque5.Entregas.TotalEntregas= tanque5.Entregas.TotalEntregas + 1
                  tanque5.Entregas.SumaVolumenEntregado.ValorNumerico = tanque5.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque5.Entregas.TotalDocumentos = tanque5.Entregas.TotalDocumentos + 1
                  tanque5.Entregas.SumaCompras = tanque5.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
                  case 8:
                    tanque8.Entregas.Entrega.push(entrega)
                    tanque8.Entregas.TotalEntregas= tanque8.Entregas.TotalEntregas + 1
                    tanque8.Entregas.SumaVolumenEntregado.ValorNumerico = tanque8.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                    tanque8.Entregas.TotalDocumentos = tanque8.Entregas.TotalDocumentos + 1
                    tanque8.Entregas.SumaCompras = tanque8.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                    break;
            
              default:
                tanque2.Entregas.Entrega.push(entrega)
                tanque2.Entregas.TotalEntregas= tanque2.Entregas.TotalEntregas + 1
                tanque2.Entregas.SumaVolumenEntregado.ValorNumerico = tanque2.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque2.Entregas.TotalDocumentos = tanque2.Entregas.TotalDocumentos + 1
                tanque2.Entregas.SumaCompras = tanque2.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }
          if (res.items[0].productIdentification == '15101515') {
            let tanques = [6,3]
            let indexT = tanques.length * Math.random() | 0
            switch (tanques[indexT]) {
              case 6:
                tanque6.Entregas.Entrega.push(entrega)
                tanque6.Entregas.TotalEntregas= tanque6.Entregas.TotalEntregas + 1
                tanque6.Entregas.SumaVolumenEntregado.ValorNumerico = tanque6.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque6.Entregas.TotalDocumentos = tanque6.Entregas.TotalDocumentos + 1
                tanque6.Entregas.SumaCompras = tanque6.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 3:
                  tanque3.Entregas.Entrega.push(entrega)
                  tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                  tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                  tanque3.Entregas.SumaCompras = tanque3.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
            
              default:
                tanque3.Entregas.Entrega.push(entrega)
                tanque3.Entregas.TotalEntregas= tanque3.Entregas.TotalEntregas + 1
                tanque3.Entregas.SumaVolumenEntregado.ValorNumerico = tanque3.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque3.Entregas.TotalDocumentos = tanque3.Entregas.TotalDocumentos + 1
                tanque3.Entregas.SumaCompras = tanque3.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }
          if (res.items[0].productIdentification == '15101505') {
            let tanques = [1,7]
            let indexT = tanques.length * Math.random() | 0
            switch (tanques[indexT]) {
              case 1:
                tanque1.Entregas.Entrega.push(entrega)
                tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                tanque1.Entregas.SumaCompras = tanque1.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
                case 7:
                  tanque7.Entregas.Entrega.push(entrega)
                  tanque7.Entregas.TotalEntregas= tanque7.Entregas.TotalEntregas + 1
                  tanque7.Entregas.SumaVolumenEntregado.ValorNumerico = tanque7.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                  tanque7.Entregas.TotalDocumentos = tanque7.Entregas.TotalDocumentos + 1
                  tanque7.Entregas.SumaCompras = tanque7.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                  break;
            
              default:
                tanque1.Entregas.Entrega.push(entrega)
                tanque1.Entregas.TotalEntregas= tanque1.Entregas.TotalEntregas + 1
                tanque1.Entregas.SumaVolumenEntregado.ValorNumerico = tanque1.Entregas.SumaVolumenEntregado.ValorNumerico + res.items[0].quantity//ltr
                tanque1.Entregas.TotalDocumentos = tanque1.Entregas.TotalDocumentos + 1
                tanque1.Entregas.SumaCompras = tanque1.Entregas.TotalDocumentos +  res.items[0].totalAmount //mxn
                break;
            }
          }
        }
        let gas87 =require(path.join(__dirname, '../public/json/glencore/separarGas87.json'))
        let gas91 =require(path.join(__dirname, '../public/json/glencore/separarGas91.json'))
        let disel =require(path.join(__dirname, '../public/json/glencore/separarDisel.json'))
      
        let estructura =require(path.join(__dirname, '../public/json/glencore/glencoreEstructura.json'))
        gas87.Tanque.push(tanque2)
        gas87.Tanque.push(tanque5)
        gas87.Tanque.push(tanque8)
      
        gas91.Tanque.push(tanque1)
        gas91.Tanque.push(tanque7)
      
        disel.Tanque.push(tanque3)
        disel.Tanque.push(tanque6)
      
        estructura.Producto.push(gas87)
        estructura.Producto.push(gas91)
        estructura.Producto.push(disel)
        const letters = ['a','b','c','d','e','f']
      const mayus = ['A','B','C','D','E','F']
      
      let keyEnvio = ''
      indexletters = 1
      for (let index = 0; index < 32; index++) {
        // console.log(keyEnvio);
        if ((index== 8) ||(index== 12) ||(index== 16)||(index== 20) ) {
            keyEnvio+="-";
        }
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            keyEnvio+=Math.floor(Math.random() * 10);
            break;
            case 1:
              keyEnvio+=letters[Math.floor(Math.random() * 6)]
              break;
              case 2:
                keyEnvio+=mayus[Math.floor(Math.random() * 6)]
                break;
        
          default:
            break;
        }
        indexletters++;
      }
        let fileNameKey = `D_${keyEnvio}_GEM161104H39_XAX010101000_2022-05-02_CMN-0001_CMN_JSON`
        console.log(fileNameKey);
        // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
        //  fs.promises.mkdir(dirpath, { recursive: true })
        const fileJsonName = path.join(__dirname, `../public/json/glencoreTest/${fileNameKey}.json`);
        fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
          if (err) return console.log(err);
      
        });
      });
    
    }
    function getGasoline87() {
      const path = require('path');
      let entrega =require(path.join(__dirname, '../public/json/glencore/entregaTanque.json'))
      
      const reader = require('xlsx')

      const file = reader.readFile(path.join(__dirname, '../public/Excel/datajson.xlsx'));
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[10]], {
            raw: false
          })
        temp.forEach((res) => {
          entrega.NumeroDeRegistro = res.NumeroDeRegistro
          entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
          entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
          entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
          entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
          entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
          entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
          entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
          entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
          // entrega.Tanque = res.Tanque
          entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
          entrega.VolumenFinalTanque = res.VolumenFinalTanque
          entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
          entrega.Temperatura = res.Temperatura
          entrega.PresionAbsoluta = res.PresionAbsoluta
          entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
          entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
          switch (res.Tanque) {
            case 'Tanque 2':
              tanque2.Entregas.Entrega.push(entrega)
              break;
              case 'Tanque 5':
                tanque5.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 8':
                  tanque8.Entregas.Entrega.push(entrega)
                  break;
          
            default:
              break;
          }
        })

      } catch (e) {
        console.log(e);
      }
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[11]], {
            raw: false
          })
          temp.forEach((res) => {
            entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
            // entrega.Tanque = res.Tanque
            entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
            entrega.Temperatura = res.Temperatura
            entrega.PresionAbsoluta = res.PresionAbsoluta
            entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
            entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
            switch (res.Tanque) {
              case 'Tanque 2':
                tanque2.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 5':
                  tanque5.Entregas.Entrega.push(entrega)
                  break;
                  case 'Tanque 8':
                    tanque8.Entregas.Entrega.push(entrega)
                    break;
            
              default:
                break;
            }
          })

      } catch (e) {
        console.log(e);
      }
    }
    function getGasoline91() {
      const path = require('path');

      let entrega =require(path.join(__dirname, '../public/json/glencore/entregaTanque.json'))

      const reader = require('xlsx')

      const file = reader.readFile(path.join(__dirname, '../public/Excel/datajson.xlsx'));
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[12]], {
            raw: false
          })
          temp.forEach((res) => {

            entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
            // entrega.Tanque = res.Tanque
            entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
            entrega.Temperatura = res.Temperatura
            entrega.PresionAbsoluta = res.PresionAbsoluta
            entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
            entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
            switch (res.Tanque) {
              case 'Tanque 6':
                tanque6.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 3':
                  tanque3.Entregas.Entrega.push(entrega)
                  break;
            
              default:
                break;
            }
          })

      } catch (e) {
        console.log(e);
      }
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[13]], {
            raw: false
          })
          temp.forEach((res) => {
            entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
            // entrega.Tanque = res.Tanque
            entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
            entrega.Temperatura = res.Temperatura
            entrega.PresionAbsoluta = res.PresionAbsoluta
            entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
            entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
            switch (res.Tanque) {
              case 'Tanque 6':
                tanque6.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 3':
                  tanque3.Entregas.Entrega.push(entrega)
                  break;
            
              default:
                break;
            }
          })

      } catch (e) {
        console.log(e);
      }
    }
    function getDisel() {
      const path = require('path');

      let entrega =require(path.join(__dirname, '../public/json/glencore/entregaTanque.json'))

      const reader = require('xlsx')

      const file = reader.readFile(path.join(__dirname, '../public/Excel/datajson.xlsx'));
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[8]], {
            raw: false
          })
          temp.forEach((res) => {
            
            entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
            // entrega.Tanque = res.Tanque
            entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
            entrega.Temperatura = res.Temperatura
            entrega.PresionAbsoluta = res.PresionAbsoluta
            entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
            entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
            switch (res.Tanque) {
              case 'Tanque 1':
                tanque1.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 7':
                  tanque7.Entregas.Entrega.push(entrega)
                  break;  
              default:
                break;
            }
          })

      } catch (e) {
        console.log(e);
      }
      try {
        const temp = reader.utils.sheet_to_json(

          file.Sheets[file.SheetNames[9]], {
            raw: false
          })
          temp.forEach((res) => {
           
            entrega.NumeroDeRegistro = res.NumeroDeRegistro
            entrega.Complemento.Nacional[0].RfcClienteOProveedor = res.RfcClienteOProveedor
            entrega.Complemento.Nacional[0].NombreClienteOProveedor = res.NombreClienteOProveedor
            entrega.Complemento.Nacional[0].PermisoClienteOProveedor = res.PermisoClienteOProveedor
            entrega.Complemento.Nacional[0].CFDIs[0].Cfdi = res.CFDI
            entrega.Complemento.Nacional[0].CFDIs[0].TipoCfdi = res.TipoCFDI
            entrega.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = res.PrecioVentaOCompraOContrap
            entrega.Complemento.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.FechaYHoraTransaccion
            entrega.Complemento.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.VolumenDocumentado
            // entrega.Tanque = res.Tanque
            entrega.VolumenInicialTanque.ValorNumerico = res.VolumenInicialTanque
            entrega.VolumenFinalTanque = res.VolumenFinalTanque
            entrega.VolumenEntregado.ValorNumerico = res.VolumenRecepcion
            entrega.Temperatura = res.Temperatura
            entrega.PresionAbsoluta = res.PresionAbsoluta
            entrega.FechaYHoraInicioRecepcion = res.FechaYHoraInicioRecepcion
            entrega.FechaYHoraFinalRecepcion = res.FechaYHoraFinalRecepcion
            switch (res.Tanque) {
              case 'Tanque 1':
                tanque1.Entregas.Entrega.push(entrega)
                break;
                case 'Tanque 7':
                  tanque7.Entregas.Entrega.push(entrega)
                  break;  
            
              default:
                break;
            }
          })

      } catch (e) {
        console.log(e);
      }
    }
    const archiver = require('archiver');

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;;
    stream.on('close', () => resolve());
    archive.finalize();
  });
}

const removeDirDiario = function(path1) {
  // console.log(path);
  if (fs.existsSync(path1)) {
    const files = fs.readdirSync(path1)


    // if (path == 'C:\Users\USER\Desktop\AdrianQR\vistaPrueba\src\public\json\jsonGenerados\Diario\Compra') {
    //   console.log("nice");
    // }else{
    //   console.log("no Nice");
    // }
    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path1 + "/" + filename).isDirectory()) {
          removeDirDiario(path1 + "/" + filename)
        } else {
          fs.unlinkSync(path1 + "/" + filename)
        }
      })
      files.forEach(dir => {
        console.log( path.join(path1,dir));
        fs.rmdir(path.join(path1,dir), () => {
          console.log("Folder Deleted!");

        });
      });
    } else {
      console.log("No files found in the directory.")
    }
  } else {
    console.log("Directory path not found.")
  }
}


async function ExcelApiCreate(fechaD){
  var request = require('request');
    const xl = require('excel4node');
    console.log("Empieza");
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Compra');
    const ws2 = wb.addWorksheet('Venta');

    const headingColumnNames = [
        "UUID",
        "RFC Emisor",
        "Nombre del Emisor",
        "RFC Receptor",
        "Nombre del Receptor",
        "Tipo",
        "Estatus",
        "PAC",
        "Moneda",
        "Fecha de Certificación",
        "Método de Pago",
        "Fecha de Emisión",
        "Condiciones de pago (original)",
        "No. Identificación",
        "Clave del producto y/o servicio",
        "Descripción",
        "Cantidad",
        "Clave de unidad",
        "Valor unitario",
        "Descuento",
        "Impuesto",
        "Subtotal",
        "Total",
        "TotalMXN"
    ]//Write Column Title in Excel file
    // let temp;2022-10-25
    console.log(fechaD);
    var pagIndexCompra = 1
    var pagIndexVenta = 1
    let ApiLength= 10
    let ApiLengthV= 10
    let indexCompra = 0;
    let indexVenta = 0; 
    let headingColumnIndex = 1;
    let headingColumnIndex2 = 1;
    let rowIndex = 2;
    const compra = [

     ]
     let rowIndex2 = 2;
    //  let index2 = 0
     const venta = [

    ]
     headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++)
          .string(heading)
  });//Write Data in Excel file headingColumnIndex = 1;
  headingColumnNames.forEach(heading => {
      ws2.cell(1, headingColumnIndex2++)
          .string(heading)
  });//Write Data in Excel file

    while (ApiLength > 0) {

      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fechaD}T23:59:59.000Z&issuedAt[after]=${fechaD}T00:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
        'headers': {
          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
        }
      };
      await request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
                    // console.log(diario);
            let index = 0;
        let temp = JSON.parse(response.body);
        temp = temp['hydra:member']
        pagIndexCompra++
        ApiLength = temp.length
        console.log(ApiLength);
        console.log("@@@@@@@");
        for (const key in temp) {
          const res = temp[key]
          let Tipo = ''
          let metodoPago = ''
          switch (res.paymentMethod) {
            case 01:
              metodoPago = 'Efectivo'
              break;
              case 02:
                metodoPago = 'Cheque de nómina'
                break;
                case 03:
                  metodoPago = 'Transferencia electrónica'
                  break;
                  case 04:
                    metodoPago = 'Tarjeta de crédito'
                    break;
                    case 05:
                      metodoPago = 'Monedero electrónico'
                      break;
                      case 06:
                        metodoPago = 'Dinero digital'
                        break;
                        case 08:
                          metodoPago = 'Vales de despensa'
                          break;
                          case 12:
                            metodoPago = 'Liquidación'
                            break;
                            case 13:
                              metodoPago = 'Pago por subrogación'
                              break;
                              case 14:
                                metodoPago = 'Pago por consignación'
                                break;
                                case 15:
                                  metodoPago = 'Condonación'
                                  break;
                                  case 17:
                                    metodoPago = 'Compensación'
                                    break;
                                    case 23:
                                      metodoPago = 'Novacion'
                                      break;
                                      case 24:
                                        metodoPago = 'Confusión'
                                        break;
                                        case 25:
                                          metodoPago = 'Envío de deuda'
                                          break;
                                          case 26:
                                            metodoPago = 'Prescripción o caducidad'
                                            break;
                                            case 27:
                                              metodoPago = 'A satisfacción del acreedor'
                                              break;
                                              case 28:
                                                metodoPago = 'Tarjeta de débito'
                                                break;
                                                case 29:
                                                  metodoPago = 'Tarjeta de servicio'
                                                  break;
              
          
            default:
              metodoPago = 'Por definir'
              break;
          }


          if (res.items[0] != undefined) {
            if (res.items[0].unitCode == 'LTR') {
                const totalMXN = (res.total * (res.currency == "USD" ? res.exchangeRate : 1))
                const data = {
                  "UUID":res.uuid,
                  "RFC Emisor":res.issuer.rfc,
                  "Nombre del Emisor":res.issuer.name,
                  "RFC Receptor":res.receiver.rfc,
                  "Nombre del Receptor":res.receiver.name,
                  "Tipo":res.type == 'I' ? 'Ingreso':'',
                  "Estatus":res.status,
                  "PAC":res.pac,
                  "Moneda":res.currency,
                  "Fecha de Certificación":res.certifiedAt,
                  "Método de Pago":metodoPago,
                  "Fecha de Emisión":res.issuedAt,
                  "Condiciones de pago (original)":res.paymentTermsRaw,
                  "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                  "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                  "Descripción":res.items[0].description,
                  "Cantidad":res.items[0].quantity,
                  "Clave de unidad":res.items[0].unitCode,
                  "Valor unitario":res.items[0].unitAmount.toString(),
                  "Descuento":res.discount.toString(),
                  "Impuesto":res.tax.toString(),
                  "Subtotal":res.subtotal.toString(),
                  "Total":res.total.toString(),
                  "TotalMXN": totalMXN.toString()
                 }
                 compra[indexCompra] = data
  
  
                 indexCompra++
              }
            }

  
  
        // console.log(tabla);
        }
      
    });
    await delay(2300);
  }
  compra.forEach( record => {
    let columnIndex= 1;
    Object.keys(record ).forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++;
}); 
  while (ApiLengthV > 0) {
    var options = {
      'method': 'GET',
      'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${fechaD}T23:59:59.000Z&issuedAt[after]=${fechaD}T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
      'headers': {
        'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
      }
    };
    pagIndexVenta++
     request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
                  // console.log(diario);
        
      let temp = JSON.parse(response.body);
      temp = temp['hydra:member']

      ApiLengthV = temp.length
        for (const key in temp) {
          const res = temp[key]
          if (res.items[0] != undefined) {
            if (res.items[0].unitCode == 'LTR') {
              const totalMXN = (res.total * (res.currency == "USD" ? res.exchangeRate : 1))

              const data2 = {
                "UUID":res.uuid,
                "RFC Emisor":res.issuer.rfc,
                "Nombre del Emisor":res.issuer.name,
                "RFC Receptor":res.receiver.rfc,
                "Nombre del Receptor":res.receiver.name,
                "Tipo":res.type == 'I' ? 'Ingreso':'',
                "Estatus":res.status,
                "PAC":res.pac,
                "Moneda":res.currency,
                "Fecha de Certificación":res.certifiedAt,
                "Método de Pago":(res.paymentMethod == '99') ?  "Por definir":'',
                "Fecha de Emisión":res.issuedAt,
                "Condiciones de pago (original)":res.paymentTermsRaw,
                "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                "Descripción":res.items[0].description,
                "Clave de unidad":res.items[0].unitCode,
                "Valor unitario":res.items[0].unitAmount.toString(),
                "Descuento":res.discount.toString(),
                "Impuesto":res.tax.toString(),
                "Subtotal":res.subtotal.toString(),
                "Total":res.total.toString(),
                "TotalMXN": totalMXN.toString()
               }
               indexVenta++
               venta[indexVenta] = data2
  
    
            }
          }


        }


    });
    await delay(2300);
  }
  console.log("Venta");
  venta.forEach( record => {
    let columnIndex2= 1;
    Object.keys(record ).forEach(columnName =>{
      ws2.cell(rowIndex2,columnIndex2++)
      .string(record [columnName])
    });
    rowIndex2++;
  }); 
  console.log("Here");
  await delay(1000);
  wb.write(path.join(__dirname, `../public/Excel/Diario_${fechaD}.xlsx`));
  return
  
   

}
 async function PDF(data) {
   const directory = path.join(__dirname, `../public/pdf/certificaciones/${data.nombre}.pdf`);
   let index = 0;
   let indexQR = 0;
  const PDFGenerator = require('pdfkit')
  const fs = require('fs')

   let theOutput = new PDFGenerator
     const volumenIts = data.volumenIts
     const volumenBbls = data.volumenBbls
     const fechaMuestreo = data.fechaMuestreo
     const fehcaOR = data.fehcaOR
     const fechaED = data.fechaED
     const fechaAnalisis = data.fechaAnalisis
     const Producto = data.Producto
     const nRegistro = data.nRegistro
     const Objeto = data.Objeto


    /*--------------------------------------------------------------------------- */
    /*                    Empieza ciclo si hay mas de un pedido                   */
    /*--------------------------------------------------------------------------- */
    /*PDF */
   //  const direcciones = direccionesp[0];
    indexQR=0;


       theOutput.fontSize(12)
       .font('Times-Bold')
       .text(`I N F O R M E D E A N Á L I S I S      `, 100,50, {
       align: 'center',
       })
       theOutput.fontSize(10)
       .font('Times-Bold')
       .text(`DE ACUERDO AL CAPÍTULO 2.6 DE LOS CONTROLES VOLUMÉTRICOS Y EL ANEXO 32 DE LOS CERTIFICADOS Y DE LOS DICTÁMENES DE LABORATORIO APLICABLES A HIDROCARBUROS Y PETROLÍFEROS`,100,75, {
       align: 'center',
       })
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Razón Social: `,50,140, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Laboratorio: `,50,155, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Lote: `,50,170, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Localización:  `,50,185, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Producto:  `,50,200, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`No. Registro:  `,50,215, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Fecha de emisión de dictamen: `,50,230, {
         columns: 3,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Fecha análisis:  `,50,245, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(7)
       .font('Times-Roman')
         .text(`INVEX INFRAESTRUCTURA 4 S A P I DE CV `,180,140, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Amspec de Mexico`,180,155, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`TV-101_31012022 `,180,170, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Itzoil Terminal, Tuxpan, Veracruz`,180,185, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${Producto}`,180,200, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${nRegistro}`,180,215, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${fechaED}`,180,230, {
         columns: 4,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${fechaAnalisis}`,180,245, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });

       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`RFC: `,340,140, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`RFC: `,340,155, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Folio de Dictamen `,340,170, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Objeto: `,340,185, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Volumen (lts): `,340,200, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Volumen (bbls):`,340,215, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Fecha muestreo:`,340,230, {
         columns: 2,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`Fecha de obtención de resultados:`,340,245, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`IIC111110KM1`,455,140, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`AIM110324N49`,455,155, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`000327`,455,170, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${Objeto}`,455,185, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${volumenIts}`,455,200, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${volumenBbls}`,455,215, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${fechaMuestreo}`,455,230, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.fontSize(8)
       .font('Times-Roman')
         .text(`${fehcaOR}`,455,245, {
         columns: 1,
         columnGap: 15,
         align: 'justify'
       });
       theOutput.rect(50, 300, 520, 0).stroke();
        theOutput.rect(50, 301, 520, 0).stroke();
        theOutput.rect(50, 320, 520, 0).stroke();
        theOutput.rect(50, 320, 0, 115).stroke();
        theOutput.rect(570, 320, 0, 115).stroke();
        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Propiedad`,90,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.rect(170, 320, 0, 115).stroke();
        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Unidad`,185,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(230, 320, 0, 115).stroke();
        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Método de muestreo`,240,330, {
          columns: 5,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(300, 320, 0, 115).stroke();

        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Método ASTM `,310,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(370, 320, 0, 115).stroke();
        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Valor MIN `,380 ,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(430, 320, 0, 30).stroke();
        theOutput.rect(430, 370, 0, 40).stroke();
        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Valor MAX `,440,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(490, 320, 0, 115).stroke();
        theOutput.fontSize(7)
        .font('Times-Bold')
          .text(`Resultado`,500,330, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(50, 350, 520, 0).stroke();
        theOutput.rect(50, 370, 180, 0).stroke();
        theOutput.rect(50, 390, 180, 0).stroke();
        theOutput.rect(50, 410, 180, 0).stroke();
        theOutput.rect(50, 435, 520, 0).stroke();

        theOutput.rect(300, 370, 270, 0).stroke();
        theOutput.rect(300, 390, 270, 0).stroke();
        theOutput.rect(300, 410, 270, 0).stroke();

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Número de octano (RON)`,55,360, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Número de octano (MON)`,55,380, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`índice de octano (RON+MON)/2`,55,400, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Contenido de bioetanol (etanol anhidro)`,55,420, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Adimensional`,180,360, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Adimensional`,180,380, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Adimensional`,180,400, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`% vol `,190,420, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`ASTM D4057`,245,390, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`D2699`,325,360, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`D2700`,325,380, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`(D2699+D2700)/2`,310,400, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`D4815`,325,420, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Informar`,420,360, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`82`,395,380, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`87`,395,400, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`Informar`,420,420, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`91.2`,520,360, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`83.4`,520,380, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`87.3`,520,400, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(7)
        .font('Times-Roman')
          .text(`0.0`,520,420, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.rect(50, 450, 520, 0).stroke();
        theOutput.rect(50, 450, 0, 60).stroke();
        theOutput.rect(570, 450, 0, 60).stroke();

        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`Contiene combustible no fósil: `,70,470, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`No`,520,470, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(50, 490, 520, 0).stroke();
        theOutput.rect(50, 510, 520, 0).stroke();
        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`Porcentaje del combustible no fósil en la mezcla`,70,497, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.rect(230, 450, 0, 60).stroke();
        theOutput.rect(490, 450, 0, 60).stroke();

        theOutput.rect(300, 490, 0, 20).stroke();
        theOutput.rect(370, 490, 0, 20).stroke();
       //  theOutput.rect(430, 490, 0, 20).stroke();
        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`% vol `,245,497, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`Informar`,420,497, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(8)
        .font('Times-Roman')
          .text(`0.0`,520,497, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });

        theOutput.fontSize(8)
        .font('Times-Bold')
          .text(`Notas`,50,540, {
          columns: 1,
          columnGap: 15,
          align: 'justify'
        });
        theOutput.fontSize(8)
        .font('Times-BoldItalic')
        .text('CURSIVA', 50,560, {
         continued: true
       }).font('Times-Roman')
       .text('  - El resultado es menor que el límite de detección del método. El resultado más bajo posible es el que se presenta.');
       theOutput.fontSize(8)
       .font('Times-Bold')
       .text('SUBRAYADO', 50,580, {
        continued: true,
        underline:true
      }).font('Times-Roman')
      .text('  - El resultado es mayor que la especificación mínima requerida. El método se detuvo una vez que se confirma que cumple con la especificación.',{
        underline:false
      });
      theOutput.fontSize(8)
      .font('Times-Roman')
        .text(`Este producto cumple con las especificaciones de la norma NOM-016-CRE-2016`,50,610, {
        columns: 1,
        columnGap: 15,
        align: 'justify'
      });

       // theOutput.fontSize(10)
       // .font('Times-Bold')
       // .text(`${cuenta}`,110,5, {
       // width: 200,
       // align: 'left',
       // })

       //      theOutput
       //      .font('Times-Bold')
       //      .fontSize(12)
       //      .text(`Numero albaran: ${dataS[0].id_movimiento/5}`,10,60,{  align: 'left'});

       //      theOutput
       //      .font('Times-Bold')
       //      .fontSize(10)
       //      .text(`${direcciones.cliente}`,0,30,{  align: 'center'});

       //      theOutput
       //      .font('Times-Bold')
       //      .fontSize(12)
       //      .text(`Fecha: ${dataS[0].Fecha}`,150,50,{  align: 'right'});
       //      index = 0;

       //      theOutput
       //      .font('Times-Roman')
       //      .fontSize(12)
       //      .text(`${titleCase(dataS[key].concepto)}`, 20 , 80,{  align: 'center'})
       //        theOutput
       //        .font('Times-Roman')
       //        .fontSize(12)
       //        .text(`CANTIDAD (QTY): `, 50, 110, {
       //           align: 'center'
       //        })
       //        .font('Times-Bold')
       //        .fontSize(12)
       //        .text(`   ${dataS[key].cantidad}`, 130, 120);
       //        // const Nombre = req.signedCookies.Nombre.toLocaleLowerCase();
       //       // await pool.query(`UPDATE qr set Status = 1 WHERE nParte = ? AND Usuario = '${Nombre}'`,data[key]);
       //       if (dataS.length != (key -1 + 2)) {

       //         theOutput.addPage();
       //       }


      // else if (index == 4 ) {

      // }


    /*--------------------------------------------------------------------------- */
    /*                    Termina ciclo si hay mas de un pedido                   */
    /*--------------------------------------------------------------------------- */


  theOutput.pipe(fs.createWriteStream(directory))

  // write out file
  theOutput.end()

  }
  function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) } 
 module.exports = router;