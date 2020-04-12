const express = require('express');
const { verificaToken} = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/productos');

//**************************************/
// Mostrar todos los productos
//**************************************/
app.get('/productos',verificaToken,(req,res)=>{
   let desde = Number(req.query.desde || 0);
   let rango = Number(req.query.rango || 5);
Producto.find({disponible:true})
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre descripcion')
    .skip(desde)
    .limit(rango)
    .exec((err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        Producto.count({disponible:true},(err,conteo)=>{
            res.json({
                ok:true,
                producto,
                Cuantos: conteo
            });
        });
    });
    //todos los productos
    //populate: usuario categoria
    //paginado
});

//**************************************/
// Mostrar un producto
//**************************************/
app.get('/productos/:id',verificaToken,(req, res)=>{
let id = req.params.id;
Producto.findById(id,(err,productoBD)=>{
    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    }
    if(!productoBD){
        return res.status(400).json({
            ok:false,
            err:{
                message:'El ID del producto no es correo'
            }
        });
    }
    res.json({
        ok:true,
        productos:productoBD
    });
})
.populate('usuario')

});

//**************************************/
// Bucar productos
//**************************************/
app.get('/productos/buscar/:termino',verificaToken, (req,res)=>{
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Producto.find({nombre:regex})
        .populate('categoria','nombre')
        .exec((err,productos)=>{
            if (err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                productos
            })
        })


});



//**************************************/
// crear un producto
//**************************************/
//grabar usuario
//grabar una categoria del listado
app.post('/productos', verificaToken,(req,res)=>{
let body = req.body;
let producto = new Producto ({
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario: req.usuario._id
});
producto.save((err,productoDB)=>{
    if (err){
        return res.status(500).json({
            ok:false,
            err
        });
    }
    if (!productoDB){
        return res.status(400).json({
            ok:false,
            err
        });
    }
    res.json({
        ok:true,
        producto: productoDB
    });
});


});

//**************************************/
// actualizar un producto
//**************************************/
app.put('/productos/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    let descProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    }
    Producto.findByIdAndUpdate(id,descProducto,{ new: true, runValidators: true },(err, productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:true,
                err
            });
        }
        if (!productoDB){
            return res.status(400).json({
               ok:false,
               err 
            });
        }
        res.json({
            ok:true,
            producto: productoDB
        });
    })
    //actualizar producto
    //grabar una categoria del listado
    
    });
//**************************************/
// actualizar un producto
//**************************************/
app.delete('/productos/:id',verificaToken,(req,res)=>{
    id = req.params.id;
    Producto.findByIdAndDelete(id,(err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
            //.populate('usuario')
        }

        res.json({
            ok: true,
            producto,
            message: 'Producto Borrado'
    })
    
    
    //disponible este en falso usuario

    
    });


})

module.exports = app;