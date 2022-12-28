const express = require ('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParase = require('cookie-parser');
const signStr = 'okokkokokokokokokok'
require('dotenv').config()
console.log(`postgres://${process.env.DATABASE_USER_SGM}:${process.env.DATABASE_PASSWORD_SGM}@${process.env.DATABASE_HOST_SGM}:${process.env.DATABASE_PORT_SGM}/${process.env.DATABASE_NAME_SGM}`);
console.log('postgres://schtelemetria:Sch3m@T3l3m3tr1@@localhost:5432/dbtelemetria');
app.use(cookieParase(signStr));
const session = require('express-session');
const cors = require("cors")
var corsOptions = {
    origin: 'http://localhost:4000',
    "methods": "GET,POST,OPTIONS",
    credentials:true
  }
  
const favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname,'public','assets', 'favicon.ico')));


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
// settings
 app.disable('x-powered-by');

app.set('port',process.env.PORT || 4040);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./libs/handlebars')
}));
app.set('view engine','.hbs');
// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
// Global variables
    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
        res.header('Access-Control-Allow-Methods', 'GET, POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
        res.header('Access-Control-Allow-Credentials',true)
        next();
    });
app.use('/api_sgm_v1',cors(corsOptions),require('./routes/api_sgm_v1.js'));
// app.use('/api_sgm_v1',require('./routes/api_sgm_v1.js'));

//app.use(express.static('src'));

var url = require('url')

// public
 app.use(express.static(path.join(__dirname, 'public')));
 app.use('/api_sgm_v1/sgm',express.static(path.join(__dirname, 'public/formatos-sgm')));

// start the server

// app.listen(app.get('port'),()=>{

//     console.log("iniciado servidor");
//     console.log("server en puerto", app.get('port'));
// });

var port = app.get('port');
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
  });
app.listen(port, () => {
    console.log("server is running on port :" + port);
}).on('error', function (err) {
    var server = app.listen(app.get('port'));
    server.close();
});
