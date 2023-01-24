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
  "methods": "GET,POST,DELETE,OPTIONS",
  origin: ['http://localhost:3000','http://localhost:4000','http://127.0.0.1:3000','http://127.0.0.1:4000'],
  credentials:true
}
const storage = multer.diskStorage({
  destination:  path.join(__dirname, '../public/TestArchivosMulter'),
  filename: function(req,file,cb) {
    cb(null,file.originalname )
  }
})
const upload = multer({
  storage:storage,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})

const storageNatgas = multer.diskStorage({
  destination:path.join(__dirname, '../public/formatos-sgm/natgas'),
  filename: function(req,file,cb) {
    const hora = new Date();
    let datetext = hora.toTimeString();
    datetext = datetext.split(' ')[0];
    datetext = datetext.replace(':','-')
    datetext = datetext.replace(':','-')
    let name = acomodarFecha(DateNow())+`-${datetext}`+'-'+file.originalname
    // name = name.join().replace(',','_')
    name = name.replace(' ','_')
    name = name.replace(' ','_')
    name = name.replace(' ','_')
    name = name.replace(' ','_')
     name = name.replace(' ','_')
     name = name.replace(' ','_')
    // const ext = file.mimetype == 'application/pdf' ? '.pdf' : '';
    cb(null,name )
  }
})
const uploadNatgas = multer({
  storage:storageNatgas,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})
// const upload = multer({dest: path.join(__dirname, '../public/TestArchivosMulter')})

router.post('/api/uploadPDF', uploadNatgas.single('upl'),async function (req, res) {
  try {
    res.send('succes')
  } catch (error) {
    res.send(error)
  }
});

router.post('/api/uploadPDFNatgas/:fileP', uploadNatgas.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos_tomza WHERE position LIKE '${fileP}.%';`);
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
         console.log(max1);
         if (max1==null) {
              dataP = fileP + '.1'
         } else {
  
              dataP = max1.replace(/.$/,`${maxP}`)
         }
    }
   }
  //  var fileName = req.params.fileP
  //  var file = await pool.query(`SELECT id, "dirName", "position" FROM estructura_directorios_natgas WHERE position = '${fileName}';`);
  //  const fs = require('fs');
  //  let name = file[0].dirName.split(' ')
  //  name = name.join().replace(',','_')
  //  name = name.replace(',','_')
  //  name = name.replace(',','_')
  //  name = name.replace(',','_')
  //  name = name.replace(',','_')
  //   name = name.replace(',','_')
  //   name = name.replace(',','_')
  //  const hora = new Date();
  // let datetext = hora.toTimeString();
  // datetext = datetext.split(' ')[0];
  // datetext = datetext.replace(':','-')
  // datetext = datetext.replace(':','-')
  //  name = acomodarFecha(DateNow())+`-${datetext}`+'-'+name
  //  console.log(name);
  //  fs.rename(path.join(__dirname, '../public/formatos-sgm/natgas/file.pdf'), path.join(__dirname, '../public/formatos-sgm/natgas/', name + '.pdf'), () => {
  //     console.log("\nFile Renamed!\n");
  
  //   });
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos_natgas;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos_natgas WHERE position = '${dataP}';`);
    let positionInsert = ''
    let tempPsotion
    if (position.length === 0) {
      positionInsert = dataP
    }
    else{
      let index = 0;
      while (position.length !== 0) {
        positionInsert = ''
        if (index === 0) {
            tempPsotion = dataP
        }
        tempPsotion = tempPsotion.split('.')
        const lengthPosition = tempPsotion.length;
        const lastdigit= parseInt(tempPsotion[lengthPosition-1]) + position.length
        tempPsotion[lengthPosition-1] = lastdigit
        
        for (let index = 0; index < tempPsotion.length; index++) {
          positionInsert+=`${tempPsotion[index]}.`
        }
        positionInsert = positionInsert.substring(0, positionInsert.length - 1);
        tempPsotion= positionInsert;

        position = await pool.query(`SELECT * FROM estructura_archivos_natgas WHERE position = '${positionInsert}';`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos_natgas(id, "fileName", ext, "position", "Avalible", date) VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow())
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});

