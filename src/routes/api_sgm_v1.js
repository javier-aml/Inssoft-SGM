const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const router = express.Router();
const pool = require('../database');
// console.log(router);
// const pool = require('../database');
const fs = require("fs");
const cors = require("cors")
var corsOptions = {
  origin: 'http://localhost:3000',
  "methods": "GET,POST,OPTIONS",
  allowedHeaders:"Content-Type",
  credentials:true
}
const storage = multer.diskStorage({
  destination:  path.join(__dirname, '../public/formatos-sgm'),
  filename: function(req,file,cb) {
    cb(file.originalname);
  }
})
let tanque1 =require(path.join(__dirname, '../public/json/glencore/tanque1.json'))
let tanque2 =require(path.join(__dirname, '../public/json/glencore/tanque2.json'))
let tanque3 =require(path.join(__dirname, '../public/json/glencore/tanque3.json'))
let tanque4 =require(path.join(__dirname, '../public/json/glencore/tanque4.json'))
let tanque5 =require(path.join(__dirname, '../public/json/glencore/tanque5.json'))
let tanque6 =require(path.join(__dirname, '../public/json/glencore/tanque6.json'))
let tanque7 =require(path.join(__dirname, '../public/json/glencore/tanque7.json'))
let tanque8 =require(path.join(__dirname, '../public/json/glencore/tanque8.json'))
const delay = ms => new Promise(res => setTimeout(res, ms));
router.post('/TestApi',(req,res) => {
  const Prueba = {Test: 'Prueba'}
  res.send(Prueba)
})
router.post('/Estructura',async (req,res) => {
  try {
    //  dirRoot = await arbolArchivos()
     const Prueba = {
      "1": {
          "dirName": "Manuales",
          "file": {},
          "dir": {
              "1": {
                  "dirName": "Manual del SGM",
                  "file": {},
                  "dir": {},
                  "position": "1.1"
              }
          },
          "position": "1"
      },
      "2": {
          "dirName": "Procedimientos",
          "file": {},
          "dir": {
              "1": {
                  "dirName": "Control de Documentos y Registros",
                  "file": {},
                  "dir": {},
                  "position": "2.1"
              },
              "2": {
                  "dirName": "Competencia y Capacitaci¢n",
                  "file": {},
                  "dir": {},
                  "position": "2.2"
              },
              "3": {
                  "dirName": "Evaluaci¢n y Contrataci¢n de Proveedores y Prestadores de Servicios",
                  "file": {},
                  "dir": {},
                  "position": "2.3"
              },
              "4": {
                  "dirName": "Gesti¢n de los Equipos de Medici¢n del SGM",
                  "file": {},
                  "dir": {},
                  "position": "2.4"
              },
              "5": {
                  "dirName": "Definici¢n de Intervalos de Confirmaci¢n Metrol¢gica",
                  "file": {},
                  "dir": {},
                  "position": "2.5"
              },
              "6": {
                  "dirName": "Confirmaci¢n Metrol¢gica",
                  "file": {},
                  "dir": {},
                  "position": "2.6"
              },
              "7": {
                  "dirName": "Seguimiento de Procesos de Confirmaci¢n Metrol¢gica y Medici¢n",
                  "file": {},
                  "dir": {},
                  "position": "2.7"
              },
              "8": {
                  "dirName": "Detecci¢n de no Conformidades, Acciones Preventivas y Correctivas",
                  "file": {},
                  "dir": {},
                  "position": "2.8"
              },
              "9": {
                  "dirName": "Gesti¢n de Riesgos",
                  "file": {},
                  "dir": {},
                  "position": "2.9"
              },
              "10": {
                  "dirName": "Organizaci¢n y Administraci¢n del SGM",
                  "file": {},
                  "dir": {},
                  "position": "2.10"
              },
              "11": {
                  "dirName": "Auditor¡as",
                  "file": {},
                  "dir": {},
                  "position": "2.11"
              },
              "12": {
                  "dirName": "Revisi¢n por la direcci¢n",
                  "file": {},
                  "dir": {},
                  "position": "2.12"
              },
              "13": {
                  "dirName": "Gesti¢n del cambio",
                  "file": {},
                  "dir": {},
                  "position": "2.13"
              },
              "14": {
                  "dirName": "Estimaci¢n de Incertidumbre",
                  "file": {},
                  "dir": {},
                  "position": "2.14"
              }
          },
          "position": "2"
      },
      "3": {
          "dirName": "Formatos",
          "file": {},
          "dir": {
              "1": {
                  "dirName": "Formato de Manuales, Procedimientos y Anexos",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM01FORMATODEMANUALESPROCEDIMIENTOSYANEXOS",
                          "ext": "d"
                      }
                  },
                  "dir": {},
                  "position": "3.1"
              },
              "2": {
                  "dirName": "Formato de Instructivos de Trabajo",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM02FORMATODEINSTRUCTIVOSDETRABAJO",
                          "ext": "docx"
                      }
                  },
                  "dir": {},
                  "position": "3.2"
              },
              "3": {
                  "dirName": "C lculo de Volumen del Gas a Condiciones de Referencia",
                  "file": {},
                  "dir": {},
                  "position": "3.3"
              },
              "4": {
                  "dirName": "Lista Maestra de Documentos Controlados del SGM",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM04LISTAMAESTRADEDOCUMENTOSCONTROLADOSDELSG",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.4"
              },
              "5": {
                  "dirName": "Lista Maestra de Registros del SGM",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM05LISTAMAESTRADEREGISTROSDELSGM",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.5"
              },
              "6": {
                  "dirName": "Lista Maestra de Equipos del SGM",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM06LISTAMAESTRADEEQUIPOSDELSGM",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.6"
              },
              "7": {
                  "dirName": "Lista de Asistencia",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM07LISTADEASISTENCIA",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.7"
              },
              "8": {
                  "dirName": "Evaluaci¢n de Entendimiento de Manual, Procedimientos, Instructivos y Anexos",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM08EVALUACINDEENTENDIMIENTODEMANUALPROCEDIM",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.8"
              },
              "9": {
                  "dirName": "Programa de Capacitaci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM09PROGRAMADECAPACITACIN",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.9"
              },
              "10": {
                  "dirName": "Evaluaci¢n de Proveedores y Prestadores de Servicios",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM10EVALUACINDEPROVEEDORESYPRESTADORESDESERV",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.10"
              },
              "11": {
                  "dirName": "Especificaciones Metrol¢gicas",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM11ESPECIFICACIONESMETROLGICAS",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.11"
              },
              "12": {
                  "dirName": "Programa de Verificaci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM12PROGRAMADEVERIFICACIN",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.12"
              },
              "13": {
                  "dirName": "Programa de Calibraci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM13PROGRAMADECALIBRACIN",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.13"
              },
              "14": {
                  "dirName": "Plan de Gesti¢n del Cambio",
                  "file": {},
                  "dir": {},
                  "position": "3.14"
              },
              "15": {
                  "dirName": "Presupuesto de Incertidumbre",
                  "file": {},
                  "dir": {},
                  "position": "3.15"
              },
              "16": {
                  "dirName": "Seguimiento de Mediciones y Diferencias Volum‚tricas",
                  "file": {},
                  "dir": {},
                  "position": "3.16"
              },
              "17": {
                  "dirName": "Acciones Preventivas y Correctivas",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-FSM17ACCIONESPREVENTIVASYCORRECTIVAS",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.17"
              },
              "18": {
                  "dirName": "Matriz de Riesgos",
                  "file": {},
                  "dir": {},
                  "position": "3.18"
              },
              "19": {
                  "dirName": "Perfil de Puesto",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-19",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.19"
              },
              "20": {
                  "dirName": "Carta de Designaci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-20",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.20"
              },
              "21": {
                  "dirName": "Matriz de Responsabilidades",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-21",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.21"
              },
              "22": {
                  "dirName": "Detecci¢n de Necesidades de Capacitaci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-22",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.22"
              },
              "23": {
                  "dirName": "Programa de Auditor¡as",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-23",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.23"
              },
              "24": {
                  "dirName": "Plan de Auditor¡a Interna",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-24",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.24"
              },
              "25": {
                  "dirName": "Informe de Auditor¡a",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-25",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.25"
              },
              "26": {
                  "dirName": "Informe de Revisi¢n por la Direcci¢n",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-26",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.26"
              },
              "27": {
                  "dirName": "Plan de Atenci¢n de Hallazgos",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-27",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.27"
              },
              "28": {
                  "dirName": "Programa de Mantenimiento",
                  "file": {
                      "1": {
                          "fileName": "2022-12-20-28",
                          "ext": "html"
                      }
                  },
                  "dir": {},
                  "position": "3.28"
              }
          },
          "position": "3"
      },
      "4": {
          "dirName": "Anexos",
          "file": {},
          "dir": {
              "1": {
                  "dirName": "Diagrama Recepci¢n de Producto",
                  "file": {},
                  "dir": {},
                  "position": "4.1"
              },
              "2": {
                  "dirName": "Diagrama de Flujo del Proceso de Producto",
                  "file": {},
                  "dir": {},
                  "position": "4.2"
              },
              "3": {
                  "dirName": "Diagrama de Salida de Producto",
                  "file": {},
                  "dir": {},
                  "position": "4.3"
              }
          },
          "position": "4"
      }
  }
      res.send(Prueba)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})
