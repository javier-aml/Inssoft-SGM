const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const admin = require('firebase-admin');
 const serviceAccount = require('../../FireBase/adrianqr-service.json');
const pool = require('../database');
const fs = require("fs");
const signStr = 'okokkokokokokokokok'

// const {google} = require('googleapis');

// const  CLIENT_ID = '954135611645-0oshpcot4qugom9441f3bcvgnj6a92nn.apps.googleusercontent.com'
// const CLIENT_SECRET = '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'
// const REDIRECT_URI = 'https://softoil.herokuapp.com'

// const REFRESH_TOKEN = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// const {OAuth2Client} = require('google-auth-library');
router.get('/', async (req, res) => {
  // ExcelDiario()
// test()

const letters = ['a','b','c','d','e','f']
const mayus = ['A','B','C','D','E','F']

let keyEnvio = ''
indexletters = 1
for (let index = 0; index < 31; index++) {
  // console.log(keyEnvio);
  if ((index== 7) ||(index== 11) ||(index== 15)||(index== 19) ) {
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
  const some = ''
  console.log(keyEnvio);
res.render('index/',{some});
  

});

router.post('/login', async (req, res) => {
  var value = req.body;
  req.secret=signStr;

  //  db.collection("Users").doc(user["T&C"])}
   const user = await pool.query(`SELECT * FROM Users WHERE Uid = "${value.uid}"` );

   if (user[0].Rol == "Proveedor") {
     user[0].Rol = "proveedor";
   }else if(user[0].Rol == "almacen"){
    res.cookie(`ExcelEventos`, 0 ,{signed: true,path:`/${user[0].Rol}`});
   }
   else{
     user[0].Rol = user[0].Rol;
   }

   res.cookie(`${user[0].Uid}Rol`, `${user[0].Rol}`,{signed: true,path:`/${user[0].Rol}`});
   res.cookie(`Nombre`, `${user[0].Nombre}`,{signed: true,path:`/${user[0].Rol}`});
   res.cookie(`${user[0].Uid}L`, `L0g1n`,{signed: true,path:`/${user[0].Rol}`});
   res.cookie(`TC`,user[0].TC ,{signed: true,path:`/${user[0].Rol}`});
  res.send(user[0])

})
router.post('/registro', async (req, res) => {
  const pool = require('../database');
  var user = req.body;
  global.user = user;
  const {
    Nombre,
    email,
    Roles,
    Uid
  } = req.body;
  const data = {
    Correo: email,
     Nombre: Nombre,
     Rol: Roles,
     Uid: Uid,
     TC: 0,
  };
  
  await pool.query("INSERT INTO users set ?",[data])
  // const ref = await db.collection('Users').doc(`${Nombre}`).set(data);
  res.send('Added document with ID: ');

})


function test() {
  let json = require(path.join(__dirname, '../public/json/jsonGuia.json'));
const   xml2js = require('xml2js');
// console.log(json);
  var parser = new xml2js.Builder();
  console.log(parser);
 const pathXML = path.join(__dirname, '../public/xml/xml.xml');
 var xml = parser.buildObject(json);
//  console.log(xml);
  fs.writeFile(pathXML, xml, function(err) {
    if (err) return console.log(err);
    // console.log(JSON.stringify(temp));
    console.log('writing to ' + pathXML);
  });
}
function ExcelDiario() {
  const path = require('path');
  // Requiring the module
  const reader = require('xlsx')

  const file = reader.readFile(path.join(__dirname, '../public/Excel/Trafi.xlsx'));

  try {
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[0]], {
        raw: false
      })
      const json = {}
      const titulosReducido ={}
      let index=0
    temp.forEach((res) => {
      json[index] = res;
      console.log(res);
      index++;
    })
    // const fileJsonName = path.join(__dirname, `../public/json/diario1.json`);
    // fs.writeFile(fileJsonName, JSON.stringify(json,null, 2), function writeJSON(err) {
    //   if (err) return console.log(err);
    //   // console.log(JSON.stringify(temp));
    //   console.log('writing to ' + fileJsonName);
    // });
  } catch (e) {
    console.log(e);
  }


}
module.exports = router;