router.get('/Tareas/:Ubicacion',async function (req,res) {
  try {
    const ubicacion = req.params.Ubicacion;
    const tarea = await pool.any(`SELECT id, "descTarea", tarea, "Id_File", "Finished", to_char("Fecha", 'DD-MM-YYYY') as Fecha FROM tarea WHERE Tarea = '${ubicacion}';`)
    const ubicacionTarea = await pool.any(`SELECT * FROM estructura_directorios_natgas WHERE "position" = '${ubicacion}';`)
    const ubicacionHTML = await pool.any(`SELECT * FROM estructura_archivos_natgas WHERE "position" = '${ubicacion}.1' AND "ext" = 'html';`)
    res.send({tarea,ubicacionTarea,ubicacionHTML});
 } catch (error) {
   res.send(error)
 }
})
router.post('/add/task/:position/:nombre/:Fecha',async function (req, res) {
try {
  const nombre = req.params.nombre
  const position = req.params.position
  const Fecha = req.params.Fecha

  await pool.query('INSERT INTO tarea("descTarea", tarea,"Fecha", "Id_File", "Finished") VALUES(${descTarea},${tarea}, ${Fecha}, ${Id_File}, ${Finished})', {
    descTarea: nombre,
    tarea: position,
    Fecha: Fecha,
    Id_File : 1,
    "Finished": 1
  });
  res.send('test')
} catch (error) {
  res.send(error)
}
});
router.post('/delete/TaskTomza/:position',async function (req, res) {
  try {
    const position = req.params.position;
    await pool.query(`DELETE FROM tarea WHERE id= '${position}';`)
    res.send('test')
  } catch (error) {
    res.send(error)
  }
});
router.post('/delete/Tasknatgas/:position',async function (req, res) {
  try {
    const position = req.params.position;
    await pool.query(`DELETE FROM tarea WHERE id= '${position}';`)
    res.send('test')
  } catch (error) {
    res.send(error)
  }
});