router.post('/add/file',cors(corsOptions),async (req,res) => [

])
router.get('/TestApi',cors(corsOptions),(req,res) => {
  const Prueba = {Test: 'Prueba'}
  res.send(Prueba)
})
router.post('/DiarioGlencore/:fecha', cors(corsOptions), async (req, res) => {
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
const today = new Date(fecha)
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow = tomorrow.toLocaleDateString().replace("/", "-").replace("/", "-")
console.log(today);
console.log(tomorrow);
tomorrow = tomorrow.split('-')
tomorrow = `${tomorrow[2]}-${tomorrow[0]}-${tomorrow[1]}`
let tomorrowsplit = tomorrow.split("-")
if (tomorrowsplit[2].length == 1) {
  tomorrow = `${tomorrowsplit[0]}-${tomorrowsplit[1]}-0${tomorrowsplit[2]}`

}
 tomorrowsplit = tomorrow.split("-")
console.log(tomorrow);
if (tomorrowsplit[1].length == 1) {

  tomorrow = `${tomorrowsplit[0]}-0${tomorrowsplit[1]}-${tomorrowsplit[2]}`
}
      while (ApiLength > 0) {
        var options = {
          'method': 'GET',
          'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${tomorrow}T06:00:00.000Z&issuedAt[after]=${fecha}T06:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
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

            if (res.items[0] != undefined ) {
              if (res.items[0].unitCode == 'LTR' || res.items[0].unitCode == 'STL') {
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
                    RECEPCION.Complemento.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
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
                          tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
                          break;
                          case 5:
                            tanque5.Recepciones.RECEPCION.push(RECEPCION)
                            tanque5.Recepciones.TotalRecepciones= tanque5.Recepciones.TotalRecepciones + 1
                            tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque5.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                            tanque5.Recepciones.TotalDocumentos = tanque5.Recepciones.TotalDocumentos + 1
                            tanque5.Recepciones.SumaCompras = tanque5.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                            break;
                            case 8:
                              tanque8.Recepciones.RECEPCION.push(RECEPCION)
                              tanque8.Recepciones.TotalRecepciones= tanque8.Recepciones.TotalRecepciones + 1
                              tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque8.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                              tanque8.Recepciones.TotalDocumentos = tanque8.Recepciones.TotalDocumentos + 1
                              tanque8.Recepciones.SumaCompras = tanque8.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                              break;
                      
                        default:
                          tanque2.Recepciones.RECEPCION.push(RECEPCION)
                          tanque2.Recepciones.TotalRecepciones= tanque2.Recepciones.TotalRecepciones + 1
                          tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque2.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque2.Recepciones.TotalDocumentos = tanque2.Recepciones.TotalDocumentos + 1
                          tanque2.Recepciones.SumaCompras = tanque2.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
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
                          tanque6.Recepciones.SumaCompras = tanque6.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                          break;
                          case 3:
                            tanque3.Recepciones.RECEPCION.push(RECEPCION)
                            tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                            tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                            tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                            tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                            break;
                      
                        default:
                          tanque3.Recepciones.RECEPCION.push(RECEPCION)
                          tanque3.Recepciones.TotalRecepciones= tanque3.Recepciones.TotalRecepciones + 1
                          tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque3.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque3.Recepciones.TotalDocumentos = tanque3.Recepciones.TotalDocumentos + 1
                          tanque3.Recepciones.SumaCompras = tanque3.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
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
                          tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                          break;
                          case 7:
                            tanque7.Recepciones.RECEPCION.push(RECEPCION)
                            tanque7.Recepciones.TotalRecepciones= tanque7.Recepciones.TotalRecepciones + 1
                            tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque7.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                            tanque7.Recepciones.TotalDocumentos = tanque7.Recepciones.TotalDocumentos + 1
                            tanque7.Recepciones.SumaCompras = tanque7.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
                            break;
                      
                        default:
                          tanque1.Recepciones.RECEPCION.push(RECEPCION)
                          tanque1.Recepciones.TotalRecepciones= tanque1.Recepciones.TotalRecepciones + 1
                          tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico = tanque1.Recepciones.SumaVolumenRecepcion.ValorNumerico + res.items[0].quantity//ltr
                          tanque1.Recepciones.TotalDocumentos = tanque1.Recepciones.TotalDocumentos + 1
                          tanque1.Recepciones.SumaCompras = tanque1.Recepciones.SumaCompras +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount) //mxn
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
                      "Total":(res.items[0].discountAmount-res.tax+res.items[0].totalAmount),
                      "TotalMXN": (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
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
                      ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                      Impuesto:res.items[0] != undefined ? res.tax : '',
                      Moneda:res.currency,
                      VersionCFDI:res.version,
                      Fechacompleta:res.issuedAt.substring(0, 10),
                      TotalMXN:res.total
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
                    ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                    Impuesto:res.items[0] != undefined ? res.tax : '',
                    Moneda:res.currency,
                    VersionCFDI:res.version,
                    Fechacompleta:res.issuedAt.substring(0, 10),
                    TotalMXN:(res.total * res.exchangeRate)
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
      await delay(3300);
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
  while (ApiLengthVenta > 0) {
    var options = {
      'method': 'GET',
      'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=${tomorrow}T06:00:00.000Z&issuedAt[after]=${fecha}T06:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
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
        if (res.items[0] != undefined ) {
          console.log(res.items[0].unitCode);
          if (res.items[0].unitCode == 'LTR' || res.items[0].unitCode == 'STL') {
  
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
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
                Moneda:res.currency,
                VersionCFDI:res.version,
                Fechacompleta:res.issuedAt.substring(0, 10),
                TotalMXN:res.total
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
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
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
  await delay(3300);
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

  wb.write(path.join(__dirname, `../public/Excel/Diario_${fecha}.xlsx`));
  
  await delay(2000);
  const datos = {
    tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS
  }
    res.send(datos)
  
  
  
  
  
  
  
  
});
router.post('/MensualGlencore/:fecha', cors(corsOptions), async (req, res) => {
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
      'method': 'post',
      'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&receiver.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
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
        // console.log(res);
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
                RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
                RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
                RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
               
              // console.log(tabla);
                if (res.items[0].productIdentification == '15101514') {

                  productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
                  productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
                  
                  productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
                }
                if (res.items[0].productIdentification == '15101515') {
                  productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn

                  productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

                }
                if (res.items[0].productIdentification == '15101505') {
                  productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
                  productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
                  productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
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
                  "Total":(res.items[0].discountAmount-res.tax+res.items[0].totalAmount).toString(),
                  "TotalMXN": (res.items[0].discountAmount-res.tax+res.items[0].totalAmount).toString()
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
                  ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                  Impuesto:res.items[0] != undefined ? res.tax : '',
                  Moneda:res.currency,
                  VersionCFDI:res.version,
                  Fechacompleta:res.issuedAt.substring(0, 10),
                  TotalMXN:(res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
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
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
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
  await delay(3300);
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
  'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&issuer.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
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
              ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
              Impuesto:res.items[0] != undefined ? res.tax : '',
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
              ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
              Impuesto:res.items[0] != undefined ? res.tax : '',
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
await delay(3300);

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
let productoEstructura = require(path.join(__dirname, '../public/json/NatGas/Mensual/productoEstructura.json'))
router.post('/diario-natgas/:fecha', cors(corsOptions), async (req, res) => {
 try {
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
  let compraRepetidos = [];
  let ventaRepetidos = [];
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
const today = new Date(fecha)
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow = tomorrow.toLocaleDateString().replace("/", "-").replace("/", "-")
tomorrow = tomorrow.split('-')
tomorrow = `${tomorrow[2]}-${tomorrow[0]}-${tomorrow[1]}`
let tomorrowsplit = tomorrow.split("-")
console.log(tomorrow + ">>>>>>>>>>>>>>>")

if (tomorrowsplit[2].length == 1) {
tomorrow = `${tomorrowsplit[0]}-${tomorrowsplit[1]}-0${tomorrowsplit[2]}`

}
tomorrowsplit = tomorrow.split("-")
console.log(tomorrow + "<<<<<<<");
if (tomorrowsplit[1].length == 1) {

tomorrow = `${tomorrowsplit[0]}-0${tomorrowsplit[1]}-${tomorrowsplit[2]}`
}
  console.log(tomorrow + "---------");
  console.log(fecha);
  let indexLoopCompra = 0
  console.log(indexLoopCompra);
    while (indexLoopCompra < 3) {
      indexLoopCompra++
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${tomorrow}T06:00:00.000Z&issuedAt[after]=${fecha}T06:00:00.000Z&receiver.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
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
        for (const key in temp) {
          const res = temp[key]
          let metodoPago;
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
          fecha2 = fecha3
          if (res.items[0] != undefined) {
            let RECEPCION = {
              "TipoComplemento": "Expendio",
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
            RECEPCION.Nacional[0].RfcClienteOProveedor = res.receiver.rfc
            RECEPCION.Nacional[0].NombreClienteOProveedor = res.receiver.name
            RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
            RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
            RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
            RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
            RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
        
            productoEstructura.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
            productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
            productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
            productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
            productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
           
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

        // console.log(tabla);
        }

    });
    await delay(3300);
  
  
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
let indexLoopVenta = 0
console.log(indexLoopVenta < 3);
while (indexLoopVenta < 3) {
  indexLoopVenta++
  var options = {
    'method': 'GET',
    'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${tomorrow}T06:00:00.000Z&issuedAt[after]=${fecha}T06:00:00.000Z&issuer.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
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
      fecha5 = res.issuedAt.substring(0, 10)
      fecha4 = fecha5
      if (res.items[0] != undefined ) {
        let entregaGeneral = {
          
            "NombreClienteOProveedor": "PUBLICO EN GENERAL",
            "RfcClienteOProveedor": "XAXX010101000",
              "CFDIs": []
        
      }
      let entregaCFDI = {
        "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
        "TipoCfdi": "Ingreso",
        "PrecioVentaOCompraOContrap": 0.0,
        "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
        "VolumenDocumentado": {
            "ValorNumerico": 0.0,
            "UnidadDeMedida": "UM03"
        }
    }
      let entrega = {
          "NombreClienteOProveedor": "",
          "RfcClienteOProveedor": "",
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
    }
    console.log('Venta');
    console.log(res.uuid);
        if (res.receiver.rfc == "XAXX010101000") {
          for (const key in res.items) {
            entregaCFDI.Cfdi = res.uuid
            entregaCFDI.TipoCfdi = 'Ingreso'
            entregaCFDI.PrecioVentaOCompraOContrap = (res.items[key].totalAmount)
            entregaCFDI.FechaYHoraTransaccion = res.issuedAt
            entregaCFDI.VolumenDocumentado.ValorNumerico = res.items[key].quantity
           
              entregaGeneral.CFDIs.push(entregaCFDI)
              productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[key].quantity//ltr
              productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
              productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[key].totalAmount)//mxn
              
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
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
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
          }
        } else {
          entrega.RfcClienteOProveedor = res.receiver.rfc
          entrega.NombreClienteOProveedor = res.receiver.name
          entrega.CFDIs[0].Cfdi = res.uuid
          entrega.CFDIs[0].TipoCfdi = 'Ingreso'
          entrega.CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
          entrega.CFDIs[0].FechaYHoraTransaccion = res.issuedAt
          entrega.CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
         
            productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entrega)
            productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
            productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
            productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
            productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
            
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
              ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
              Impuesto:res.items[0] != undefined ? res.tax : '',
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
        }

  
  
          
        
  
      }


    // console.log(tabla);
    }

});
await delay(3300);
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
await delay(5000);
// let gas87 =require(path.join(__dirname, '../public/json/glencore/separarGas87.json'))
const event = new Date();
// // expected output: Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)
// // (note: your timezone may vary)


// estructura.Bitacora[0].NumeroRegistro = indexCompra + indexCompra
// estructura.Bitacora[0].FechaYHoraEvento = event.toISOString().slice(0,-1)
// estructura.FechaYHoraCorte = event.toISOString().slice(0,-1)

// estructuraNatGas.Producto.push(gas87)


// let fileNameKey = `DiarioTemp`

// // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
// //  fs.promises.mkdir(dirpath, { recursive: true })
// const fileJsonName = path.join(__dirname, `../public/json/glencore/DiarioTemp/${fileNameKey}.json`);
// fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
//   if (err) return console.log(err);

// });

wb.write(path.join(__dirname, `../public/Excel/Diario_${fecha}.xlsx`));

await delay(2000);
const datos = {
  tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS
}
  res.send(datos)

 } catch (error) {
  console.log(error);
  res.send(error)
 }

});
router.post('/mensual-natgas/:fecha', cors(corsOptions), async (req, res) => {
   try {
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
  let indexLoopCompra = 0
  while (indexLoopCompra < 3) {
    indexLoopCompra++
  console.log(fecha2.indexOf(fecha) != -1);
      var options = {
        'method': 'GET',
        'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-02T00:00:00.000Z&receiver.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100&type=I`,
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
          // console.log(res);
          fecha3 = res.issuedAt.substring(0, 10)
          fecha2 = fecha3
          console.log(fecha3);
          if (res.items[0] != undefined ) {
              let RECEPCION = {
                "TipoComplemento": "Expendio",
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
              console.log("normal");
              RECEPCION.Nacional[0].RfcClienteOProveedor = res.receiver.rfc
              RECEPCION.Nacional[0].NombreClienteOProveedor = res.receiver.name
              RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
              RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
              RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
              RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
              RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
          
              productoEstructura.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
              productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
              productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
              productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
              productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
              
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
                "Impuesto":res.tax,
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
                // ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                // Impuesto:res.items[0] != undefined ? res.tax : '',
              
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
  
  
        // console.log(tabla);
        }
  
    });
    await delay(3300);
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
  let indexLoopVenta = 0
  while (indexLoopVenta < 3) {
  indexLoopVenta++
  var options = {
    'method': 'GET',
    'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=${fecha}-30T23:59:59.000Z&issuedAt[after]=${fecha}-02T00:00:00.000Z&issuer.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&type=I`,
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
        let entregaGeneral = {
          
            "NombreClienteOProveedor": "PUBLICO EN GENERAL",
            "RfcClienteOProveedor": "XAXX010101000",
              "CFDIs": []
        
      }
      let entregaCFDI = {
        "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
        "TipoCfdi": "Ingreso",
        "PrecioVentaOCompraOContrap": 0.0,
        "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
        "VolumenDocumentado": {
            "ValorNumerico": 0.0,
            "UnidadDeMedida": "UM03"
        }
    }
      let entrega = {
          "NombreClienteOProveedor": "",
          "RfcClienteOProveedor": "",
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
    }
        if (res.receiver.rfc == "XAXX010101000") {
          for (const key in res.items) {
            entregaCFDI.Cfdi = res.uuid
            entregaCFDI.TipoCfdi = 'Ingreso'
            entregaCFDI.PrecioVentaOCompraOContrap = (res.items[key].totalAmount)
            entregaCFDI.FechaYHoraTransaccion = res.issuedAt
            entregaCFDI.VolumenDocumentado.ValorNumerico = res.items[key].quantity
           
              entregaGeneral.CFDIs.push(entregaCFDI)
              productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
              productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[key].quantity//ltr
              productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
              productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[key].totalAmount)//mxn
              
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
                ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
                Impuesto:res.items[0] != undefined ? res.tax : '',
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
          }
        } else {
          entrega.RfcClienteOProveedor = res.receiver.rfc
          entrega.NombreClienteOProveedor = res.receiver.name
          entrega.CFDIs[0].Cfdi = res.uuid
          entrega.CFDIs[0].TipoCfdi = 'Ingreso'
          entrega.CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
          entrega.CFDIs[0].FechaYHoraTransaccion = res.issuedAt
          entrega.CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
         
            productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entrega)
            productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoEstructura.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
            productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
            productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
            productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoEstructura.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
            
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
              "Impuesto":res.tax,
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
              // ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
              // Impuesto:res.items[0] != undefined ? res.tax : '',
            
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
        }

  
  
          
        
  
      }
  
  
    // console.log(tabla);
    }
  
  });
  await delay(4300);
  
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
  
  
  let estructura =require(path.join(__dirname, '../public/json/NatGas/Mensual/estructura.json'))
  const event = new Date();
  estructura.BitacoraMensual[0].NumeroRegistro = indexCompra + indexCompra
  estructura.BitacoraMensual[0].FechaYHoraEvento = event.toISOString().slice(0,-1)
  estructura.FechaYHoraReporteMes = event.toISOString().slice(0,-1)
  
  estructura.Producto.push(productoEstructura)
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
  let fileNameKey = `MesTempNatGas`
  
  // const dirpath = path.join(__dirname, `../public/json/jsonGenerados/Diario/Compra/${tabla[key].Folio}`);
  //  fs.promises.mkdir(dirpath, { recursive: true })
  const fileJsonName = path.join(__dirname, `../public/json/glencore/DiarioTemp/${fileNameKey}.json`);
  fs.writeFile(fileJsonName, JSON.stringify(estructura,null, 2), function writeJSON(err) {
  if (err) return console.log(err);
  
  });
  await delay(2000);
  const datos = {
    tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS
  }
    res.send(datos)
   } catch (error) {
    res.send(error)
   }
  
  
});
router.post('/calendar/simple',cors(corsOptions), async (req,res) =>{
  // const data = await pool.query("select *,DATE_FORMAT(Fecha,'%d-%m-%Y') AS date from tarea");
  let index = 0
  // console.log(data);
  let eventos = [];
  for (const key in data) {
    const split = data[key].date.split("T")
    const fecha2 = acomodarFecha(split[0]);
    const fecha = dateFormat(fecha2);
    const event = {
      id: index, //Event's ID (required)
       name: `${data[key].tarea}`, //Event name (required)
      date: fecha, //Event date (required)
       description: data[key].descTarea, //Event description (optional)
      type: "event",
      color: "#63d867"// Event custom color (optional)

    }
    eventos.push(event)
    index++
  }
  res.send(eventos)

});

function dateFormat(fecha) {
  const separar = fecha.split("-")
  let fechaformat = ""
  switch (separar[1]) {
    case "01":
      
    fechaformat = `January/${separar[2]}/${separar[0]}`	
    break;
      case "02":
      
      fechaformat = `February/${separar[2]}/${separar[0]}`	
      break;
        case "03":
      
        fechaformat = `March/${separar[2]}/${separar[0]}`	
        break;
          case "04":
      
          fechaformat = `April/${separar[2]}/${separar[0]}`	
          break;
            case "05":
      
            fechaformat = `May/${separar[2]}/${separar[0]}`	
            break;
              case "06":
      
              fechaformat = `June/${separar[2]}/${separar[0]}`	
              break;
                case "07":
      
                fechaformat = `July/${separar[2]}/${separar[0]}`	
                break;
                  case "08":
      
                  fechaformat = `August/${separar[2]}/${separar[0]}`	
                  break;
                    case "09":
      
                    fechaformat = `September/${separar[2]}/${separar[0]}`	
                    break;
                      case "10":
      
                      fechaformat = `October/${separar[2]}/${separar[0]}`	
                      break;
                        case "11":
      
                        fechaformat = `November/${separar[2]}/${separar[0]}`	
                        break;
  
    default:
      fechaformat = `November/${separar[2]}/${separar[0]}`	
      break;
  }
  return fechaformat
}
function acomodarFecha(date) {
  const split = date.split("-");
  const fecha = `${split[2]}-${split[1]}-${split[0]}`;
  return fecha;
  }

  async function arbolArchivos(){
    const directory =  await pool.any('SELECT * from schtelemetria.estructura_directorios_natgas;')
    const file = await pool.any('SELECT * from schtelemetria.estructura_archivos_natgas;')
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
    // console.log(root);
    return root;
  }


function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) } 
module.exports = router;