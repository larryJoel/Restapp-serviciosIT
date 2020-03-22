//servidor http
require('./config/config');
//paquetes a utilizar
const express = require('express');
const app = express();

//bodyparser: serializa la información en un objeto json
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Servicios: get, post, put, delete
app.get('/usuario',function(req,res){
    res.json('get usuario');
});

app.post('/usuario',function(req,res){
    let body = req.body;
    if (body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje: 'Debe agregar el nombre'
        });
    } else {
            res.json({
        usuario: body});
    }

});

app.put('/usuario/:id',function(req,res){
    let id = req.params.id;

    res.json({ id });
});

app.delete('/usuario',function(req,res){
    res.json('delete usuario');
});

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto: ',process.env.PORT);
});