router.post('/add/FileTomza/:fileP',async function (req, res) {
  try {
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos_tomza WHERE position LIKE '${fileP}.%';`);
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
         console.log(max1);
         if (max1==null) {
              dataP = fileP + '.1'
         } else {
  
              dataP = max1.replace(/.$/,`${maxP}`)
         }
    }
   }
   var fileName = req.params.fileP
   var file = await pool.query(`SELECT id, "dirName", "position" FROM estructura_directorios_tomza WHERE position = '${fileName}';`);
   const fs = require('fs');
   let name = file[0].dirName.split(' ')
   name = name.join().replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
    name = name.replace(',','_')
    name = name.replace(',','_')
   const hora = new Date();
  let datetext = hora.toTimeString();
  datetext = datetext.split(' ')[0];
  datetext = datetext.replace(':','-')
  datetext = datetext.replace(':','-')
   name = acomodarFecha(DateNow())+`-${datetext}`+'-'+name
   fs.rename(path.join(__dirname, '../public/TestArchivosMulter/file.pdf'), path.join(__dirname, '../public/formatos-sgm/tomza/', name + '.pdf'), () => {
      console.log("\nFile Renamed!\n");
  
    });
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos_tomza;`);
    await pool.query('INSERT INTO estructura_archivos_tomza(id, "fileName", ext, "position", "Avalible", date) VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date})', {
      id:maxID[0].max - 1 + 2,
      fileName: name,
      ext: 'pdf',
      position: dataP,
      Avalible:1,
      date: acomodarFecha(DateNow())
  });
  res.send('test')
  } catch (error) {
    res.send(error)
  }
});
router.post('/add/Filenatgas/:fileP',async function (req, res) {
  try {
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos_tomza WHERE position LIKE '${fileP}.%';`);
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
         console.log(max1);
         if (max1==null) {
              dataP = fileP + '.1'
         } else {
  
              dataP = max1.replace(/.$/,`${maxP}`)
         }
    }
   }
   var fileName = req.params.fileP
   var file = await pool.query(`SELECT id, "dirName", "position" FROM estructura_directorios_natgas WHERE position = '${fileName}';`);
   const fs = require('fs');
   let name = file[0].dirName.split(' ')
   name = name.join().replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
   name = name.replace(',','_')
    name = name.replace(',','_')
    name = name.replace(',','_')
   const hora = new Date();
  let datetext = hora.toTimeString();
  datetext = datetext.split(' ')[0];
  datetext = datetext.replace(':','-')
  datetext = datetext.replace(':','-')
   name = acomodarFecha(DateNow())+`-${datetext}`+'-'+name
   console.log(name);
   fs.rename(path.join(__dirname, '../public/formatos-sgm/natgas/file.pdf'), path.join(__dirname, '../public/formatos-sgm/natgas/', name + '.pdf'), () => {

      console.log("\nFile Renamed!\n");
  
    });
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos_natgas;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos_natgas WHERE position = '${dataP}';`);
    let positionInsert = ''
    let tempPsotion
    if (position.length === 0) {
      positionInsert = dataP
    }
    else{
      let index = 0;
      while (position.length !== 0) {
        positionInsert = ''
        if (index === 0) {
            tempPsotion = dataP
        }
        tempPsotion = tempPsotion.split('.')
        const lengthPosition = tempPsotion.length;
        const lastdigit= parseInt(tempPsotion[lengthPosition-1]) + position.length
        tempPsotion[lengthPosition-1] = lastdigit

        
        for (let index = 0; index < tempPsotion.length; index++) {
          positionInsert+=`${tempPsotion[index]}.`
        }
        positionInsert = positionInsert.substring(0, positionInsert.length - 1);
        tempPsotion= positionInsert;

        position = await pool.query(`SELECT * FROM estructura_archivos_natgas WHERE position = '${positionInsert}';`);
        index++;
      }
    }
    await pool.query('INSERT INTO estructura_archivos_natgas(id, "fileName", ext, "position", "Avalible", date) VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date})', {
      id:maxID[0].max - 1 + 2,
      fileName: name,
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow())
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
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
const delay = ms => new Promise(res => setTimeout(res, ms));
router.post('/TestApi',(req,res) => {
  const Prueba = {Test: 'Prueba'}
  res.send(Prueba)
})
router.get('/Task',async (req,res) => {
  try {
     const Task = await pool.query('SELECT * FROM tarea inner join estructura_directorios_natgas on tarea = "position";')
     const fechas = codigoFecha(Task);
     const urgente = sortObject(fechas.urgente);
     const noUrgente = sortObject(fechas.noUrgente);
     const retraso = sortObject(fechas.retraso);
     const Prueba = {urgente,noUrgente,retraso}
      res.send(Prueba)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})
router.post('/Estructura_natgas',async (req,res) => {
  try {
     dirRoot = await arbolArchivosNatgas()
     const Prueba = dirRoot
      res.send(Prueba)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})
router.post('/Estructura_tomza',async (req,res) => {
  try {
     dirRoot = await arbolArchivosTomza()
     const Prueba = dirRoot
      res.send(Prueba)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})
router.get('/TestApi',(req,res) => {
  const Prueba = {Test: 'Prueba'}
  res.send(Prueba)
})

//Descargas Excel
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
// Fin Descarga Excel

//Generacion de ZIP

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
//Generacion de Zip Fin
//Glencore Inicio
router.post('/diario-natgas1/:fecha', async (req, res) => {
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
tomorrow.setDate(tomorrow.getDate() + 3)
// tomorrow.setDate(tomorrow.getDate() + 1)
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
        console.log(tomorrow,fecha);
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
          // if (error) throw new Error(error);
          if (error){
            console.log(error);
          } 
          // console.log(response.body);
          // console.log(diario);
          
          
          let temp = JSON.parse(response.body);
          temp = temp['hydra:member']
          // res.send(temp)
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

            fecha2 = fecha3


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
                    console.log(res.issuedAt.substring(0, 10),fecha);
                    if (res.issuedAt.substring(0, 10) == fecha) {
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
                    if (res.issuedAt.substring(0, 10) == fecha) {
                      TotalMXN += parseFloat(tabla.TotalMXN);
                
                      TotalLTS += parseFloat(tabla.Cantidad);
                      jsonCompra[indexCompra] = tabla
                      compra[indexCompra] = dataTabla
                      indexCompra++
                    }

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
                  if (res.issuedAt.substring(0, 10) == fecha) {
                    TotalMXN += parseFloat(tabla.TotalMXN);
              
                    TotalLTS += parseFloat(tabla.Cantidad);
                    jsonCompra[indexCompra] = tabla
                    compra[indexCompra] = dataTabla
                    indexCompra++
                  }
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
    console.log(tomorrow,fecha);
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
      // if (error) throw new Error(error);
      if (error){
        console.log(error);
      } 
      // console.log(response.body);
                  // console.log(diario);
  
  
      let temp = JSON.parse(response.body);
      temp = temp['hydra:member']
      ApiLengthVenta = temp.length
      for (const key in temp) {
        const res = temp[key]
        console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

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
              const realDate = res.items[0].description.split(' ')
              console.log(fecha, realDate[0]);
              console.log(fecha == realDate[0]);
              if (fecha == realDate[0]) {
                totalMXNVT += parseFloat(tabla.TotalMXN);
                totalLTSVT += parseFloat(tabla.Cantidad);
                jsonVenta[indexVenta] = tabla
                venta[indexVenta] = dataTabla
                 indexVenta++
              }

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
              
              const realDate = res.items[0].description.split(' ')
              console.log(fecha, realDate[0]);
              console.log(fecha == realDate[0]);
              if (fecha == realDate[0]) {
                totalMXNVT += parseFloat(tabla.TotalMXN);
                totalLTSVT += parseFloat(tabla.Cantidad);
                jsonVenta[indexVenta] = tabla
                venta[indexVenta] = dataTabla
                 indexVenta++
              }

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
  } catch (error) {
    res.send(error)
  }
});
router.post('/mensual-natgas1/:fecha', async (req, res) => {
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
        //
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
            console.log(res.items[0].description);
            const realDate = res.items[0].description.split(' ')
            const dateTime = realDate[0];
            const parts = dateTime.split(/[- :]/);

            var month = parts[1];
            var year = parts[0];

            var currentdate = new Date(fecha+"-02");
            var cur_month = currentdate.getMonth() + 1;
            var cur_year = currentdate.getFullYear();
            console.log(currentdate);
            if (cur_month == month && year == cur_year) {
              venta[indexVenta] = dataExcel
              totalMXNVT += parseFloat(tabla.TotalMXN);
              totalLTSVT += parseFloat(tabla.Cantidad);
              jsonVenta[indexVenta] = tabla
               indexVenta++
            }


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
            console.log(res.items[0].description);
            const realDate = res.items[0].description.split(' ')
            const dateTime = realDate[0];
            const parts = dateTime.split(/[- :]/);

            var month = parts[1];
            var year = parts[0];

            var currentdate = new Date(fecha+"-02");
            var cur_month = currentdate.getMonth() + 1;
            var cur_year = currentdate.getFullYear();
            console.log(currentdate);
            if (cur_month == month && year == cur_year) {
              venta[indexVenta] = dataExcel
              totalMXNVT += parseFloat(tabla.TotalMXN);
              totalLTSVT += parseFloat(tabla.Cantidad);
              jsonVenta[indexVenta] = tabla
               indexVenta++
            }

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
const datos = {
  tabla,tablaVenta,totalMXNC,totalLTSC,totalMXNV,totalLTSV,diferenciaMXN,diferenciaLTS
}
  res.send(datos)
} catch (error) {
  res.send(error)
}

});
let productoEstructura = require(path.join(__dirname, '../public/json/NatGas/Mensual/productoEstructura.json'))
//Glencore Final
router.post('/diario-natgas/:fecha', async (req, res) => {
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
router.post('/mensual-natgas/:fecha', async (req, res) => {
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
          //
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
router.post('/calendar', async (req,res) =>{
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


router.get('/instrumentos/:id',cors(corsOptions), async (req, res) => {
  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "companyId incorrecto" });
    }

     const instrumentos = await pool.any('SELECT * FROM instrumento where "companyId" = $1',id)
     return res.status(200).json({ success: true, instrumentos });
  } catch (error) {
    console.log(error)
    return res.status(200).json({ success: false, error: 'Something failed!' });
  }
});

router.get('/instrumento/:id', async (req, res) => {

  try {
    
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "Id de instrumento incorrecto" });
    }

    await pool.any('SELECT * FROM instrumento where id = $1', id).then(data => {
      return res.status(200).json({ success: true, instrumento: data.length ? data: null });
    }).catch(error => {
      return res.status(200).json({ success: false, error: 'Something failed!' });
    });

  } catch (error) {
    return res.status(200).json({ success: false, error: 'Something failed!'});
  }
});

router.post('/instrumentos', async (req, res) => {

  try {
    const { 
      codigo = "", 
      fechaAlta = null,
      nombre = "",
      ubicacion = "",
      marca = "",
      modelo = "",
      amplitudMedicion = "",
      frecuenciaCalibracion = "",
      exactitudRequerida = "",
      incertidumbre = "",
      noSerie = "",
      noCertificado = "",
      noPatron = "",
      vigenciaPatron = null,
      ultimaCalibracion = null,
      tipo = 'Otros',
      companyId = 0
    } = req.body;

    let sql = `INSERT INTO instrumento
    ("codigo", "fechaAlta", "nombre","ubicacion", "marca", "modelo",
    "amplitudMedicion", "frecuenciaCalibracion", "exactitudRequerida",
    "incertidumbre", "noSerie", "noCertificado", "noPatron", 
    "vigenciaPatron","ultimaCalibracion", "tipo","companyId") 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`

    await pool.none(sql, [
      codigo, fechaAlta, nombre,
      ubicacion, marca, modelo,
      amplitudMedicion, frecuenciaCalibracion, 
      exactitudRequerida, incertidumbre, 
      noSerie, noCertificado, noPatron, 
      vigenciaPatron, ultimaCalibracion, tipo, companyId
    ]).then(data => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch(error => {
      console.log(error)
      return res.status(200).json({ success: false, error: 'Something failed!' });
    });
  } catch (error) {
    console.log(error)
    return res.status(200).json({ success: false, error: 'Something failed!' });
  }
});

router.get('/certificados-equipo/:id',cors(corsOptions), async (req, res) => {

  try {
    
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "Id de instrumento incorrecto" });
    }

    await pool.any('SELECT * FROM certificado_equipo where id_equipo = $1', id).then(data => {
      return res.status(200).json({ success: true, certificados: data.length ? data: null });
    }).catch(error => {
      return res.status(200).json({ success: false, error: 'Something failed!' });
    });
  } catch (error) {
    return res.status(200).json({ success: false, error: 'Something failed!' });
  }
});


const storageCertificado = multer.diskStorage({
  //destination:  path.join(__dirname, '../public/formatos-sgm/instrumentos/'),
  destination: function (req, file, cb) {
    const dest = path.join(__dirname, '../public/formatos-sgm/instrumentos/certificados')
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest,{ recursive: true });
    }

    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype == 'application/pdf' ? '.pdf' : '';
    cb(null, `cert-${Date.now()}${ext}`)
  }
})

const certificadoUpload = multer({
  storage:storageCertificado,
  limits: { fileSize: 3 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('¡Solo se aceptan archivos con extensión .pdf!'))
    }
  },
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
}).single('certificadoFile')

