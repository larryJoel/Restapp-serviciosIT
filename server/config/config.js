//CONFIGURACIONES DE LA APP
//****************************
// PUERTO
//****************************
process.env.PORT = process.env.PORT || 3000;

//****************************
// VENCIMIENTO del token
//****************************
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = '48h';

//********************************
// SEED (Semilla de autenticación)
//********************************
process.env.SEED = process.env.SEED || 'este-es-seed-desarrollo';

//****************************
// ENTORNO
//****************************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//****************************
// BASE DE DATOS 
//****************************
let urlDB;
if ( process.env.NODE_ENV === 'dev'){
    urlDB ='mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URL;
}
process.env.urlDB = urlDB;

//****************************
// GOOGLE client ID
//***************************
process.env.CLIENT_ID = process.env.CLIENT_ID || '742136716725-24vifkeg3cv19khaqfspuijm8jha78i7.apps.googleusercontent.com';