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
const BalanceController = require('../controllers/balance.controller');
const moment = require('moment');

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
const storageSoftoil = multer.diskStorage({
  destination:path.join(__dirname, '../public/formatos-sgm/softoil'),
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
const uploadSoftoil = multer({
  storage:storageSoftoil,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})
const storageTomza = multer.diskStorage({
  destination:path.join(__dirname, '../public/formatos-sgm/tomza'),
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
const uploadTomza = multer({
  storage:storageTomza,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})

const storageKansas = multer.diskStorage({
  destination:path.join(__dirname, '../public/formatos-sgm/kansas'),
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
const uploadKansas = multer({
  storage:storageKansas,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})

const storageTogo = multer.diskStorage({
  destination:path.join(__dirname, '../public/formatos-sgm/togo'),
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
const uploadTogo = multer({
  storage:storageTogo,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
})
router.get('/estructura/:id',async function(req,res){
  try {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(200).json({ success: false, msg: "companyId incorrecto" });
    }
    dirRoot = await arbolArchivos(id)
    const Prueba = dirRoot
     res.send(Prueba)
 } catch (error) {
   console.log(error);
   res.send(error)
 }
})
// const upload = multer({dest: path.join(__dirname, '../public/TestArchivosMulter')})
router.get('/test/html',function(req,res){
  console.log(path.join(__dirname, '../public/formatos-sgm/natgas1/19.html'));
  fs.readFile(path.join(__dirname, '../public/formatos-sgm/natgas1/19.html'), 'utf8', function(err, html){
    console.log();
    res.send(html)
  })
})
router.post('/api/uploadPDF', uploadNatgas.single('upl'),async function (req, res) {
  try {
    res.send('succes')
  } catch (error) {
    res.send(error)
  }
});

// FETCHES HTML CUSTOMER SGM FORMATS
router.get('/api/getFormats/:companyId/:fileName', async function(req, res){
  try{
    const companyId = req.params.companyId
    let fileName = req.params.fileName

    const fileExtSql = `
      SELECT ext
      FROM schtelemetria.estructura_archivos
      WHERE "companyId" = ${companyId}
      AND "fileName" = '${fileName}'
      FETCH FIRST 1 ROWS ONLY;    
    `
    // VALIDATES THAT THE FILE EXISTS IN THE DB
    let fileExt = await pool.any(fileExtSql)

    if(!fileExt.length) throw new Error('Database resouce not found')
    
    fileExt = fileExt[0].ext

    // SELECTS THE FILE REPOSITORY
    let filePath = [
      {id:1, path:'natgas'},
      {id:2, path:'tomza'},
      {id:3, path:'kansas'},
      {id:4, path:'togo'}
    ].find((item) => item.id === +companyId)

    filePath = filePath ? filePath.path : null

    if(!filePath) throw new Error('File path not found')

    filePath = `../public/formatos-sgm/${filePath}/${fileName}.${fileExt}`

    // VALIDATES THAT THE FILE EXISTS
    if(!fs.existsSync(path.join(__dirname, filePath))) throw new Error('File not found')  

    res.sendFile(path.join(__dirname, filePath))
  } catch (error){
    res.send(new Error(error))
  }
})

router.post('/api/uploadPDFNatgas/:fileP', uploadNatgas.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos WHERE position LIKE '${fileP}.%' AND "companyId" = ${1};`);
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
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${dataP}'  AND "companyId" = 1;`);
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

        position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${positionInsert}'  AND "companyId" = 1;`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos(id, "fileName", ext, "position", "Avalible", date,"companyId") VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date},${companyId})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow()),
      companyId:1
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
router.post('/api/uploadSoftoil/:fileP', uploadSoftoil.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos WHERE position LIKE '${fileP}.%' AND "companyId" = ${6};`);
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
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${dataP}'  AND "companyId" = 6;`);
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

        position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${positionInsert}'  AND "companyId" = 6;`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos(id, "fileName", ext, "position", "Avalible", date,"companyId") VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date},${companyId})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow()),
      companyId:6
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
router.post('/api/uploadPDFTomza/:fileP', uploadTomza.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos WHERE position LIKE '${fileP}.%' AND "companyId" = ${2};`);
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
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${dataP}'  AND "companyId" = 2;`);
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

        position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${positionInsert}'  AND "companyId" = 2;`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos(id, "fileName", ext, "position", "Avalible", date,"companyId") VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date},${companyId})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow()),
      companyId:2
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
router.post('/api/uploadPDFKansas/:fileP', uploadKansas.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos WHERE position LIKE '${fileP}.%' AND "companyId" = ${3};`);
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
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${dataP}'  AND "companyId" = 3;`);
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

        position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${positionInsert}'  AND "companyId" = 3;`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos(id, "fileName", ext, "position", "Avalible", date,"companyId") VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date},${companyId})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow()),
      companyId:3
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
router.post('/api/uploadPDFTogo/:fileP', uploadTogo.single('upl'),async function (req, res) {
  try {
    console.log(req.file);
    let fileP = req.params.fileP
    if (fileP ==  '1') {
     dataP = '1.1'
   } else {
    max = await pool.query(`SELECT * FROM estructura_archivos WHERE position LIKE '${fileP}.%' AND "companyId" = ${4};`);
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
    let name = req.file.filename;
    name = name.split('.')
    name = name[0];
    const maxID = await pool.query(`SELECT max(id) as max FROM estructura_archivos;`);
    let position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${dataP}'  AND "companyId" = 4;`);
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

        position = await pool.query(`SELECT * FROM estructura_archivos WHERE position = '${positionInsert}'  AND "companyId" = 4;`);
        index++;
      }
    }

    await pool.query('INSERT INTO estructura_archivos(id, "fileName", ext, "position", "Avalible", date,"companyId") VALUES(${id},${fileName},${ext}, ${position}, ${Avalible},${date},${companyId})', {
      id:maxID[0].max - 1 + 2,
      fileName: name.replace('.pdf',''),
      ext: 'pdf',
      position: positionInsert,
      Avalible:1,
      date: acomodarFecha(DateNow()),
      companyId:4
  });
  res.send(positionInsert)
  } catch (error) {
    res.send(error)
  }
});
router.get('/Tareas/:Ubicacion/:id',async function (req,res) {
  try {
    const ubicacion = req.params.Ubicacion;
    const id = req.params.id

    const tarea = await pool.any(`SELECT id, "descTarea", tarea, "Id_File", "Finished", to_char("Fecha", 'DD-MM-YYYY') as Fecha FROM tarea WHERE Tarea = '${ubicacion}' AND "companyId" = ${id};`)
    const ubicacionTarea = await pool.any(`SELECT * FROM estructura_directorios WHERE "companyId" = ${id} AND "position" = '${ubicacion}' ;`)
    const ubicacionHTML = await pool.any(`SELECT * FROM estructura_archivos WHERE "companyId" = ${id} AND "position" = '${ubicacion}.1' AND "ext" = 'html' ;`)
    res.send({tarea,ubicacionTarea,ubicacionHTML});
 } catch (error) {
   res.send(error)
 }
})
router.post('/add/task/:position/:nombre/:Fecha/:id',async function (req, res) {
try {
  const nombre = req.params.nombre
  const position = req.params.position
  let Fecha = req.params.Fecha
  const id = req.params.id
  // // Fecha = Fecha.split('-')
  // // Fecha = `${Fecha[1]}-${Fecha[0]}-${Fecha[2]}`
  await pool.query('INSERT INTO tarea("descTarea", tarea,"Fecha", "Id_File", "Finished", "companyId", "Estado") VALUES(${descTarea},${tarea}, ${Fecha}, ${Id_File}, ${Finished}, ${companyId}, ${Estado})', {
    descTarea: nombre,
    tarea: position,
    Fecha: Fecha,
    Id_File : 1,
    "Finished": 1,
    companyId: id,
    Estado:0
  });
  res.send('test')
} catch (error) {
  res.send(error)
}
});
router.post('/delete/TaskTomza/:position',async function (req, res) {
  try {
    const position = req.params.position;
    // await pool.query(`DELETE FROM tarea WHERE id= '${position}';`)
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
router.get('/Task/:id',async (req,res) => {
  try {
    const id = req.params.id
     const Task = await pool.query('SELECT * FROM tarea inner join estructura_directorios on tarea = "position" WHERE  tarea."companyId" = $1',id)
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
router.get('/Taskprueba',async (req,res) => {
  try {
    const id = req.params.id
     const Tasks = await pool.query('SELECT * FROM tarea WHERE "Estado"= 0;')
     console.log(Tasks);
     const fechas = codigoFecha(Tasks);
    return  res.send(Tasks)
  } catch (error) {
    console.log(error);
     return res.send(error)
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
router.get('/TestApi',async(req,res) => {
  try {
    const Prueba = {Test: 'Prueba'}
    const test = await pool.query('select * from estructura_directorios_natgas;')
    res.send(Prueba)
  } catch (error) {
    res.send(error)
  }
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
router.post('/diario-glencore/:fecha', async (req, res) => {
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
                    var fechaInicio = new Date(fecha).getTime();
                    var fechaFin    = new Date('2022-12-15').getTime();

                    var diff = fechaFin - fechaInicio;
                    diff = diff/(1000*60*60*24)
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
router.post('/mensual-glencore/:fecha', async (req, res) => {
try {
  console.log("mess");
  const xl = require('excel4node');
console.log("Empieza");
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Compra');
const ws2 = wb.addWorksheet('Venta');
const canceladasCompra = [
  '2c42546e-2572-42db-b8f9-2acb3bea3c8d',
'3353594b-7342-4f25-a493-ed0107a138dd',
'3f453a62-3360-4a25-9898-6986cff111ed',
  '0457f030-90ac-11ed-82d3-efa29b296744',
'0457f093-90ac-11ed-bf41-1b08b9fbe25a',
'2ec1b063-9175-11ed-ba06-c1128e626068',
'57a5f0a6-96f5-11ed-9cbb-cb95ce0903ab',
'57a5f0bd-96f5-11ed-94ad-0b7629f5bec8',
'820fb063-97be-11ed-94d4-39684dab5900',
'820fb076-97be-11ed-92ef-07c9fc52af3c',
'820fb0f6-97be-11ed-a3e1-a5ff97993ac3',
'a8d5d983-a1f5-11ed-a444-47051edc176f',
'a8d5d989-a1f5-11ed-917a-69e168d81682',
'a8d5d991-a1f5-11ed-adb3-f59bb660bc2f',
'a8d5d992-a1f5-11ed-8053-9d9e1e2fc4b6',
'a8d5d9a4-a1f5-11ed-8ac3-57759c4a9b7d',
'a8d5d9e9-a1f5-11ed-9a59-2523e7c040ed',
'a8d5d9eb-a1f5-11ed-b9c5-67481955bc9c',
'a8d5d9f0-a1f5-11ed-9a9a-f7321bfee22e',
'a8d5d9f4-a1f5-11ed-83ab-b9c9e068136c',
'a8d5da1f-a1f5-11ed-8601-9b37d678c2fe',
'a8d5da35-a1f5-11ed-b9c7-554a58e7c370',
'a8d5da3e-a1f5-11ed-98b8-6b78c0021423',
'a8d5da48-a1f5-11ed-995f-9dc2032d68a2',
'a8d5da50-a1f5-11ed-9d9e-c9665abb6181',
  '5e0aa035-98d7-4ca2-aed4-bf7e192a4e2e',
  '6761ef54-f9e3-47be-a98c-1711f7cc8473',
  '54581dea-b75c-468f-b4ce-87160579460f',
  '1392bba0-5efb-44b2-a3e2-cc10cd88fc54',
  '38bed66e-aa7f-438d-8274-1bdc61f8d7c2',
  '7154eb17-e58e-4685-a27e-911c2e14a1d7',
  '27ee892f-5740-4825-9c68-85628d1f8b63',
  'ce94f379-4089-4e6f-8172-5ebf45824c42',
  '76243767-2442-4e69-b5dc-770c9c266216',
  'c2f644e4-7ad3-4371-9857-40993f7f4cdd',
  'fc0632e1-7edb-4270-9cbb-f8f19f9be209',
  '4c867654-5d7c-407a-b5a6-62620ef2c007',
  '1204397a-c8b7-45cf-97dc-db2f8260b3dd',
  '1c8600d1-62d9-4eb5-ae06-577fba16ab26',
  'c56a6b62-14ae-42df-82cd-b8c576b225e6',
  '1efcaff9-0b97-483b-974b-cb387be754fe',
  '6bc31f3a-6e3a-4e52-8407-4e468f699249',
  'd87a0a45-f1d1-4789-92c3-5a00d8592f83',
  '4ebf9633-2cb4-4675-8063-375f84300e54',
  '8e9266cd-a656-4238-8f10-3113d7f892f2',
  'fc0cf0e5-937f-4f56-90bd-d4a694dfc048',
  '7daeefab-2f22-4d47-88c6-f628f5f73ab7',
  'c5156808-ecbb-4fe3-97f4-a8257b50a645',
  'c07c5ae3-ce8e-425c-abb5-98e6a4be52fe',
  '0f831755-084e-4fdb-a8f2-ea6bc61f2d07',
  '68eefc03-1475-4395-93de-7d09947476e8',
  '67eb14a0-affd-4c60-8412-eb4c6161c695',
  'ea46371c-9349-4046-97b2-ffc3403f20f1',
  '34bcb15a-871b-4771-b0ca-5c904d18477c',
  'c1e88097-b581-4756-945d-512384328137',
  '10dc94db-5203-45b4-b6db-4ca34fbcdc7b',
  'bf7aef87-79af-4cac-8605-9283b707d768',
  '465409b5-7c26-4a32-8e9f-48e4df68e3b9',
  '11e878de-57ed-4c43-beb6-6b48bcc2c1e8',
  '489331eb-8af6-4d4e-bf33-e0fbe3aab9dc',
  'cf61afa9-72b3-4f00-92b9-b1932e9bb5f5',
  'f6b42265-862f-4367-bd60-012c646e8d83',
  '883174fa-442a-450d-8fc1-952debb032ae',
  '364251a9-a85e-4d53-97a8-d3c350802737',
  '32c7fdf9-ce05-4298-be3a-23edf81b9e2e',
  'f219eba5-a754-4f26-8771-bb7f7fc1372d',
  '2c0716f3-2fa7-4537-9f32-a7776bb22a80',
  '2b848b35-00c9-4c1a-9983-00bfa23cb3b4',
  '173b7280-f759-46d4-9f81-80681df369c1',
  '5df16efc-231a-4d66-a656-d5ef2ddea73e',
  '599b70b7-5358-4728-83d8-fcebbf34e6f1',
  'afee81a8-d97e-46bd-b269-998c0b2d391e',
  '58b7f931-4aed-4d85-bd4a-8458fae38056',
  'df6a3d73-327f-4700-8795-f97681ea5510',
  '0e40b779-b9bb-4d00-84fe-fffdcc03530d',
  'c799e029-e0e2-4aba-8718-83d1573ea77a',
  'f6048c70-6a35-4188-88a1-3c5bf3c67785',
  'dbae80cd-7659-4cbc-8c5a-90727ad93cf2',
  '036b381a-75e7-4eec-a0ec-2a8f4b5ff2e9',
  'd3ab1876-ef91-4095-a104-98837e9ef98d',
  '09fff310-bc6e-4d52-a3da-5e4ffc8ea29e',
  '1e55b483-4a8f-45fa-b894-c6d694fb629c',
  'ded7ca87-6198-4b98-b210-b81a4e2746c7',
  'c7c362de-64cd-44fb-add7-5c10364ce95c',
  'e0ab1dab-7924-4c5b-9f70-83af18467e68',
  '7e8ad45d-2839-4603-9743-b2c8beba7e9c',
  '7d0c6d20-9680-4204-a38c-d7a7d7c60070',
  '118c7b92-da4d-4633-8350-ce7e6030100f',
  '7cb3fa7c-513a-4309-a3bf-6daccb3890db',
  'e0baf555-ffc3-4bc4-9c86-be8697ea4257',
  '84296e20-b021-4046-b76d-a3161ecd119d',
  '5ac565bc-3d2a-4da9-a3ec-6a9b1903d16c',
  'dd798f55-cee6-40b2-9b72-a96e9dced91b',
  'ad8f3df8-52b6-4452-a426-3c14aca969d4',
  'e6d954ed-7539-4efe-a56b-124f8172f577',
  '0c585914-8daf-4842-9b6e-20302271c626',
  'c4a592e2-9788-4122-8807-a01e89f89642',
  '54d9e5f6-2d3b-4284-9871-adac82af0a72',
  'a0160730-0c85-45a7-917a-198efe1e7925',
  '65d31a92-71ad-4421-abe6-0078548e9f25',
  'b20a43e2-0a6c-4737-a22f-e752c786534f',
  '4c2c1542-15af-482c-b7dc-8076a6861f65',
  '7f90a760-a418-482b-959d-e76ad617cd03',
  '1c39924e-39a9-442f-92ea-0f8acaa3c676',
  '6281d5ee-a03b-43c2-be74-94e398242c68',
  '265efa32-d3b7-4111-8c04-48ad58c04db2',
  'd7bc4c32-3f4d-4cda-8dfb-8fa27a597aec',
  'a0b7075e-139b-4868-9a99-ff784188b907',
  '4c463b56-50d5-4428-870a-a21da86817fa',
  '98ff47de-5b66-4c6b-ae1b-9e260c26664d',
  'd294dd4b-e05b-417c-843a-76cf4ee73ad2',
  'fd3eb67b-bb2d-4ab2-b127-a3b327558391',
  'be525d5a-63fe-4006-8774-93af762fffc4',
  'c50155ec-0d66-49b1-bfe6-3a48f055a828',
  'abe2d6bd-6cd4-4a0b-a25e-be0c5d600159',
  'b3268237-4f6f-4fed-85c9-46e245966646',
  '2a546524-258c-4db1-8713-a9d5627c8e91',
  'ce34658f-86e1-442d-b69c-e6e7a375da59',
  '49936917-7837-4b06-b073-cd85b1fe2974',
  '6f36a2f8-0422-4aa8-92ba-0df6acc66859',
  'b6b77cc6-fb11-4a20-87e4-ae375cd5ab7f',
  '7d67f6e3-2e1e-4838-be19-dd04dbf8ac92',
  'f71d5e68-6544-443c-a5d5-2a622690a497',
  '59f87b94-5aa0-474a-916a-1d041f9becbf',
  '6595a68f-0c01-4afb-bfd9-8f85585d2a0e',
  '4145da39-2b25-4210-9357-ea79dce23f2c',
  '72dee65d-b707-43b0-8b9b-f8a105770a40',
  '2a5ec4b1-4ddf-4ee0-b869-9cf032d85316',
  '56834a60-6ecf-4398-b9cc-a62423194a9d',
  '21219dbb-7160-43f0-9c19-63a320a2358e',
  '9a940cdc-90ad-4b90-a05d-de665c5758b7',
  '71617beb-1db0-461d-b725-5d149dc0fde7',
  '8f0c0d3f-adab-469f-ba50-3fc22f9471b9',
  '0b3206fc-a4f2-44d8-bef6-8e019701df04',
  '64f99afb-0275-4d5e-a250-29fffdf95c84',
  '87a91327-7a5f-4cc0-9ce9-34d092ed48fe',
  'd437a81c-0836-4781-bcc9-45c7949827f5',
  '5cd06ec6-a858-4bc1-8abe-f87b53920523',
  'b6d02466-f892-48e2-b361-0b8bc8387303',
  '11bb9b9b-93a1-4476-9b81-7d5f1873feb1',
  'a3c208ad-faac-4041-83cd-95d609aa6087',
  '504ea2ce-1c65-4765-9ec1-7fca7737f1c5',
  '4750f64c-c54f-487a-b471-c4cecea7af80',
  'a5b4c6b1-b30b-49c1-9ed3-3435ba4d6fe7',
  '9ffbc6d7-f98f-4adf-9d90-caa816a9a766',
  'd3575d1a-c00f-4210-b0a4-8187b7c9b4eb',
  '5a713778-ef47-41d7-8f5f-395d3d950056',
'e345cdda-f653-4a7f-845f-6c7cdc21c9b9',
'6cc805ce-3754-4387-a036-f44c756a4adb',
'6d82e1af-dbeb-431c-8062-360cd92ef22e',
'30d7ea00-9889-4e4c-9417-b0efea1336fe',
'02bd3607-f942-4c1b-9f1b-c343c7d9e3d0',
'fb418c5b-9f97-4fa4-b5a2-c5d5a3952f9b',
'f28e159b-f77b-48ff-a1de-53d1754eb4b8',
'71b6f09a-6739-405c-8672-65e0f0e0deef',
'a9e7c170-a3c0-4a6f-9cf8-5a55d207ebd6',
'd5129f25-1d3d-428b-b175-9d2618bc8229',
'1afb7068-c5c0-475e-a741-1dd991366537',
'7755de38-e7a8-443a-a3d9-75288aa3d64c',
'038ee410-28bb-4c15-8a2b-2e4f80a473b9',
'6d0dae8e-cd9e-41ca-9232-b841affeb3a6',
'7acd3f70-b910-4d7f-aca9-2b5cd544c1d7',
'd0ed9a2d-3ddd-490c-9be9-a2071dfdc621',
'24b77d57-5b6b-40fd-be47-b5b3983c476a',
'c265664c-12fe-4322-9a81-93fd68f8543e',
'fd93f58a-e77f-4578-9b92-798d777d8c99',
'94c81be5-d8c2-468d-93ee-1797f5138d6a',
'2902341c-41ac-446c-abe3-53f8fe1ec501',
'b8f55886-b88b-46c5-bbaf-ac9eb0d74c80',
'997e784d-4c71-4de0-8662-adc044f50891',
'9cd403cc-01e0-4807-80cd-37ee5b90d6bb',
'80ef88f5-5736-4061-8957-fc632d79edfb',
'56d6d306-a251-4be4-8745-96ef2f730867',
'53bbe91a-5949-4481-a89f-95bb8d159ada',
'f0b657f1-c400-42c3-bcaa-82f328703485',
'7495ff94-4869-4210-bd30-e03db779ee48',
'6f5cac24-44ed-4fa1-b047-187c32b7bb8b',
'1eb0aca8-96bc-4092-b0a2-72cd7bd19a2e',
'697b27fa-5ffd-445f-854c-3e5b5e1deb6b',
'd7401d54-9fd3-436d-9895-a1ba78fe7735',
'b88bf2ae-a3db-4839-ba82-a794ca58dbb8',
'391d93fe-1039-4914-9d65-2de221b1ab18',
'0dc7df8f-6617-4e17-aedb-10f2d401a12c',
'7aba505b-1593-4945-8d69-ea500a7c461b',
'87ea807a-6d89-4ef1-a240-c308a9addc14',
'12d45fa9-330f-4661-9e25-807401f2dd8b',
'cb276609-1831-4fcb-95d1-2ccf404d0559',
'5147a3ac-f330-4b2e-a390-75f9796a12bf',
'bd80f642-7ea8-4af9-94d5-576eec989daa',
'71634cc6-80b4-4b5c-8b64-f20229557309',
'b7752ae9-e668-4e26-92c9-14eb024dad5e',
'ad507486-b715-45ae-bfb7-d7cbcb5d48b9',
'a4a8b880-a029-4ceb-97ad-1cc2999b56b5',
'ea8e11f5-fa6b-41ed-9e98-384572f5292f',
'9eda211e-f36c-41b6-b6cd-405182584976',
'715f2305-d402-444a-a4dc-a42fb46623da',
'8c8ba493-9502-44e5-92a8-9fbf4aea9a1a',
'90e0c2a8-f1e2-4fde-ab29-6b0a392139d0',
'ac140e22-05c7-4a70-bc73-24d50dddd8b5',
'c6d20333-beba-45fd-9cac-30808f01e503',
'151c9b8d-9aa4-4859-a96d-1a903fa6bb8d',
'286663b9-eae6-4c0f-ae66-e1b66a828e45',
'2c8d0e4d-d483-45c0-b281-92d14383953f',
'32c07d8f-1fe3-463a-9635-6642781aa7e0',
'aa55e24a-2403-4352-a24c-cb7aedcecb59',
'd4a5d327-f537-4941-88c0-dc1b985d6899',
'1456576b-f770-425f-8d11-9b643c8a0d39',
'138cd81d-b06c-4ada-a8cf-64aedebdad6a',
'1e3e1358-3aee-4678-b2e8-380186e35f1b',
'c6530a63-c1bc-4d27-a53f-7ac6782e1b0b',
'69baadbb-dbe6-41e5-b14f-1980064bb49b',
'f6ae62e0-c163-472c-bf2d-2d98af4c1b80',
'629c7930-bb77-4c2c-8234-d2894980f9ad',
'124c8440-3a79-47b1-8e79-e8a3c8bc0fcb',
'6cd2a3b3-3a84-4fee-a893-d33b4c3244ea',
'e821d63e-aee7-4b27-b784-7f1cdbfabfab',
'a791cba9-c4f0-477a-906d-1f5bd99f9652',
'130455d0-a33c-4448-9903-1a6825fb146e',
'6209e75b-49c2-422c-bce5-d7294c77ee8f',
'b21248c6-cf28-4e8e-8abc-64f077138a2c',
'ba86a2ff-7a2f-4a1d-97b0-f562075f1331',
'eb2d60d3-0cdb-4bf4-89d3-4ea62c24aaf3',
'9ed857dc-ed09-4ec2-bef8-e6a66af7828c',
'11e967f2-94eb-47ee-97fd-51a00a53c170',
'd8edb857-3ff2-4900-8d8a-629e3634592e',
'fd33f98c-b0e4-41c4-9535-8f102f16f48e',
'c5903901-3ad4-4902-964c-2ac9667bdce1',
'a6e977ca-1aed-45ba-84cb-8eafec68866d',
'eb857491-7933-4d69-ae20-4bbb76b74d08',
'fdc82aab-95e4-41e1-a19f-276d8e7561a7',
'7533cb8e-bd73-4a36-a853-3a15ff018ef0',
'7ca266e8-62b2-43b2-a16d-8dc9f0c2a817',
'c6e84cd7-eace-4b0a-8bb8-7efe6eca8726',
'0522527c-b0d0-4b66-8dbd-113406ae64a3',
'6d590703-6cb0-4a76-bb5e-1e4daa895844',
'c2b9317f-20f6-4369-90f0-98e966e74512',
'ff0eaac0-a215-4d98-a020-a766f0f91e10',
'cf170ba3-572c-4c14-a84d-688e753ec9ea',
'03c3f045-aa95-420d-abb5-caadd7067003',
'0a8559c7-5fce-47bf-9fd4-e47434bc454f',
'1dd1eb9e-65c7-4373-87ea-d0c4345f10f0',
'3f3c2820-1631-4e19-a145-d0b283ff5535',
'5442873c-4239-44e6-84ac-862478860319',
'5b4256bf-906c-4c91-8cb1-54cf2e3715e1',
'69d9d3f7-24bf-40c1-8e7b-6adb2d2c7872',
'6fe8b0a8-bfcb-46cf-8f03-5279851aeed4',
'7580739f-3462-458c-9750-d7158075db29',
'776ef126-afb0-4c67-ba3a-f1fb2a38a8e1',
'81b5bc2f-22af-41c1-a637-d1e04baed415',
'93f26043-37de-4772-aaed-a436db5eed92',
'9dca24ad-c713-4466-9eff-f8e6a50acf07',
'bb1d92f2-f631-4cba-9bfa-e7ca4a4fb8bc',
'c7055617-6b4d-4471-9f56-e7ca84392d24',
'cb3915a0-ec65-45a8-8c27-7b9d04926b0e',
'dff75e69-67cb-4686-b73e-f6d18cb5eaa0',
'f1762a21-50ae-402e-974b-20a4d7cd1348',
'f96dd5b6-7829-4726-b748-2b1b8b0719a3',
'fca1d92e-1d0b-490c-b350-038096eced33',


]
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
var axios = require('axios');
while (ApiLength > 0) {
console.log(fecha2.indexOf(fecha) != -1);
    // var options = {
    //   'method': 'GET',
    //   'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=2023-02-01T06:00:00.000Z&issuedAt[after]=${fecha}-01T06:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=1000&type=I`,
    //   'headers': {
    //     'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
    //   }
    // };
    
    let fecha3;
    
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=2023-02-01T05:59:59.000Z&issuedAt[after]=${fecha}-01T06:00:00.000Z&receiver.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=1000&type=I`,
      headers: { 
        'Cookie': 'connect.sid=s%3A-Kkhw7jHqbfzq40sXe33pbOWfw9LdPxt.VsEPYS4XwDWxKr6D15T7DBQETYJft4YqXKX82Yd3f7Y',
        'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
      }
    };
pagIndexCompra++

await axios(config)
.then(function (response) {
  let temp = response.data
  temp = temp['hydra:member']
  console.log("@@@@@@@@@@@");
  ApiLength = temp.length

  for (const key in temp) {
    const res = temp[key]
    //
    fecha3 = res.issuedAt.substring(0, 10)
    fecha2 = fecha3
    console.log(fecha3);
    if (canceladasCompra.indexOf(res.uuid) == -1) {
      if (res.items[0] != undefined) {
        if (res.items[0].unitCode == 'LTR'|| res.items[0].unitCode == 'STL') {
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
              const Pedimentos = res.items[0].description


              if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
                TotalMXN += parseFloat(tabla.TotalMXN);
                TotalLTS += parseFloat(tabla.Cantidad);
                jsonCompra[indexCompra] = tabla
                compra[indexCompra] = dataExcel
                indexCompra++
              }
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
              const Pedimentos = res.items[0].description


              if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
                TotalMXN += parseFloat(tabla.TotalMXN);
                TotalLTS += parseFloat(tabla.Cantidad);
                jsonCompra[indexCompra] = tabla
                compra[indexCompra] = dataExcel
                indexCompra++
              }
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
            const Pedimentos = res.items[0].description


            if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
              TotalMXN += parseFloat(tabla.TotalMXN);
              TotalLTS += parseFloat(tabla.Cantidad);
              jsonCompra[indexCompra] = tabla
              compra[indexCompra] = dataExcel
              indexCompra++
            }
          }
        }

      }
      
    }


  // console.log(tabla);
  }
})
.catch(function (error) {
  console.log(error);
});

  /*
  
  15101505 == DISEL 
  15101514 == 87 OCTANOS
  15101515 == 91 OCTANOS
  */
  //   await request(options, function (error, response) {
  //     if (error) throw new Error(error);
  //     // console.log(response.body);
  //                 // console.log(diario);      
  //     let temp = JSON.parse(response.body);
  //     temp = temp['hydra:member']
  //     console.log("@@@@@@@@@@@");
  //     ApiLength = temp.length

  //     for (const key in temp) {
  //       const res = temp[key]
  //       //
  //       fecha3 = res.issuedAt.substring(0, 10)
  //       fecha2 = fecha3
  //       console.log(fecha3);
  //       if (canceladasCompra.indexOf(res.uuid) == -1) {
  //         if (res.items[0] != undefined) {
  //           if (res.items[0].unitCode == 'LTR'|| res.items[0].unitCode == 'STL') {
  //             let RECEPCION = {
  //               "TipoComplemento": "Comercializacion",
  //               "Nacional": [{
  //                   "RfcClienteOProveedor": "PTI151101TE5",
  //                   "NombreClienteOProveedor": "PEMEX TRANSFORMACION INDUSTRIAL",
  //                   "PermisoClienteOProveedor": "H/09857/COM/2015",
  //                   "CFDIs": [{
  //                       "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
  //                       "TipoCfdi": "Ingreso",
  //                       "PrecioVentaOCompraOContrap": 0.0,
  //                       "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
  //                       "VolumenDocumentado": {
  //                           "ValorNumerico": 0.0,
  //                           "UnidadDeMedida": "UM03"
  //                       }
  //                   }]
  //               }]
  //           }
  //             if (res.currency == 'MXN') {
  //               if (res.issuer.rfc == 'PTI151101TE5') {
  //                 console.log("pemex");
  //                 // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
  //                 RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
  //                 RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
  //                 RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
  //                 RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
  //                 RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
  //                 RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
  //                 RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
  //                 RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
                 
  //               // console.log(tabla);
  //                 if (res.items[0].productIdentification == '15101514') {
  
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
                    
  //                   productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  //                 }
  //                 if (res.items[0].productIdentification == '15101515') {
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
  
  //                   productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //                 }
  //                 if (res.items[0].productIdentification == '15101505') {
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].discountAmount-res.tax+res.items[0].totalAmount)//mxn
  //                   productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //                 }
  //                 let metodoPago = ''
  //                 switch (res.paymentMethod) {
  //                   case 01:
  //                     metodoPago = 'Efectivo'
  //                     break;
  //                     case 02:
  //                       metodoPago = 'Cheque de nómina'
  //                       break;
  //                       case 03:
  //                         metodoPago = 'Transferencia electrónica'
  //                         break;
  //                         case 04:
  //                           metodoPago = 'Tarjeta de crédito'
  //                           break;
  //                           case 05:
  //                             metodoPago = 'Monedero electrónico'
  //                             break;
  //                             case 06:
  //                               metodoPago = 'Dinero digital'
  //                               break;
  //                               case 08:
  //                                 metodoPago = 'Vales de despensa'
  //                                 break;
  //                                 case 12:
  //                                   metodoPago = 'Liquidación'
  //                                   break;
  //                                   case 13:
  //                                     metodoPago = 'Pago por subrogación'
  //                                     break;
  //                                     case 14:
  //                                       metodoPago = 'Pago por consignación'
  //                                       break;
  //                                       case 15:
  //                                         metodoPago = 'Condonación'
  //                                         break;
  //                                         case 17:
  //                                           metodoPago = 'Compensación'
  //                                           break;
  //                                           case 23:
  //                                             metodoPago = 'Novacion'
  //                                             break;
  //                                             case 24:
  //                                               metodoPago = 'Confusión'
  //                                               break;
  //                                               case 25:
  //                                                 metodoPago = 'Envío de deuda'
  //                                                 break;
  //                                                 case 26:
  //                                                   metodoPago = 'Prescripción o caducidad'
  //                                                   break;
  //                                                   case 27:
  //                                                     metodoPago = 'A satisfacción del acreedor'
  //                                                     break;
  //                                                     case 28:
  //                                                       metodoPago = 'Tarjeta de débito'
  //                                                       break;
  //                                                       case 29:
  //                                                         metodoPago = 'Tarjeta de servicio'
  //                                                         break;
                      
                  
  //                   default:
  //                     metodoPago = 'Por definir'
  //                     break;
  //                 }
  //                 const dataExcel = {
  //                   "UUID":res.uuid,
  //                   "RFC Emisor":res.issuer.rfc,
  //                   "Nombre del Emisor":res.issuer.name,
  //                   "RFC Receptor":res.receiver.rfc,
  //                   "Nombre del Receptor":res.receiver.name,
  //                   "Tipo":res.type == 'I' ? 'Ingreso':'',
  //                   "Estatus":res.status,
  //                   "PAC":res.pac,
  //                   "Moneda":res.currency,
  //                   "Fecha de Certificación":res.certifiedAt.substring(0, 10),
  //                   "Método de Pago":metodoPago,
  //                   "Fecha de Emisión":res.issuedAt.substring(0, 10),
  //                   "Condiciones de pago (original)":res.paymentTermsRaw,
  //                   "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
  //                   "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
  //                   "Descripción":res.items[0].description,
  //                   "Cantidad":res.items[0].quantity.toString(),
  //                   "Clave de unidad":res.items[0].unitCode,
  //                   "Valor unitario":res.items[0].unitAmount.toString(),
  //                   "Descuento":res.discount.toString(),
  //                   "Impuesto":res.tax.toString(),
  //                   "Subtotal":res.items[0].totalAmount.toString(),
  //                   "Total":(res.items[0].discountAmount-res.tax+res.items[0].totalAmount).toString(),
  //                   "TotalMXN": (res.items[0].discountAmount-res.tax+res.items[0].totalAmount).toString()
  //                  }
  //                 const tabla = {
  //                   RFCEmisor:res.issuer.rfc,
  //                   Emisor:res.issuer.name,
  //                   RegimenFiscal:res.issuer.taxRegime,
  //                   RFCReceptor:res.receiver.rfc,
  //                   Receptor:res.receiver.name,
  //                   RegimenFiscalReceptor:res.issuer.taxRegime,
  //                   DomicilioFiscalReceptor:'11560',
  //                   UsoCFDI:res.usage,
  //                   Estatus:res.status,
  //                   FechaEmision:res.issuedAt,
  //                   FullDate:res.issuedAt.substring(0, 10),
  //                   Subtotal:res.subtotal,
  //                   Descuento:res.discount,
  //                   Impuesto:res.tax,
  //                   Total:res.total,
  //                   UUID:res.uuid,
  //                   Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
  //                   Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
  //                   Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
  //                   Descripcion:res.items[0] != undefined ? res.items[0].description : '',
  //                   Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
  //                   ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
  //                   DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
  //                   NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
  //                   ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
  //                   ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
  //                   Impuesto:res.items[0] != undefined ? res.tax : '',
  //                   Moneda:res.currency,
  //                   VersionCFDI:res.version,
  //                   Fechacompleta:res.issuedAt.substring(0, 10),
  //                   TotalMXN:(res.items[0].discountAmount-res.tax+res.items[0].totalAmount)
  //                 }
  //                 // if (fecha3!=fecha) {
  //                 //   break;
  //                 // }
  //                 const Pedimentos = res.items[0].description


  //                 if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
  //                   TotalMXN += parseFloat(tabla.TotalMXN);
  //                   TotalLTS += parseFloat(tabla.Cantidad);
  //                   jsonCompra[indexCompra] = tabla
  //                   compra[indexCompra] = dataExcel
  //                   indexCompra++
  //                 }
  //               } else {
  //                 console.log("normal");
  //                 RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
  //                 RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
  //                 RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
  //                 RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
  //                 RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
  //                 RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
  //                 RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
  //                 RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
                 
  //               // console.log(tabla);
  //                 if (res.items[0].productIdentification == '15101514') {
  
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
  //                   productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
                    
  //                   productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  //                 }
  //                 if (res.items[0].productIdentification == '15101515') {
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                   productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
  
  //                   productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //                 }
  //                 if (res.items[0].productIdentification == '15101505') {
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                   productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
  //                   productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //                 }
  //                 let metodoPago = ''
  //                 switch (res.paymentMethod) {
  //                   case 01:
  //                     metodoPago = 'Efectivo'
  //                     break;
  //                     case 02:
  //                       metodoPago = 'Cheque de nómina'
  //                       break;
  //                       case 03:
  //                         metodoPago = 'Transferencia electrónica'
  //                         break;
  //                         case 04:
  //                           metodoPago = 'Tarjeta de crédito'
  //                           break;
  //                           case 05:
  //                             metodoPago = 'Monedero electrónico'
  //                             break;
  //                             case 06:
  //                               metodoPago = 'Dinero digital'
  //                               break;
  //                               case 08:
  //                                 metodoPago = 'Vales de despensa'
  //                                 break;
  //                                 case 12:
  //                                   metodoPago = 'Liquidación'
  //                                   break;
  //                                   case 13:
  //                                     metodoPago = 'Pago por subrogación'
  //                                     break;
  //                                     case 14:
  //                                       metodoPago = 'Pago por consignación'
  //                                       break;
  //                                       case 15:
  //                                         metodoPago = 'Condonación'
  //                                         break;
  //                                         case 17:
  //                                           metodoPago = 'Compensación'
  //                                           break;
  //                                           case 23:
  //                                             metodoPago = 'Novacion'
  //                                             break;
  //                                             case 24:
  //                                               metodoPago = 'Confusión'
  //                                               break;
  //                                               case 25:
  //                                                 metodoPago = 'Envío de deuda'
  //                                                 break;
  //                                                 case 26:
  //                                                   metodoPago = 'Prescripción o caducidad'
  //                                                   break;
  //                                                   case 27:
  //                                                     metodoPago = 'A satisfacción del acreedor'
  //                                                     break;
  //                                                     case 28:
  //                                                       metodoPago = 'Tarjeta de débito'
  //                                                       break;
  //                                                       case 29:
  //                                                         metodoPago = 'Tarjeta de servicio'
  //                                                         break;
                      
                  
  //                   default:
  //                     metodoPago = 'Por definir'
  //                     break;
  //                 }
                 
  //                 const dataExcel = {
  //                   "UUID":res.uuid,
  //                   "RFC Emisor":res.issuer.rfc,
  //                   "Nombre del Emisor":res.issuer.name,
  //                   "RFC Receptor":res.receiver.rfc,
  //                   "Nombre del Receptor":res.receiver.name,
  //                   "Tipo":res.type == 'I' ? 'Ingreso':'',
  //                   "Estatus":res.status,
  //                   "PAC":res.pac,
  //                   "Moneda":res.currency,
  //                   "Fecha de Certificación":res.certifiedAt.substring(0, 10),
  //                   "Método de Pago":metodoPago,
  //                   "Fecha de Emisión":res.issuedAt.substring(0, 10),
  //                   "Condiciones de pago (original)":res.paymentTermsRaw,
  //                   "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
  //                   "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
  //                   "Descripción":res.items[0].description,
  //                   "Cantidad":res.items[0].quantity.toString(),
  //                   "Clave de unidad":res.items[0].unitCode,
  //                   "Valor unitario":res.items[0].unitAmount.toString(),
  //                   "Descuento":res.discount.toString(),
  //                   "Impuesto":res.tax.toString(),
  //                   "Subtotal":res.subtotal.toString(),
  //                   "Total":res.total.toString(),
  //                   "TotalMXN": (res.items[0].totalAmount).toString()
  //                  }
  //                 const tabla = {
  //                   RFCEmisor:res.issuer.rfc,
  //                   Emisor:res.issuer.name,
  //                   RegimenFiscal:res.issuer.taxRegime,
  //                   RFCReceptor:res.receiver.rfc,
  //                   Receptor:res.receiver.name,
  //                   RegimenFiscalReceptor:res.issuer.taxRegime,
  //                   DomicilioFiscalReceptor:'11560',
  //                   UsoCFDI:res.usage,
  //                   Estatus:res.status,
  //                   FechaEmision:res.issuedAt,
  //                   FullDate:res.issuedAt.substring(0, 10),
  //                   Subtotal:res.subtotal,
  //                   Descuento:res.discount,
  //                   Impuesto:res.tax,
  //                   Total:res.total,
  //                   UUID:res.uuid,
  //                   Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
  //                   Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
  //                   Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
  //                   Descripcion:res.items[0] != undefined ? res.items[0].description : '',
  //                   Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
  //                   ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
  //                   DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
  //                   NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
  //                   ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
  //                   ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
  //                   Impuesto:res.items[0] != undefined ? res.tax : '',
  //                   Moneda:res.currency,
  //                   VersionCFDI:res.version,
  //                   Fechacompleta:res.issuedAt.substring(0, 10),
  //                   TotalMXN:(res.items[0].totalAmount)
  //                 }
  //                 // if (fecha3!=fecha) {
  //                 //   break;
  //                 // }
  //                 const Pedimentos = res.items[0].description


  //                 if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
  //                   TotalMXN += parseFloat(tabla.TotalMXN);
  //                   TotalLTS += parseFloat(tabla.Cantidad);
  //                   jsonCompra[indexCompra] = tabla
  //                   compra[indexCompra] = dataExcel
  //                   indexCompra++
  //                 }
  //               }
  //             } else {
  //               console.log("usd");
  //               RECEPCION.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
  //               RECEPCION.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
  //               RECEPCION.Nacional[0].PermisoClienteOProveedor = res.name
  //               RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
  //               RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
  //               RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount * res.exchangeRate)
  //               RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
  //               RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
               
  //             // console.log(tabla);
  //               if (res.items[0].productIdentification == '15101514') {
  
  //                 productoGas87.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                 productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas87.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                 productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                 productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
  //                 productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas87.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn
                  
  //                 productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  //               }
  //               if (res.items[0].productIdentification == '15101515') {
  //                 productoGas91.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                 productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoGas91.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                 productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                 productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                 productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoGas91.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn
  
  //                 productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //               }
  //               if (res.items[0].productIdentification == '15101505') {
  //                 productoDisel.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
  //                 productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoDisel.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
  //                 productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
  //                 productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Recepciones.TotalDocumentos + 1
  //                 productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoDisel.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount * res.exchangeRate)//mxn
  //                 productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
  
  //               }
  //               let metodoPago = ''
  //               switch (res.paymentMethod) {
  //                 case 01:
  //                   metodoPago = 'Efectivo'
  //                   break;
  //                   case 02:
  //                     metodoPago = 'Cheque de nómina'
  //                     break;
  //                     case 03:
  //                       metodoPago = 'Transferencia electrónica'
  //                       break;
  //                       case 04:
  //                         metodoPago = 'Tarjeta de crédito'
  //                         break;
  //                         case 05:
  //                           metodoPago = 'Monedero electrónico'
  //                           break;
  //                           case 06:
  //                             metodoPago = 'Dinero digital'
  //                             break;
  //                             case 08:
  //                               metodoPago = 'Vales de despensa'
  //                               break;
  //                               case 12:
  //                                 metodoPago = 'Liquidación'
  //                                 break;
  //                                 case 13:
  //                                   metodoPago = 'Pago por subrogación'
  //                                   break;
  //                                   case 14:
  //                                     metodoPago = 'Pago por consignación'
  //                                     break;
  //                                     case 15:
  //                                       metodoPago = 'Condonación'
  //                                       break;
  //                                       case 17:
  //                                         metodoPago = 'Compensación'
  //                                         break;
  //                                         case 23:
  //                                           metodoPago = 'Novacion'
  //                                           break;
  //                                           case 24:
  //                                             metodoPago = 'Confusión'
  //                                             break;
  //                                             case 25:
  //                                               metodoPago = 'Envío de deuda'
  //                                               break;
  //                                               case 26:
  //                                                 metodoPago = 'Prescripción o caducidad'
  //                                                 break;
  //                                                 case 27:
  //                                                   metodoPago = 'A satisfacción del acreedor'
  //                                                   break;
  //                                                   case 28:
  //                                                     metodoPago = 'Tarjeta de débito'
  //                                                     break;
  //                                                     case 29:
  //                                                       metodoPago = 'Tarjeta de servicio'
  //                                                       break;
                    
                
  //                 default:
  //                   metodoPago = 'Por definir'
  //                   break;
  //               }
  //               const dataExcel = {
  //                 "UUID":res.uuid,
  //                 "RFC Emisor":res.issuer.rfc,
  //                 "Nombre del Emisor":res.issuer.name,
  //                 "RFC Receptor":res.receiver.rfc,
  //                 "Nombre del Receptor":res.receiver.name,
  //                 "Tipo":res.type == 'I' ? 'Ingreso':'',
  //                 "Estatus":res.status,
  //                 "PAC":res.pac,
  //                 "Moneda":res.currency,
  //                 "Fecha de Certificación":res.certifiedAt.substring(0, 10),
  //                 "Método de Pago":metodoPago,
  //                 "Fecha de Emisión":res.issuedAt.substring(0, 10),
  //                 "Condiciones de pago (original)":res.paymentTermsRaw,
  //                 "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
  //                 "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
  //                 "Descripción":res.items[0].description,
  //                 "Cantidad":res.items[0].quantity.toString(),
  //                 "Clave de unidad":res.items[0].unitCode,
  //                 "Valor unitario":res.items[0].unitAmount.toString(),
  //                 "Descuento":res.discount.toString(),
  //                 "Impuesto":res.tax.toString(),
  //                 "Subtotal":res.subtotal.toString(),
  //                 "Total":res.total.toString(),
  //                 "TotalMXN": (res.items[0].totalAmount * res.exchangeRate).toString()
  //                }
  //               const tabla = {
  //                 RFCEmisor:res.issuer.rfc,
  //                 Emisor:res.issuer.name,
  //                 RegimenFiscal:res.issuer.taxRegime,
  //                 RFCReceptor:res.receiver.rfc,
  //                 Receptor:res.receiver.name,
  //                 RegimenFiscalReceptor:res.issuer.taxRegime,
  //                 DomicilioFiscalReceptor:'11560',
  //                 UsoCFDI:res.usage,
  //                 Estatus:res.status,
  //                 FechaEmision:res.issuedAt,
  //                 FullDate:res.issuedAt.substring(0, 10),
  //                 Subtotal:res.subtotal,
  //                 Descuento:res.discount,
  //                 Impuesto:res.tax,
  //                 Total:res.total,
  //                 UUID:res.uuid,
  //                 Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
  //                 Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
  //                 Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
  //                 Descripcion:res.items[0] != undefined ? res.items[0].description : '',
  //                 Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
  //                 ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
  //                 DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
  //                 NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
  //                 ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
  //                 ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
  //                 Impuesto:res.items[0] != undefined ? res.tax : '',
  //                 Moneda:res.currency,
  //                 VersionCFDI:res.version,
  //                 Fechacompleta:res.issuedAt.substring(0, 10),
  //                 TotalMXN:(res.items[0].totalAmount * res.exchangeRate)
  //               }
  //               // if (fecha3!=fecha) {
  //               //   break;
  //               // }
  //               const Pedimentos = res.items[0].description


  //               if (Pedimentos.includes('Fecha de pedimento(s)') == false || Pedimentos.includes('01/2023') == true || res.issuer.rfc == 'CMM980126G35' || res.issuer.rfc == 'VMS1604291IA' ) {
  //                 TotalMXN += parseFloat(tabla.TotalMXN);
  //                 TotalLTS += parseFloat(tabla.Cantidad);
  //                 jsonCompra[indexCompra] = tabla
  //                 compra[indexCompra] = dataExcel
  //                 indexCompra++
  //               }
  //             }
  //           }
  
  //         }
          
  //       }


  //     // console.log(tabla);
  //     }

  // });
  await delay(3300);
  }
const extras = [
  'cddbca3f-a997-41d3-a71f-439a9254371e',
  '01ef542c-65d1-42fd-aeae-410374e7b0c1',
  '8245d090-c74b-4cab-aea5-9d1494572bed',
  'bec963cf-7962-48ad-b838-80c79e9cfc5d',
  '1d79e6be-cd92-422c-aa81-64c51e5a6c70',
  '6f06f288-efd8-4387-9faf-a9faf38ae562',
  'ac89186a-be73-4180-95fc-6386c07dd9b6',
  'b0046413-5681-4c0b-95d7-c06fbbb029ac',
  '209fae9f-9b17-41af-9eac-a3dafd73dfda',
  '3de1e198-a138-4ad7-890c-78d47caa4df6',
  '2c160bf4-5468-4ee1-9a1b-cac3ff2cfbae',
  '014009d0-946c-4b69-a106-a3549c077e40',
  '48997c28-f35b-4b8e-bada-70447572fa62',
  'bb21d038-4666-4dab-8f3b-86ff358021c5',
  '6d3f40f0-3ff6-46e1-bc90-00a744e2d8fd',
  '9d4ecfd7-a275-4e45-b827-7df6885dc53b',
  '5d45bd7a-76e8-49a9-bbe6-188f0a064209',
  'c46c6df0-8fd1-419c-86c9-32438f4bd71a',
  '3353594b-7342-4f25-a493-ed0107a138dd',
  '2c42546e-2572-42db-b8f9-2acb3bea3c8d',
  '4b0f1636-c6af-4ea3-8d88-77a7e210359a',
  '433c9fce-2541-4152-852b-e0ec04c7a5c8',
  'fe752510-217d-4af5-8ce0-e822ee31235a',
  'e917fbcc-64b9-4ea7-bb75-2d31474bbdef',
  '55c21954-9dd0-45b1-8045-bf168dec5d40',
  'd90a363f-072b-40bb-ba81-d4a1e28d003b',
  '12cc78c2-d022-40fe-9931-f4c12ce3e3c9',
  '3f453a62-3360-4a25-9898-6986cff111ed',
  '40c661bd-ba41-4d73-b459-574eae8c0412',
  '49499fa2-a0ee-4de3-b81f-dd3abde88f6d',
  '2931a8f8-b0a9-4e01-b195-9f0d514ebfb5',
  'f6a47824-0d8b-4b0f-8d88-c7b12fbadf94',
  'f00f4f36-6ac6-4e20-bf5a-de6c78998465',
  '9e3d8311-9b75-4029-8e8e-5f6f76f66bbe',
  '8178a3a7-b898-41c1-8d75-9f0800417854',
  'a6f7ebb6-db3b-4e1c-9e3d-aba502a26bf7',
  '19b6070b-fa39-4dff-be06-9e94da427681',
  '63eb3f14-0632-46ca-ad42-c8115e0f4124',
  '8d7d61eb-344e-4b22-aca0-43ad4ff9a3a3',
  'a865bdbb-2696-4ea4-90e0-8a0dd92b1eb3',
  '07b0eb10-7ef9-420d-8eff-7d69539135b2',
  '39d376ef-a7a1-40dd-b012-24184aa11a1d',
  '856df685-7f18-4385-b8e7-3f3d8bc46e02',
  'a099dacf-5752-4b8f-b862-b3bd6673dd82',
  
]
  extras.forEach(async element => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?uuid=${element}`,
      headers: { 
        'Cookie': 'connect.sid=s%3A-Kkhw7jHqbfzq40sXe33pbOWfw9LdPxt.VsEPYS4XwDWxKr6D15T7DBQETYJft4YqXKX82Yd3f7Y',
        'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
      }
    };
    pagIndexVenta++


await axios(config)
.then(function (response) {
  let temp = response.data
  temp = temp['hydra:member']
  console.log("@@@@@@@@@@@");
  ApiLength = temp.length

  for (const key in temp) {
    const res = temp[key]
    //
    fecha3 = res.issuedAt.substring(0, 10)
    fecha2 = fecha3
    console.log(fecha3);
    if (res.items[0] != undefined) {
      if (res.items[0].unitCode == 'LTR'|| res.items[0].unitCode == 'STL') {
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
})
.catch(function (error) {
  console.log(error);
});
});
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
// while (ApiLengthVenta > 0) {

// var options = {
//   'method': 'GET',
//   'url': `https://api.satws.com/taxpayers/GEM161104H39/invoices?issuedAt[before]=2023-02-02T06:00:00.000Z&issuedAt[after]=${fecha}-01T00:00:00.000Z&issuer.rfc=GEM161104H39&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=1000&type=I`,
//   'headers': {
//     'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
//   }
// };
// pagIndexVenta++

// let fecha5;

// await request(options, function (error, response) {
//   if (error) throw new Error(error);
//   // console.log(response.body);
//               // console.log(diario);


//   let temp = JSON.parse(response.body);
//   temp = temp['hydra:member']
//   console.log("@@@@@@@@@@@");
//   ApiLengthVenta = temp.length
//   for (const key in temp) {
//     const res = temp[key]

//     fecha5 = res.issuedAt.substring(0, 10)
//     fecha4 = fecha5
//     console.log(fecha5);

//     if (res.items[0] != undefined ) {
//       if (res.items[0].unitCode == 'LTR' || res.items[0].unitCode == 'STL') {
//         let entrega = {
//           "TipoComplemento": "Comercializacion",
//           "Nacional": [{
//               "RfcClienteOProveedor": "PTI151101TE5",
//               "NombreClienteOProveedor": "PEMEX TRANSFORMACION INDUSTRIAL",
//               "PermisoClienteOProveedor": "H/09857/COM/2015",
//               "CFDIs": [{
//                   "Cfdi": "3eece402-580f-4e3d-a973-ca47dfdb6ae0",
//                   "TipoCfdi": "Ingreso",
//                   "PrecioVentaOCompraOContrap": 0.0,
//                   "FechaYHoraTransaccion": "2022-08-22T19:27:31-06:00",
//                   "VolumenDocumentado": {
//                       "ValorNumerico": 0.0,
//                       "UnidadDeMedida": "UM03"
//                   }
//               }]
//           }]
//       }
//         if (res.currency == 'MXN') {
//             entrega.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
//             entrega.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
//             entrega.Nacional[0].PermisoClienteOProveedor = res.name
//             entrega.Nacional[0].CFDIs[0].Cfdi = res.uuid
//             entrega.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
//             entrega.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
//             entrega.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
//             entrega.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
           
//           // console.log(tabla);
//             if (res.items[0].productIdentification == '15101514') {

//               productoGas87.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
//               productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
              
//               productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
//             }
//             if (res.items[0].productIdentification == '15101515') {
//               productoGas91.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
//               productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn

//               productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

//             }
//             if (res.items[0].productIdentification == '15101505') {
//               productoDisel.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
//               productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.items[0].totalAmount)//mxn
//               productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

//             }
//             let metodoPago = ''
//             switch (res.paymentMethod) {
//               case 01:
//                 metodoPago = 'Efectivo'
//                 break;
//                 case 02:
//                   metodoPago = 'Cheque de nómina'
//                   break;
//                   case 03:
//                     metodoPago = 'Transferencia electrónica'
//                     break;
//                     case 04:
//                       metodoPago = 'Tarjeta de crédito'
//                       break;
//                       case 05:
//                         metodoPago = 'Monedero electrónico'
//                         break;
//                         case 06:
//                           metodoPago = 'Dinero digital'
//                           break;
//                           case 08:
//                             metodoPago = 'Vales de despensa'
//                             break;
//                             case 12:
//                               metodoPago = 'Liquidación'
//                               break;
//                               case 13:
//                                 metodoPago = 'Pago por subrogación'
//                                 break;
//                                 case 14:
//                                   metodoPago = 'Pago por consignación'
//                                   break;
//                                   case 15:
//                                     metodoPago = 'Condonación'
//                                     break;
//                                     case 17:
//                                       metodoPago = 'Compensación'
//                                       break;
//                                       case 23:
//                                         metodoPago = 'Novacion'
//                                         break;
//                                         case 24:
//                                           metodoPago = 'Confusión'
//                                           break;
//                                           case 25:
//                                             metodoPago = 'Envío de deuda'
//                                             break;
//                                             case 26:
//                                               metodoPago = 'Prescripción o caducidad'
//                                               break;
//                                               case 27:
//                                                 metodoPago = 'A satisfacción del acreedor'
//                                                 break;
//                                                 case 28:
//                                                   metodoPago = 'Tarjeta de débito'
//                                                   break;
//                                                   case 29:
//                                                     metodoPago = 'Tarjeta de servicio'
//                                                     break;
                
            
//               default:
//                 metodoPago = 'Por definir'
//                 break;
//             }
//             const dataExcel = {
//               "UUID":res.uuid,
//               "RFC Emisor":res.issuer.rfc,
//               "Nombre del Emisor":res.issuer.name,
//               "RFC Receptor":res.receiver.rfc,
//               "Nombre del Receptor":res.receiver.name,
//               "Tipo":res.type == 'I' ? 'Ingreso':'',
//               "Estatus":res.status,
//               "PAC":res.pac,
//               "Moneda":res.currency,
//               "Fecha de Certificación":res.certifiedAt,
//               "Método de Pago":metodoPago,
//               "Fecha de Emisión":res.issuedAt,
//               "Condiciones de pago (original)":res.paymentTermsRaw,
//               "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
//               "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
//               "Descripción":res.items[0].description,
//               "Cantidad":res.items[0].quantity.toString(),
//               "Clave de unidad":res.items[0].unitCode,
//               "Valor unitario":res.items[0].unitAmount.toString(),
//               "Descuento":res.discount.toString(),
//               "Impuesto":res.tax.toString(),
//               "Subtotal":res.subtotal.toString(),
//               "Total":res.total.toString(),
//               "TotalMXN": (res.items[0].totalAmount).toString()
//              }
//             const tabla = {
//               RFCEmisor:res.issuer.rfc,
//               Emisor:res.issuer.name,
//               RegimenFiscal:res.issuer.taxRegime,
//               RFCReceptor:res.receiver.rfc,
//               Receptor:res.receiver.name,
//               RegimenFiscalReceptor:res.issuer.taxRegime,
//               DomicilioFiscalReceptor:'11560',
//               UsoCFDI:res.usage,
//               Estatus:res.status,
//               FechaEmision:res.issuedAt,
//               FullDate:res.issuedAt.substring(0, 10),
//               Subtotal:res.subtotal,
//               Descuento:res.discount,
//               Impuesto:res.tax,
//               Total:res.total,
//               UUID:res.uuid,
//               Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
//               Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
//               Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
//               Descripcion:res.items[0] != undefined ? res.items[0].description : '',
//               Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
//               ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
//               DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
//               NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
//               ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
//               ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
//               Impuesto:res.items[0] != undefined ? res.tax : '',
//               Moneda:res.currency,
//               VersionCFDI:res.version,
//               Fechacompleta:res.issuedAt.substring(0, 10),
//               TotalMXN:(res.items[0].totalAmount)
//             }
//             // if (fecha5!=fecha) {
//             //   break;
//             // }
//             console.log(res.items[0].description);
//             const realDate = res.items[0].description.split(' ')
//             const dateTime = realDate[0];
//             const parts = dateTime.split(/[- :]/);

//             var month = parts[1];
//             var year = parts[0];

//             var currentdate = new Date(fecha+"-02");
//             var cur_month = currentdate.getMonth() + 1;
//             var cur_year = currentdate.getFullYear();
//             console.log(currentdate);
//             if (cur_month == month && year == cur_year) {
//               venta[indexVenta] = dataExcel
//               totalMXNVT += parseFloat(tabla.TotalMXN);
//               totalLTSVT += parseFloat(tabla.Cantidad);
//               jsonVenta[indexVenta] = tabla
//                indexVenta++
//             }


//         } else {
//             // RECEPCION.NumeroDeRegistro = res.NumeroDeRegistro
//             entrega.Nacional[0].RfcClienteOProveedor = res.issuer.rfc
//             entrega.Nacional[0].NombreClienteOProveedor = res.issuer.rfc
//             entrega.Nacional[0].PermisoClienteOProveedor = res.name
//             entrega.Nacional[0].CFDIs[0].Cfdi = res.uuid
//             entrega.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
//             entrega.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.total * res.exchangeRate)
//             entrega.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
//             entrega.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
           
//           // console.log(tabla);
//             if (res.items[0].productIdentification == '15101514') {

//               productoGas87.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas87.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas87.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes = productoGas87.ReporteDeVolumenMensual.Entregas.TotalDocumentosMes + 1
//               productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas87.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn
              
//               productoGas87.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)
//             }
//             if (res.items[0].productIdentification == '15101515') {
//               productoGas91.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoGas91.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoGas91.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoGas91.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
//               productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoGas91.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn

//               productoGas91.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

//             }
//             if (res.items[0].productIdentification == '15101505') {
//               productoDisel.ReporteDeVolumenMensual.Entregas.Complemento.push(entrega)
//               productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes= productoDisel.ReporteDeVolumenMensual.Entregas.TotalEntregasMes + 1
//               productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico = productoDisel.ReporteDeVolumenMensual.Entregas.SumaVolumenEntregadoMes.ValorNumerico + res.items[0].quantity//ltr
//               productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos = productoDisel.ReporteDeVolumenMensual.Entregas.TotalDocumentos + 1
//               productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes = productoDisel.ReporteDeVolumenMensual.Entregas.ImporteTotalEntregasMes +  (res.total * res.exchangeRate)//mxn
//               productoDisel.ReporteDeVolumenMensual.ControlDeExistencias.FechaYHoraEstaMedicionMes = new Date().toISOString().slice(0,-1)

//             }
//             let metodoPago = ''
//             switch (res.paymentMethod) {
//               case 01:
//                 metodoPago = 'Efectivo'
//                 break;
//                 case 02:
//                   metodoPago = 'Cheque de nómina'
//                   break;
//                   case 03:
//                     metodoPago = 'Transferencia electrónica'
//                     break;
//                     case 04:
//                       metodoPago = 'Tarjeta de crédito'
//                       break;
//                       case 05:
//                         metodoPago = 'Monedero electrónico'
//                         break;
//                         case 06:
//                           metodoPago = 'Dinero digital'
//                           break;
//                           case 08:
//                             metodoPago = 'Vales de despensa'
//                             break;
//                             case 12:
//                               metodoPago = 'Liquidación'
//                               break;
//                               case 13:
//                                 metodoPago = 'Pago por subrogación'
//                                 break;
//                                 case 14:
//                                   metodoPago = 'Pago por consignación'
//                                   break;
//                                   case 15:
//                                     metodoPago = 'Condonación'
//                                     break;
//                                     case 17:
//                                       metodoPago = 'Compensación'
//                                       break;
//                                       case 23:
//                                         metodoPago = 'Novacion'
//                                         break;
//                                         case 24:
//                                           metodoPago = 'Confusión'
//                                           break;
//                                           case 25:
//                                             metodoPago = 'Envío de deuda'
//                                             break;
//                                             case 26:
//                                               metodoPago = 'Prescripción o caducidad'
//                                               break;
//                                               case 27:
//                                                 metodoPago = 'A satisfacción del acreedor'
//                                                 break;
//                                                 case 28:
//                                                   metodoPago = 'Tarjeta de débito'
//                                                   break;
//                                                   case 29:
//                                                     metodoPago = 'Tarjeta de servicio'
//                                                     break;
                
            
//               default:
//                 metodoPago = 'Por definir'
//                 break;
//             }
//             const dataExcel = {
//               "UUID":res.uuid,
//               "RFC Emisor":res.issuer.rfc,
//               "Nombre del Emisor":res.issuer.name,
//               "RFC Receptor":res.receiver.rfc,
//               "Nombre del Receptor":res.receiver.name,
//               "Tipo":res.type == 'I' ? 'Ingreso':'',
//               "Estatus":res.status,
//               "PAC":res.pac,
//               "Moneda":res.currency,
//               "Fecha de Certificación":res.certifiedAt,
//               "Método de Pago":metodoPago,
//               "Fecha de Emisión":res.issuedAt,
//               "Condiciones de pago (original)":res.paymentTermsRaw,
//               "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
//               "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
//               "Descripción":res.items[0].description,
//               "Cantidad":res.items[0].quantity.toString(),
//               "Clave de unidad":res.items[0].unitCode,
//               "Valor unitario":res.items[0].unitAmount.toString(),
//               "Descuento":res.discount.toString(),
//               "Impuesto":res.tax.toString(),
//               "Subtotal":res.subtotal.toString(),
//               "Total":res.total.toString(),
//               "TotalMXN": (res.total * res.exchangeRate).toString()
//              }
//             const tabla = {
//               RFCEmisor:res.issuer.rfc,
//               Emisor:res.issuer.name,
//               RegimenFiscal:res.issuer.taxRegime,
//               RFCReceptor:res.receiver.rfc,
//               Receptor:res.receiver.name,
//               RegimenFiscalReceptor:res.issuer.taxRegime,
//               DomicilioFiscalReceptor:'11560',
//               UsoCFDI:res.usage,
//               Estatus:res.status,
//               FechaEmision:res.issuedAt,
//               FullDate:res.issuedAt.substring(0, 10),
//               Subtotal:res.subtotal,
//               Descuento:res.discount,
//               Impuesto:res.tax,
//               Total:res.total,
//               UUID:res.uuid,
//               Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
//               Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
//               Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
//               Descripcion:res.items[0] != undefined ? res.items[0].description : '',
//               Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
//               ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
//               DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
//               NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
//               ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
//               ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
//               Impuesto:res.items[0] != undefined ? res.tax : '',
//               Moneda:res.currency,
//               VersionCFDI:res.version,
//               Fechacompleta:res.issuedAt.substring(0, 10),
//               TotalMXN:(res.total * res.exchangeRate)
//             }
//             // if (fecha5!=fecha) {
//             //   break;
//             // }
//             console.log(res.items[0].description);
//             const realDate = res.items[0].description.split(' ')
//             const dateTime = realDate[0];
//             const parts = dateTime.split(/[- :]/);

//             var month = parts[1];
//             var year = parts[0];

//             var currentdate = new Date(fecha+"-02");
//             var cur_month = currentdate.getMonth() + 1;
//             var cur_year = currentdate.getFullYear();

//             console.log(currentdate);
//             if (cur_month == month && year == cur_year ) {
//               venta[indexVenta] = dataExcel
//               totalMXNVT += parseFloat(tabla.TotalMXN);
//               totalLTSVT += parseFloat(tabla.Cantidad);
//               jsonVenta[indexVenta] = tabla
//                indexVenta++
//             }

//         }
//       }

//     }


//   // console.log(tabla);
//   }

// });
// await delay(3300);

// }
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
router.post('/mensual-natgasModificado/:fecha', async (req, res) => {
  try {
    let productoEstructura = require(path.join(__dirname, '../public/json/NatGas/Mensual/productoEstructura.json'))

   console.log("mess");
   const xl = require('excel4node');
 console.log("Empieza");
 const wb = new xl.Workbook();
 const ws = wb.addWorksheet('Compra');
 const ws2 = wb.addWorksheet('Venta');

 const headingColumnNames = [ 
  'EstadoSAT',	
 'UUID',	
 'Serie',	//reference
 'Folio',	
 'Fecha',	
 'NombreEmisor',	
 'RfcEmisor',	
 'NombreReceptor',	
 'RfcReceptor',	
 'ClaveProdServ',	
 'NoIdentificacion',	
 'EDS',	
 'Descripcion',	
 'Unidad',	
 'ClaveUnidad',	
 'Cantidad',	
 'PrecioUnitario',	
 'Importe',	
 'Descuento',	
 'TipoCambio',
 'Moneda',	
 'Version',	
 'TipoCFDI'
]

//  const headingColumnNames = [
//    "UUID",
//    "RFC Emisor",
//    "Nombre del Emisor",
//    "RFC Receptor",
//    "Nombre del Receptor",
//    "Tipo",
//    "Estatus",
//    "PAC",
//    "Moneda",
//    "Fecha de Certificación",
//    "Método de Pago",
//    "Fecha de Emisión",
//    "Condiciones de pago (original)",
//    "No. Identificación",
//    "Clave del producto y/o servicio",
//    "Descripción",
//    "Cantidad",
//    "Clave de unidad",
//    "Valor unitario",
//    "Descuento",
//    "Impuesto",
//    "Subtotal",
//    "Total",
//    "TotalMXN"
//  ]//Write Column Title in Excel file
 
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
 console.log(ApiLength);
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
//  while (ApiLength > 0) {
//    console.log('asdas');
//      var options = {
//        'method': 'GET',
//        'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=2022-12-31T23:59:59.000Z&issuedAt[after]=2022-12-01T06:00:00.000Z&receiver.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexCompra}&itemsPerPage=100`,
//        'headers': {
//          'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
//        }
//      };
//      pagIndexCompra++
 
//      let fecha3;
 
//    /*
   
//    15101505 == DISEL 
//    15101514 == 87 OCTANOS
//    15101515 == 91 OCTANOS
//    */
//      await request(options, function (error, response) {
//        if (error) throw new Error(error);
//        // console.log(response.body);
//                    // console.log(diario);
 
          
//        let temp = JSON.parse(response.body);
//        temp = temp['hydra:member']
//        console.log("@@@@@@@@@@@");
//        ApiLength = temp.length
//        for (const key in temp) {
//          const res = temp[key]
//          //
//          fecha3 = res.issuedAt.substring(0, 10)
//          fecha2 = fecha3
//          console.log(fecha3);
//         if (res.items[0] != undefined ) {
//           if (res.items[0].unitCode === 'GV') {
//             let RECEPCION = {
//               "TipoComplemento": "Expendio",
//               "Nacional": [{
//                   "RfcClienteOProveedor": res.receiver.rfc,
//                   "NombreClienteOProveedor": res.receiver.name,
//                   "PermisoClienteOProveedor": "H/09857/COM/2015",
//                   "CFDIs": [{
//                       "Cfdi": res.uuid,
//                       "TipoCfdi": "Egreso",
//                       "PrecioVentaOCompraOContrap":(res.items[0].totalAmount),
//                       "FechaYHoraTransaccion": res.issuedAt,
//                       "VolumenDocumentado": {
//                           "ValorNumerico": res.items[0].quantity,
//                           "UnidadDeMedida": "UM04"
//                       }
//                   }]
//               }]
//           }
//             console.log("normal");
//            //  RECEPCION.Nacional[0].RfcClienteOProveedor = res.receiver.rfc
//            //  RECEPCION.Nacional[0].NombreClienteOProveedor = res.receiver.name
//            //  RECEPCION.Nacional[0].CFDIs[0].Cfdi = res.uuid
//            //  RECEPCION.Nacional[0].CFDIs[0].TipoCfdi = 'Ingreso'
//            //  RECEPCION.Nacional[0].CFDIs[0].PrecioVentaOCompraOContrap = (res.items[0].totalAmount)
//            //  RECEPCION.Nacional[0].CFDIs[0].FechaYHoraTransaccion = res.issuedAt
//            //  RECEPCION.Nacional[0].CFDIs[0].VolumenDocumentado.ValorNumerico = res.items[0].quantity
        
//             productoEstructura.ReporteDeVolumenMensual.Recepciones.Complemento.push(RECEPCION)
//             productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes= productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalRecepcionesMes + 1
//             productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico = productoEstructura.ReporteDeVolumenMensual.Recepciones.SumaVolumenRecepcionMes.ValorNumerico + res.items[0].quantity//ltr
//             productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes = productoEstructura.ReporteDeVolumenMensual.Recepciones.TotalDocumentosMes + 1
//             productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual = productoEstructura.ReporteDeVolumenMensual.Recepciones.ImporteTotalRecepcionesMensual +  (res.items[0].totalAmount)//mxn
            
//             let metodoPago = ''
//             switch (res.paymentMethod) {
//               case 01:
//                 metodoPago = 'Efectivo'
//                 break;
//                 case 02:
//                   metodoPago = 'Cheque de nómina'
//                   break;
//                   case 03:
//                     metodoPago = 'Transferencia electrónica'
//                     break;
//                     case 04:
//                       metodoPago = 'Tarjeta de crédito'
//                       break;
//                       case 05:
//                         metodoPago = 'Monedero electrónico'
//                         break;
//                         case 06:
//                           metodoPago = 'Dinero digital'
//                           break;
//                           case 08:
//                             metodoPago = 'Vales de despensa'
//                             break;
//                             case 12:
//                               metodoPago = 'Liquidación'
//                               break;
//                               case 13:
//                                 metodoPago = 'Pago por subrogación'
//                                 break;
//                                 case 14:
//                                   metodoPago = 'Pago por consignación'
//                                   break;
//                                   case 15:
//                                     metodoPago = 'Condonación'
//                                     break;
//                                     case 17:
//                                       metodoPago = 'Compensación'
//                                       break;
//                                       case 23:
//                                         metodoPago = 'Novacion'
//                                         break;
//                                         case 24:
//                                           metodoPago = 'Confusión'
//                                           break;
//                                           case 25:
//                                             metodoPago = 'Envío de deuda'
//                                             break;
//                                             case 26:
//                                               metodoPago = 'Prescripción o caducidad'
//                                               break;
//                                               case 27:
//                                                 metodoPago = 'A satisfacción del acreedor'
//                                                 break;
//                                                 case 28:
//                                                   metodoPago = 'Tarjeta de débito'
//                                                   break;
//                                                   case 29:
//                                                     metodoPago = 'Tarjeta de servicio'
//                                                     break;
                
            
//               default:
//                 metodoPago = 'Por definir'
//                 break;
//             }
           
//             const dataExcel = {
//               "UUID":res.uuid,
//               "RFC Emisor":res.issuer.rfc,
//               "Nombre del Emisor":res.issuer.name,
//               "RFC Receptor":res.receiver.rfc,
//               "Nombre del Receptor":res.receiver.name,
//               "Tipo":res.type == 'I' ? 'Ingreso':'',
//               "Estatus":res.status,
//               "PAC":res.pac,
//               "Moneda":res.currency,
//               "Fecha de Certificación":res.certifiedAt.substring(0, 10),
//               "Método de Pago":metodoPago,
//               "Fecha de Emisión":res.issuedAt.substring(0, 10),
//               "Condiciones de pago (original)":res.paymentTermsRaw,
//               "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
//               "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
//               "Descripción":res.items[0].description,
//               "Cantidad":res.items[0].quantity.toString(),
//               "Clave de unidad":res.items[0].unitCode,
//               "Valor unitario":res.items[0].unitAmount.toString(),
//               "Descuento":res.discount.toString(),
//               "Impuesto":res.tax,
//               "Subtotal":res.subtotal.toString(),
//               "Total":res.total.toString(),
//               "TotalMXN": (res.items[0].totalAmount).toString()
//             }
//             const tabla = {
//               RFCEmisor:res.issuer.rfc,
//               Emisor:res.issuer.name,
//               RegimenFiscal:res.issuer.taxRegime,
//               RFCReceptor:res.receiver.rfc,
//               Receptor:res.receiver.name,
//               RegimenFiscalReceptor:res.issuer.taxRegime,
//               DomicilioFiscalReceptor:'11560',
//               UsoCFDI:res.usage,
//               Estatus:res.status,
//               FechaEmision:res.issuedAt,
//               FullDate:res.issuedAt.substring(0, 10),
//               Subtotal:res.subtotal,
//               Descuento:res.discount,
//               Impuesto:res.tax,
//               Total:res.total,
//               UUID:res.uuid,
//               Tipocomprobante:(res.type == 'I') ? 'Ingreso' : 'Otro',
//               Unidad:res.items[0] != undefined ? res.items[0].unitCode : 'LTR',
//               Cantidad:res.items[0] != undefined ? res.items[0].quantity : '0.00',
//               Descripcion:res.items[0] != undefined ? res.items[0].description : '',
//               Valorunitario:res.items[0] != undefined ? res.items[0].unitAmount : '',
//               ImporteConcepto:res.items[0] != undefined ? res.items[0].totalAmount : '',
//               DescuentoConcepto:res.items[0] != undefined ? res.items[0].discountAmount : '',
//               NoIdentificacion:res.items[0] != undefined ? res.items[0].identificationNumber : '',
//               ClaveSAT:res.items[0] != undefined ? res.items[0].productIdentification : '',
//               // ImporteImpuesto:res.items[0] != undefined ? res.tax : '',
//               // Impuesto:res.items[0] != undefined ? res.tax : '',
            
//               Moneda:res.currency,
//               VersionCFDI:res.version,
//               Fechacompleta:res.issuedAt.substring(0, 10),
//               TotalMXN:(res.items[0].totalAmount)
//             }
//             // if (fecha3!=fecha) {
//             //   break;
//             // }
//              TotalMXN += parseFloat(tabla.TotalMXN);
        
//              TotalLTS += parseFloat(tabla.Cantidad);
//              jsonCompra[indexCompra] = tabla
//              compra[indexCompra] = dataExcel
//              indexCompra++
//           }
         
         

//        }
 
//        // console.log(tabla);
//        }
 
//    });
//    await delay(3300);
//    }
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
try {
  while (ApiLengthVenta > 0) {
    var options = {
      'method': 'GET',
      'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=2023-01-01T06:00:00.000Z&issuedAt[after]=2022-12-01T06:00:00.000Z&issuer.rfc=NQU120510QZ7&status=VIGENTE&page=${pagIndexVenta}&itemsPerPage=100&`,
      'headers': {
        'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
      }
    };
    // var options = {
    //   'method': 'GET',
    //   'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?issuedAt[before]=2022-12-31T23:59:59.000Z&issuedAt[after]=2022-12-01T06:00:00.000Z&receiver.rfc=TCA980629FC6`,
    //   'headers': {
    //     'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
    //   }
    // };
    // TCA980629FC6
    pagIndexVenta++
    // console.log(options.url);
    let fecha5;
    
    await request(options, function (error, response) {
      if (error) {
        res.send(response)
      }
      if (error) throw new Error(error);
      console.log(options);
      let temp = JSON.parse(response.body);
      temp = temp['hydra:member']
      console.log("@@@@@@@@@@@");
      ApiLengthVenta = temp.length
    //  ApiLengthVenta = 0
      for (const key in temp) {
        const res = temp[key]
    
        fecha5 = res.issuedAt.substring(0, 10)
        fecha4 = fecha5
        if (nov.indexOf(res.uuid) == -1) {
          if (res.items[0] != undefined ) {
            console.log(res.items.length, '    <======================');
        if (res.items.length<2) {
         const identificationNumber = res.items[0].identificationNumber
         if (identificationNumber !== null) {
           try {
             if (identificationNumber.includes('G/18923/EXP/ES/FE/2016') == true && res.items[0].productIdentification == '15111512') {
              console.log(res.receiver.rfc);
               const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.receiver.rfc)
               console.log(alredyinJson);
               console.log('^^^^^^^^^^^^^');
                 if (alredyinJson == false) {
                  console.log('no exite');
                   let entrega = {
                     "NombreClienteOProveedor": res.receiver.name,
                     "RfcClienteOProveedor": res.receiver.rfc,
                       "CFDIs": [{
                           "Cfdi": res.uuid,
                           "TipoCfdi": "Ingreso",
                           "PrecioCompra": res.items[0].unitAmount,
                           "PrecioDeVentaAlPublico": res.items[0].unitAmount,
                           "PrecioVentaOCompraOContrap": (res.items[0].totalAmount),
                           "PrecioVenta": res.items[0].totalAmount,
                           "FechaYHoraTransaccion": res.issuedAt,
                           "VolumenDocumentado": {
                               "ValorNumerico": res.items[0].quantity,
                               "UnidadDeMedida": "UM04"
                           }
                       }]
               }
                   // entrega.RfcClienteOProveedor = 
                   // entrega.NombreClienteOProveedor = 
                   // entrega.CFDIs[0].Cfdi = 
                   // entrega.CFDIs[0].TipoCfdi = 'Ingreso'
                   // entrega.CFDIs[0].PrecioVentaOCompraOContrap = 
                   // entrega.CFDIs[0].FechaYHoraTransaccion = 
                   // entrega.CFDIs[0].VolumenDocumentado.ValorNumerico = 
                  
                     productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entrega)
                 } else {
                  console.log('si existe');
                   let entrega = {
                           "Cfdi": res.uuid,
                           "TipoCfdi": "Ingreso",
                           "PrecioCompra": res.items[0].unitAmount,
                           "PrecioDeVentaAlPublico": res.items[0].unitAmount,
                           "PrecioVentaOCompraOContrap": (res.items[0].totalAmount),
                           "PrecioVenta": res.items[0].totalAmount,
                           "FechaYHoraTransaccion": res.issuedAt,
                           "VolumenDocumentado": {
                               "ValorNumerico": res.items[0].quantity,
                               "UnidadDeMedida": "UM04"
                           }
                       }
                   productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
                     console.log(element.RfcClienteOProveedor,'-------------------------',res.receiver.rfc, res.uuid);
                     console.log(element.RfcClienteOProveedor  == res.receiver.rfc);
                     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                     if (element.RfcClienteOProveedor  == res.receiver.rfc) {
                       element.CFDIs.push(entrega)
                     }
                   });
                 }
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
                  'EstadoSAT': res.status,	
                  'UUID': res.uuid,	
                  'Serie': res.reference,	//reference
                  'Folio': res.internalIdentifier,	
                  'Fecha': res.issuedAt,	
                  'NombreEmisor': res.issuer.name,	
                  'RfcEmisor': res.issuer.rfc,	
                  'NombreReceptor': res.receiver.name,	
                  'RfcReceptor': res.receiver.rfc,	
                  'ClaveProdServ': res.items[0].productIdentification,	
                  'NoIdentificacion': res.items[0].identificationNumber,	
                  'EDS': 'PRZ',	
                  'Descripcion': res.items[0].description,	
                  'Unidad': res.items[0].unitAmount,	
                  'ClaveUnidad': res.items[0].unitCode,	
                  'Cantidad': res.items[0].quantity,	
                  'PrecioUnitario': res.items[0].unitAmount,	
                  'Importe': res.items[0].quantity * res.items[0].unitAmount,	
                  'Descuento': res.items[0].discountAmount,	
                  'TipoCambio': 1,
                  'Moneda': res.currency,	
                  'Version': res.version,	
                  'TipoCFDI':res.type == 'I' ? 'Ingreso':''
                 }
                //  const dataExcel = {
                //    "UUID":res.uuid,
                //    "RFC Emisor":res.issuer.rfc,
                //    "Nombre del Emisor":res.issuer.name,
                //    "RFC Receptor":res.receiver.rfc,
                //    "Nombre del Receptor":res.receiver.name,
                //    "Tipo":res.type == 'I' ? 'Ingreso':'',
                //    "Estatus":res.status,
                //    "PAC":res.pac,
                //    "Moneda":res.currency,
                //    "Fecha de Certificación":res.certifiedAt,
                //    "Método de Pago":metodoPago,
                //    "Fecha de Emisión":res.issuedAt,
                //    "Condiciones de pago (original)":res.paymentTermsRaw,
                //    "No. Identificación":res.items[0].identificationNumber != null ? res.items[0].identificationNumber.toString() : '',
                //    "Clave del producto y/o servicio":res.items[0].productIdentification.toString(),
                //    "Descripción":res.items[0].description,
                //    "Cantidad":res.items[0].quantity.toString(),
                //    "Clave de unidad":res.items[0].unitCode,
                //    "Valor unitario":res.items[0].unitAmount.toString(),
                //    "Descuento":res.discount.toString(),
                //    "Impuesto":'',
                //    "Subtotal":res.subtotal.toString(),
                //    "Total":res.total.toString(),
                //    "TotalMXN": (res.items[0].totalAmount).toString()
                //   }
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
               venta[indexVenta] = dataExcel
               totalMXNVT += parseFloat(tabla.TotalMXN);
               totalLTSVT += parseFloat(tabla.Cantidad);
               jsonVenta[indexVenta] = tabla
               indexVenta++
               
              }
           } catch (error) {
             console.log(error);
           }
     
     
         }
     } else {
       console.log(res.receiver.rfc);
       let entregaNoGeneral = {
      
         "NombreClienteOProveedor": res.receiver.name,
         "RfcClienteOProveedor": res.receiver.rfc,
           "CFDIs": []
     
         }
       let noEmpty = 0
       let ifExist = 0
           for (const key in res.items) {
     
     
               const identificationNumber = res.items[key].identificationNumber
               if (identificationNumber != null) {
                 try {
                   if (identificationNumber.includes('G/18923/EXP/ES/FE/2016') == true && res.items[0].productIdentification == '15111512') {
                     noEmpty = 1
                     let entregaCFDINoGeneral = {
                       "Cfdi": res.uuid,
                       "TipoCfdi": "Ingreso",
                       "PrecioCompra": res.items[key].unitAmount,
                       "PrecioDeVentaAlPublico": res.items[key].unitAmount,
                       "PrecioVenta": res.items[key].totalAmount,
                       "PrecioVentaOCompraOContrap": (res.items[key].totalAmount),
                       "FechaYHoraTransaccion": res.issuedAt,
                       "VolumenDocumentado": {
                           "ValorNumerico": res.items[key].quantity,
                           "UnidadDeMedida": "UM04"
                       }
                     }
                     // entregaCFDINoGeneral.Cfdi = res.uuid
                     // entregaCFDINoGeneral.TipoCfdi = 'Ingreso'
                     // entregaCFDINoGeneral.PrecioVentaOCompraOContrap = 
                 // entregaCFDINoGeneral.FechaYHoraTransaccion = 
                     // entregaCFDINoGeneral.VolumenDocumentado.ValorNumerico = 
                     const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.receiver.rfc)
                     console.log(alredyinJson);
                     if (alredyinJson == true) {
                       ifExist =1
                     }
                     entregaNoGeneral.CFDIs.push(entregaCFDINoGeneral)
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
                        'EstadoSAT': res.status,	
                        'UUID': res.uuid,	
                        'Serie': res.reference,	//reference
                        'Folio': res.internalIdentifier,	
                        'Fecha': res.issuedAt,	
                        'NombreEmisor': res.issuer.name,	
                        'RfcEmisor': res.issuer.rfc,	
                        'NombreReceptor': res.receiver.name,	
                        'RfcReceptor': res.receiver.rfc,	
                        'ClaveProdServ': res.items[key].productIdentification,	
                        'NoIdentificacion': res.items[key].identificationNumber,	
                        'EDS': 'PRZ',	
                        'Descripcion': res.items[key].description,	
                        'Unidad': res.items[key].unitAmount,	
                        'ClaveUnidad': res.items[key].unitCode,	
                        'Cantidad': res.items[key].quantity,	
                        'PrecioUnitario': res.items[key].unitAmount,	
                        'Importe': res.items[key].quantity * res.items[key].unitAmount,	
                        'Descuento': res.items[key].discountAmount,	
                        'TipoCambio': 1,
                        'Moneda': res.currency,	
                        'Version': res.version,	
                        'TipoCFDI':res.type == 'I' ? 'Ingreso':''
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
                         Unidad:res.items[key] != undefined ? res.items[key].unitCode : 'LTR',
                         Cantidad:res.items[key] != undefined ? res.items[key].quantity : '0.00',
                         Descripcion:res.items[key] != undefined ? res.items[key].description : '',
                         Valorunitario:res.items[key] != undefined ? res.items[key].unitAmount : '',
                         ImporteConcepto:res.items[key] != undefined ? res.items[key].totalAmount : '',
                         DescuentoConcepto:res.items[key] != undefined ? res.items[key].discountAmount : '',
                         NoIdentificacion:res.items[key] != undefined ? res.items[key].identificationNumber : '',
                         ClaveSAT:res.items[key] != undefined ? res.items[key].productIdentification : '',
                         // ImporteImpuesto:res.items[key] != undefined ? res.tax : '',
                         // Impuesto:res.items[key] != undefined ? res.tax : '',
                       
                         Moneda:res.currency,
                         VersionCFDI:res.version,
                         Fechacompleta:res.issuedAt.substring(0, 10),
                         TotalMXN:(res.items[key].totalAmount)
                       }
                     venta[indexVenta] = dataExcel
                     totalMXNVT += parseFloat(tabla.TotalMXN);
                     totalLTSVT += parseFloat(tabla.Cantidad);
                     jsonVenta[indexVenta] = tabla
                     indexVenta++
                     
                    }
                 } catch (error) {
                   console.log(error);
                 }
                 
               }
           }
           if (noEmpty != 0) {
            console.log(ifExist, '<<<<<<<<<<<<<<<<');
             if (ifExist == 1) {
               console.log('ya estas');
               productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
                 console.log(element.RfcClienteOProveedor );
                 if (element.RfcClienteOProveedor  == res.receiver.rfc) {
                   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                   entregaNoGeneral.CFDIs.forEach(element2 => {
                     element.CFDIs.push(element2)
                   });
                 }
               });
             }else{
     
               productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entregaNoGeneral)
             }
           }
     }
          }
        }


      // console.log(tabla);
      }
    
    });
    await delay(4300);
    
    }
} catch (error) {
  console.log(error);
}

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
'2432B44D-98F7-11ED-BD2D-E182C0929791',

]

dic.forEach(async element => {
  var options = {
    'method': 'GET',
    'url': `https://api.satws.com/taxpayers/NQU120510QZ7/invoices?uuid=${element}&itemsPerPage=100&`,
    'headers': {
      'X-API-Key': '446771abe7ccc796716a7b2f5f5472eb'
    }
  };
  pagIndexVenta++
  console.log(options.url);
  let fecha5;
  
  await request(options, function (error, response) {
    if (error) throw new Error(error);
    let temp = JSON.parse(response.body);
    temp = temp['hydra:member']
    console.log("@@@@@@@@@@@");
    ApiLengthVenta = temp.length
  //  ApiLengthVenta = 0
    for (const key in temp) {
      const res = temp[key]
  
      fecha5 = res.issuedAt.substring(0, 10)
      fecha4 = fecha5
  
      if (res.items[0] != undefined ) {
        console.log(res.items.length, '    <======================');
    if (res.items.length<2) {
     const identificationNumber = res.items[0].identificationNumber
     if (identificationNumber !== null) {
       try {
         if (identificationNumber.includes('G/18923/EXP/ES/FE/2016') == true && res.items[0].productIdentification == '15111512') {
          console.log(res.receiver.rfc);
           const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.receiver.rfc)
           console.log(alredyinJson);
           console.log('^^^^^^^^^^^^^');
             if (alredyinJson == false) {
              console.log('no exite');
               let entrega = {
                 "NombreClienteOProveedor": res.receiver.name,
                 "RfcClienteOProveedor": res.receiver.rfc,
                   "CFDIs": [{
                       "Cfdi": res.uuid,
                       "TipoCfdi": "Ingreso",
                       "PrecioCompra": res.items[0].unitAmount,
                       "PrecioDeVentaAlPublico": res.items[0].unitAmount,
                       "PrecioVentaOCompraOContrap": (res.items[0].totalAmount),
                       "PrecioVenta": res.items[0].totalAmount,
                       "FechaYHoraTransaccion": res.issuedAt,
                       "VolumenDocumentado": {
                           "ValorNumerico": res.items[0].quantity,
                           "UnidadDeMedida": "UM04"
                       }
                   }]
           }
               // entrega.RfcClienteOProveedor = 
               // entrega.NombreClienteOProveedor = 
               // entrega.CFDIs[0].Cfdi = 
               // entrega.CFDIs[0].TipoCfdi = 'Ingreso'
               // entrega.CFDIs[0].PrecioVentaOCompraOContrap = 
               // entrega.CFDIs[0].FechaYHoraTransaccion = 
               // entrega.CFDIs[0].VolumenDocumentado.ValorNumerico = 
              
                 productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entrega)
             } else {
              console.log('si existe');
               let entrega = {
                       "Cfdi": res.uuid,
                       "TipoCfdi": "Ingreso",
                       "PrecioCompra": res.items[0].unitAmount,
                       "PrecioDeVentaAlPublico": res.items[0].unitAmount,
                       "PrecioVentaOCompraOContrap": (res.items[0].totalAmount),
                       "PrecioVenta": res.items[0].totalAmount,
                       "FechaYHoraTransaccion": res.issuedAt,
                       "VolumenDocumentado": {
                           "ValorNumerico": res.items[0].quantity,
                           "UnidadDeMedida": "UM04"
                       }
                   }
               productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
                 console.log(element.RfcClienteOProveedor,'-------------------------',res.receiver.rfc, res.uuid);
                 console.log(element.RfcClienteOProveedor  == res.receiver.rfc);
                 console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                 if (element.RfcClienteOProveedor  == res.receiver.rfc) {
                   element.CFDIs.push(entrega)
                 }
               });
             }
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
              'EstadoSAT': res.status,	
              'UUID': res.uuid,	
              'Serie': res.reference,	//reference
              'Folio': res.internalIdentifier,	
              'Fecha': res.issuedAt,	
              'NombreEmisor': res.issuer.name,	
              'RfcEmisor': res.issuer.rfc,	
              'NombreReceptor': res.receiver.name,	
              'RfcReceptor': res.receiver.rfc,	
              'ClaveProdServ': res.items[0].productIdentification,	
              'NoIdentificacion': res.items[0].identificationNumber,	
              'EDS': 'PRZ',	
              'Descripcion': res.items[0].description,	
              'Unidad': res.items[0].unitAmount,	
              'ClaveUnidad': res.items[0].unitCode,	
              'Cantidad': res.items[0].quantity,	
              'PrecioUnitario': res.items[0].unitAmount,	
              'Importe': res.items[0].quantity * res.items[0].unitAmount,	
              'Descuento': res.items[0].discountAmount,	
              'TipoCambio': 1,
              'Moneda': res.currency,	
              'Version': res.version,	
              'TipoCFDI':res.type == 'I' ? 'Ingreso':''
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
           venta[indexVenta] = dataExcel
           totalMXNVT += parseFloat(tabla.TotalMXN);
           totalLTSVT += parseFloat(tabla.Cantidad);
           jsonVenta[indexVenta] = tabla
           indexVenta++
           
          }
       } catch (error) {
         console.log(error);
       }
 
 
     }
 } else {
   console.log(res.receiver.rfc);
   let entregaNoGeneral = {
  
     "NombreClienteOProveedor": res.receiver.name,
     "RfcClienteOProveedor": res.receiver.rfc,
       "CFDIs": []
 
     }
   let noEmpty = 0
   let ifExist = 0
       for (const key in res.items) {
 
 
           const identificationNumber = res.items[key].identificationNumber
           if (identificationNumber != null) {
             try {
               if (identificationNumber.includes('G/18923/EXP/ES/FE/2016') == true && res.items[0].productIdentification == '15111512') {
                 noEmpty = 1
                 let entregaCFDINoGeneral = {
                   "Cfdi": res.uuid,
                   "TipoCfdi": "Ingreso",
                   "PrecioCompra": res.items[key].unitAmount,
                   "PrecioDeVentaAlPublico": res.items[key].unitAmount,
                   "PrecioVenta": res.items[key].totalAmount,
                   "PrecioVentaOCompraOContrap": (res.items[key].totalAmount),
                   "FechaYHoraTransaccion": res.issuedAt,
                   "VolumenDocumentado": {
                       "ValorNumerico": res.items[key].quantity,
                       "UnidadDeMedida": "UM04"
                   }
                 }
                 // entregaCFDINoGeneral.Cfdi = res.uuid
                 // entregaCFDINoGeneral.TipoCfdi = 'Ingreso'
                 // entregaCFDINoGeneral.PrecioVentaOCompraOContrap = 
                 // entregaCFDINoGeneral.FechaYHoraTransaccion = 
                 // entregaCFDINoGeneral.VolumenDocumentado.ValorNumerico = 
                 const alredyinJson = productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.some(element => element == res.receiver.rfc)
                 console.log(alredyinJson);
                 if (alredyinJson == true) {
                   ifExist =1
                 }
                 entregaNoGeneral.CFDIs.push(entregaCFDINoGeneral)
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
                    'EstadoSAT': res.status,	
                    'UUID': res.uuid,	
                    'Serie': res.reference,	//reference
                    'Folio': res.internalIdentifier,	
                    'Fecha': res.issuedAt,	
                    'NombreEmisor': res.issuer.name,	
                    'RfcEmisor': res.issuer.rfc,	
                    'NombreReceptor': res.receiver.name,	
                    'RfcReceptor': res.receiver.rfc,	
                    'ClaveProdServ': res.items[key].productIdentification,	
                    'NoIdentificacion': res.items[key].identificationNumber,	
                    'EDS': 'PRZ',	
                    'Descripcion': res.items[key].description,	
                    'Unidad': res.items[key].unitAmount,	
                    'ClaveUnidad': res.items[key].unitCode,	
                    'Cantidad': res.items[key].quantity,	
                    'PrecioUnitario': res.items[key].unitAmount,	
                    'Importe': res.items[key].quantity * res.items[key].unitAmount,	
                    'Descuento': res.items[key].discountAmount,	
                    'TipoCambio': 1,
                    'Moneda': res.currency,	
                    'Version': res.version,	
                    'TipoCFDI':res.type == 'I' ? 'Ingreso':''
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
                     Unidad:res.items[key] != undefined ? res.items[key].unitCode : 'LTR',
                     Cantidad:res.items[key] != undefined ? res.items[key].quantity : '0.00',
                     Descripcion:res.items[key] != undefined ? res.items[key].description : '',
                     Valorunitario:res.items[key] != undefined ? res.items[key].unitAmount : '',
                     ImporteConcepto:res.items[key] != undefined ? res.items[key].totalAmount : '',
                     DescuentoConcepto:res.items[key] != undefined ? res.items[key].discountAmount : '',
                     NoIdentificacion:res.items[key] != undefined ? res.items[key].identificationNumber : '',
                     ClaveSAT:res.items[key] != undefined ? res.items[key].productIdentification : '',
                     // ImporteImpuesto:res.items[key] != undefined ? res.tax : '',
                     // Impuesto:res.items[key] != undefined ? res.tax : '',
                   
                     Moneda:res.currency,
                     VersionCFDI:res.version,
                     Fechacompleta:res.issuedAt.substring(0, 10),
                     TotalMXN:(res.items[key].totalAmount)
                   }
                 venta[indexVenta] = dataExcel
                 totalMXNVT += parseFloat(tabla.TotalMXN);
                 totalLTSVT += parseFloat(tabla.Cantidad);
                 jsonVenta[indexVenta] = tabla
                 indexVenta++
                 
                }
             } catch (error) {
               console.log(error);
             }
             
           }
       }
       if (noEmpty != 0) {
        console.log(ifExist, '<<<<<<<<<<<<<<<<');
         if (ifExist == 1) {
           console.log('ya estas');
           productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.forEach(element => {
             console.log(element.RfcClienteOProveedor );
             if (element.RfcClienteOProveedor  == res.receiver.rfc) {
               console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
               entregaNoGeneral.CFDIs.forEach(element2 => {
                 element.CFDIs.push(element2)
               });
             }
           });
         }else{
          console.log(ifExist, '<<<<<<<<<<<<<<<<');
           productoEstructura.ReporteDeVolumenMensual.Entregas.Complemento[0].Nacional.push(entregaNoGeneral)
         }
       }
 }
      }

    // console.log(tabla);
    }
  
  });
});
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
router.get('/calendar', async (req,res) =>{
  try{
    const id = req.params.id
      const data = await pool.query('SELECT tarea,"descTarea" , "Fecha", id FROM schtelemetria.tarea WHERE "Estado" = 1');
      let index = 0
      let eventos = [];
      console.log(data)
  for (const key in data) {
    const event = {
      id: index, //Event's ID (required)
       title: `${data[key].tarea} ${data[key].descTarea}`, //Event name (required)
      date: moment(data[key].Fecha).format('YYYY-MM-DD'), //Event date (required)
       description: data[key].descTarea, //Event description (optional)

    }
    eventos.push(event)
    index++
  }
  return res.send(eventos)

  } catch (error){
  console.log(error);
  return res.send(error)
}
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

router.post('/balance',BalanceController.balance);

//router.post('/balance-pagination',BalanceController.balancePagination);

router.post('/createBalanceJSON',BalanceController.createBalanceJSON);

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
  async function arbolArchivos(id){
    const directory =  await pool.any('SELECT * from estructura_directorios where "companyId" = $1',id)
    const file = await pool.any('SELECT * from estructura_archivos where "companyId" = $1',id)
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
          // console.log(file[key]);
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
  datoFecha["realizada"] = {};
  
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
const { func, each } = require('../database');

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