router.post('/certificados-equipo', cors(corsOptions), async (req, res) => {

  try {
    certificadoUpload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        const msg = err.code == 'LIMIT_FILE_SIZE' ? 'Solo se aceptan archivos de máximo 3MB': 'El archivos es incorrecto';
        return res.status(200).json({ success: false, error: msg });
      } else if (err) {
        return res.status(200).json({ success: false, error: err.message });
      }

      const fileName = req.file.filename;
      const id = Number(req.body.id);
      const { nombre = '', certificado = '', fechaIngreso = new Date()} = req.body

      if(isNaN(id)){
        return res.status(200).json({ success: false, msg: "Id de instrumento incorrecto" });
      }

      let sql = `INSERT INTO certificado_equipo
      ("id_equipo", "Nombre", "Certificado","Fecha_Ingreso", "FileName") 
      VALUES($1,$2,$3,$4,$5)`

      await pool.none(sql, [id,nombre,certificado,fechaIngreso,fileName]).then(data => {
        return res.status(200).json({ success: true });
      }) .catch(error => {
        console.log(error)
        fs.unlink(path.join(__dirname, '../public/formatos-sgm/instrumentos/certificados/',fileName), (err => {
          if (err) console.log(err);
          else {
            console.log("Deleted file: " + fileName);
          }
        }));
        return res.status(200).json({ success: false, error: 'Ocurrio un error al tratar de guardar la información' });
      });

    })

  } catch (error) {
    return res.status(200).json({ success: false, error: '¡Intenta nuevamente!' });
  }
});

