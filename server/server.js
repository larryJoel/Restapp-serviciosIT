//servidor http
require('./config/config');
//paquetes a utilizar
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

//bodyparser: serializa la información en un objeto json
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Static File - mostrar el contenido de la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
//console.log(path.resolve(__dirname,'../public'));


//llamar a la variable app en el archivo usuario
//configuración global de rutas
app.use(require('./routes/index'));


//conexion a la BD mongo
mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
  },(err,res)=>{
  
    if(err)throw err;
    console.log('base de datos ONLINE');
  })

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto: ',process.env.PORT);
});