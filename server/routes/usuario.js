//Servicios: get, post, put, delete
const express = require('express');
const bcrypt = require('bcrypt');
const _=require('underscore');

const app = express();
const Usuario = require('../models/usuario');
//*****************************************************/
// GET - mostrar registro de la BD
//*****************************************************/
app.get('/usuario',function(req,res){
    
     let desde = Number(req.query.desde || 0);
     let rango = Number(req.query.rango || 5);
    // desde=Number(desde);
    Usuario.find({estado: true})
        .skip(desde)
        .limit(rango)
        .exec((err,usuarios)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            Usuario.count({estado: true},(err, conteo)=>{
               res.json({
                ok: true,
                usuarios,
                Cuantos: conteo
                }); 
            });
            
        })
 });

//*****************************************************/
// POST - CREANDO USUARIO
//*****************************************************/
app.post('/usuario',function(req,res){
    let body = req.body;
    //tomar usuario para guardar en BD
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10), 
        role: body.role
    });
    // grabar los datos en la BD
    usuario.save((err,usuarioDB)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });

});

//*****************************************************/
// PUT - Actualizar usuario
//*****************************************************/
app.put('/usuario/:id',function(req,res){
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new: true, runValidators: true},(err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        } 
        res.json({ 
            ok: true,
            usuario: usuarioDB
         });
    });

   
});
//*****************************************************/
// DELETE - Borrar datos de un usuario
//*****************************************************/
app.delete('/usuario/:id',function(req,res){
    //res.json('delete usuario');

let id = req.params.id;
//borrado literal en la BD
// Usuario.findByIdAndRemove(id,(err,usuarioBorrado) => {
//Que no sea visible por el usuario, cambiar el estado
Usuario.findByIdAndUpdate(id,{estado:false},{new: true},(err,usuarioBorrado)=>{    
    if(err){
        return res.status(400).json({
            ok:false,
            err
        });
    } 
    if(!usuarioBorrado){
        return res.status(400).json({
            ok:false,
            err:{
            message:'Usuario no encontrado'
        }
        });
        
    }
    res.json({ 
        ok: true,
        usuario: usuarioBorrado
     });
});

});


module.exports = app;