router.delete('/certificados-equipo/:id', cors(corsOptions), async (req, res) => {

  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "Id de certificado incorrecto" });
    }
    else
    {

      //Get certificado
      await pool.any('SELECT * FROM certificado_equipo where id = $1', id).then(async data => {

        //Eliminar archivo
        const url = path.join(__dirname, '../public/formatos-sgm/instrumentos/certificados/',data[0].FileName)
        if(fs.existsSync(url)){
          fs.unlink(url, (err => {
            if (err) console.log(err);
            else {
              console.log("Deleted file: " + data[0].FileName);
            }
          }));
        }
        
        await pool.query('DELETE FROM certificado_equipo WHERE id= $1',id).then(data=>{
          return res.status(200).json({ success: true });
        }).catch(error => {
          return res.status(200).json({ success: false, error: 'Something failed!' });
        });

      }).catch(error => {
        return res.status(200).json({ success: false, error: 'Something failed!' });
      });
    }
  } catch (error) {
    return res.status(200).json({ success: false, error: '¡Intenta nuevamente!' });
  }
});

router.get('/documental-equipo/:id',cors(corsOptions), async (req, res) => {

  try {

    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "Id de instrumento incorrecto" });
    }

    await pool.any('SELECT * FROM documental_equipo where id_equipo = $1', id).then(data => {
      return res.status(200).json({ success: true, documentales: data.length ? data: null });
    }).catch(error => {
      return res.status(200).json({ success: false, error: 'Something failed!' });
    });
  } catch (error) {
    return res.status(200).json({ success: false, error: 'Something failed!' });
  }
});


