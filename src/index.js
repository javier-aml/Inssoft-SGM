const express = require ('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParase = require('cookie-parser');
const signStr = 'okokkokokokokokokok'
app.use(cookieParase(signStr));
const session = require('express-session');

const favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname,'public','assets', 'favicon.ico')));


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
// settings
 app.disable('x-powered-by');

app.set('port',process.env.PORT || 3000);
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
        next();
    });
// routes
app.use(require('./routes'));
app.use('/proveedor',require('./routes/proveedor'));
app.use('/cliente',require('./routes/cliente.js'));
app.use('/Admin',require('./routes/Admin.js'));
app.use('/almacen',require('./routes/almacen.js'));
app.use('/prueba',require('./routes/prueba.js'));
app.use('/Ekide',require('./routes/Ekide.js'));
app.use('/produccion',require('./routes/produccion.js'));
app.use('/utiles',require('./routes/utiles.js'));
app.use('/VistaPrueba',require('./routes/VistaPrueba.js'));
//app.use(express.static('src'));

var url = require('url')

// public
 app.use(express.static(path.join(__dirname, 'public')));

// start the server

// app.listen(app.get('port'),()=>{

//     console.log("iniciado servidor");
//     console.log("server en puerto", app.get('port'));
// });

var port = app.get('port');
app.listen(port, () => {
    console.log("server is running on port :" + port);
}).on('error', function (err) {
    var server = app.listen(app.get('port'));
    server.close();
});
