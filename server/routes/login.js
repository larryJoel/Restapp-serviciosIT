const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario=require('../models/usuario');
const app = express();

app.post('/login', (req, res)=>{

//verificar el email en la BD
    let body= req.body;
    Usuario.findOne({email:body.email},(err,usuarioDB)=>{
        // error de excepción en la BD
        if (err){ 
            return res.status(500).json({
                ok:false,
                err
            });
        }
        // No consigue el usuario en la BD
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'(Usuario) o contraseña incorrectos'
                }
            });
        }
        // evaluar la contraseña
        if( !bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }
        //generar el token
        let token = jwt.sign({
            usuario:usuarioDB }, process.env.SEED,
            {expiresIn: process.env.CADUCIDAD_TOKEN })

        // si las dos validaciones son correctas
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    })
});


module.exports = app;