const storageDocumental = multer.diskStorage({
  //destination:  path.join(__dirname, '../public/formatos-sgm/instrumentos/'),
  destination: function (req, file, cb) {
    const dest = path.join(__dirname, '../public/formatos-sgm/instrumentos/documental')
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest,{ recursive: true });
    }

    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype == 'application/pdf' ? '.pdf' : '';
    cb(null, `documental-${Date.now()}${ext}`)
  }
})

const documentalUpload = multer({
  storage:storageDocumental,
  limits: { fileSize: 3 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('¡Solo se aceptan archivos con extensión .pdf!'))
    }
  },
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
}).single('documentalFile')

router.post('/documental-equipo', cors(corsOptions), async (req, res) => {

  try {
    documentalUpload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        const msg = err.code == 'LIMIT_FILE_SIZE' ? 'Solo se aceptan archivos de máximo 3MB': 'El archivos es incorrecto';
        return res.status(200).json({ success: false, error: msg });
      } else if (err) {
        return res.status(200).json({ success: false, error: err.message });
      }

      const fileName = req.file.filename;
      const id = Number(req.body.id);
      const { nombre = '', tipo = '', fechaIngreso = new Date()} = req.body

      if(isNaN(id)){
        return res.status(200).json({ success: false, msg: "Id de instrumento incorrecto" });
      }

      let sql = `INSERT INTO documental_equipo
      ("id_equipo", "Nombre", "Tipo","Fecha_Ingreso", "FileName") 
      VALUES($1,$2,$3,$4,$5)`

      await pool.none(sql, [id,nombre,tipo,fechaIngreso,fileName]).then(data => {
        return res.status(200).json({ success: true });
      }) .catch(error => {
        console.log(error)
        fs.unlink(path.join(__dirname, '../public/formatos-sgm/instrumentos/documental/',fileName), (err => {
          if (err) console.log(err);
          else {
            console.log("Deleted file: " + fileName);
          }
        }));
        return res.status(200).json({ success: false, error: 'Ocurrio un error al tratar de guardar la información' });
      });

    })

  } catch (error) {
    return res.status(200).json({ success: false, error: '¡Intenta nuevamente!' });
  }
});

