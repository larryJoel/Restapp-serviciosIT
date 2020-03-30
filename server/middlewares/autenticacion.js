jwt = require('jsonwebtoken');

//*****************************************************/
// VERIFICAR  Token
//*****************************************************/

let verificaToken =(req, res, next)=>{

    let token = req.get('token');
    jwt.verify(token, process.env.SEED,(err,decoded)=>{
        if (err){
            return res.status(401).json({
                ok:false,
                err:{
                    Message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};
//*****************************************************/
// VERIFICAR  Role
//*****************************************************/
let verificaAdmin_Role = (req, res, next)=>{
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE'){
        next();
        return
        
    }else{
        return res.json({
            ok: false,
            err:{
                message: 'El usuario no es administrador'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
};