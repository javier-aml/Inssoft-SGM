const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const pool = require('../database');
const fs = require("fs");
const signStr = 'okokkokokokokokokok'


// const {OAuth2Client} = require('google-auth-library');
router.get('/', async (req, res) => {

res.render('index/',);
  

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
module.exports = router;