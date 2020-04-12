const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categorias');

// ============================
// Mostrar todas las categorias
// ============================
app.get('/categorias',verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.find((err, categorias) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!categorias){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Categoria no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            categorias
        });
    })
    .populate('usuario','nombre email')
    .sort('nombre')
});
// ============================
// Mostrar una categoria por ID
// ============================
app.get('/categorias/:id', verificaToken, (req, res) => {
    // Categoria.findById(....);

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })
    .populate('usuario')


});

// ============================
// Crear nueva categoria
// ============================
app.post('/categorias', verificaToken, (req, res) => {
    // regresa la nueva categoria
    // req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });


});

// ============================
// Editar todas las categorias
// ============================
app.put('/categorias/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});

// ============================
// borrar todas las categorias
// ============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar categorias
    // Categoria.findByIdAndRemove
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });

    });


});


module.exports = app;