router.delete('/documental-equipo/:id', cors(corsOptions), async (req, res) => {

  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "Id de documento incorrecto" });
    }
    else
    {

      //Get documental
      await pool.any('SELECT * FROM documental_equipo where id = $1', id).then(async data => {

        //Eliminar archivo
        const url = path.join(__dirname, '../public/formatos-sgm/instrumentos/documental/',data[0].FileName)
        if(fs.existsSync(url)){
          fs.unlink(url, (err => {
            if (err) console.log(err);
            else {
              console.log("Deleted file: " + data[0].FileName);
            }
          }));
        }
        
        await pool.query('DELETE FROM documental_equipo WHERE id= $1',id).then( data => {
          return res.status(200).json({ success: true });
        }).catch(error => {
          return res.status(200).json({ success: false, error: 'Something failed!' });
        });

      }).catch(error => {
        return res.status(200).json({ success: false, error: 'Something failed!' });
      });
    }
  } catch (error) {
    return res.status(200).json({ success: false, error: '¡Intenta nuevamente!' });
  }
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
  async function arbolArchivosNatgas(){
    const directory =  await pool.any('SELECT * from estructura_directorios_natgas;')
    const file = await pool.any('SELECT * from estructura_archivos_natgas;')
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

  async function arbolArchivosTomza(){
    const directory =  await pool.any('SELECT * from estructura_directorios_tomza;')
    const file = await pool.any('SELECT * from estructura_archivos_tomza;')
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

restaFechas = function (f1, f2) {
  var aFecha1 = f1.split('-');
  var aFecha2 = f2.split('-');
  var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
  var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
  var dif = fFecha2 - fFecha1;
  var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
  return dias;
}

function codigoFecha(data) {
  var datoFecha = {}
  datoFecha["urgente"] = {};
  datoFecha["noUrgente"] = {};
  datoFecha["retraso"] = {};
  // proveedor = proveedor.toLocaleLowerCase();
    for (const key in data) {
        var dateObj = new Date();
        var mes = dateObj.getUTCMonth() + 1; //mes de 1-12
        var dia = dateObj.getUTCDate();
        var año = dateObj.getUTCFullYear();
        const fecha1 = `${dia}-${mes}-${año}`;
        let fechaTemp =data[key].Fecha.toISOString().split('T')[0]
        fechaTemp = acomodarFecha(fechaTemp)
        const fecha2 = fechaTemp
        
        const resta = restaFechas(fecha1, fecha2);
      
        if (resta < 0) {
      
          datoFecha["retraso"][`${data[key].tarea}`] = {FechaRestante:(resta * -1),proveedor:`${data[key].tarea} - ${data[key].dirName}`,position:data[key].tarea,desc:data[key].descTarea,Fecha:data[key].Fecha};
        }else if (resta < 11) {
          datoFecha["urgente"][`${data[key].tarea}`] = {FechaRestante:resta,proveedor:`${data[key].tarea} - ${data[key].dirName}`,position:data[key].tarea,desc:data[key].descTarea,Fecha:data[key].Fecha};
        }
        else {
          datoFecha["noUrgente"][`${data[key].tarea}`] = {FechaRestante:resta,proveedor:`${data[key].tarea} - ${data[key].dirName}`,position:data[key].tarea,desc:data[key].descTarea,Fecha:data[key].Fecha};
        }
    }
  
  return datoFecha;
 
}
function sortObject(obj) {
  var arr = [];
  for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          arr.push({
              'key': prop,
              'value': obj[prop]
          });
      }
  }
  arr.sort(function(a, b) { return a.value - b.value; });
  //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
  return arr; // returns array
}
const archiver = require('archiver');

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
module.exports = router;