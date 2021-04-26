const express = require('express')
const path= require('path')
require('./BD/conecction')
const multer  = require('multer')
const upload = multer()
const session= require('express-session')

const app = express();

//modelos
const usuario= require('./modelos/usuarios')
const Paises= require('./Modelos/Paises')
const equipos= require('./Modelos/Equipos')
const Jugadores = require('./Modelos/Jugadores');
const Torneos = require('./Modelos/Torneos');
const Rounds = require('./Modelos/Rounds');
const Partidos = require('./Modelos/Partidos')
const Equipos = require('./Modelos/Equipos')

app.set('port', process.env.PORT || 3000)

app.use(session({
	secret: 'clave',
	resave: true,
	saveUninitialized: true
}));
//los midlwers debe ir en el orden correcto
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {                                                                 
    res.header("Access-Control-Allow-Origin", "*");                                        
    res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");     
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");    
    res.header("Access-Control-Allow-Credentials", true);              
    next();        
});

app.get('/', (req,res)=>{
    res.sendFile('./public/index.html', { root: __dirname });                               
})

app.post('/registro',upload.none(), async (req,res)=>{
    const usuar= new usuario({
            correo: req.body.email,
            nombre: req.body.username,
            password: req.body.password,
            edad: null,
            total_apostado: null,
            total_ganado: null
        }
    )
    console.log(req.body.email)
    const persona=await usuar.save();
    console.log(persona)
    if(persona!=null)
        res.send({"Status":200, "mensaje":"Usuario Registrado"})
    else
        res.send({"Status":100, "mensaje":"Utilize otro correo"})
    
})


app.post('/login', upload.none() ,async(req,res)=>{
    console.log(req.body.username)
    const cursor =await usuario.find({correo:req.body.email, password:req.body.password}, {correo:1})
    console.log(cursor);
    console.log(cursor.length);
    if(cursor.length!=0){
        req.session.email=req.body.email;
        req.session.password=req.body.password;
        res.redirect("/Dashboard")
    }
        
    else
        res.send({"Status":100,"mensaje":"ocurrio un error"});
    
})

app.get('/Dashboard',(req,res)=>{
    console.log(req.session.email)
    if(req.session.email!=null)
        res.sendFile('./public/views/Dashboard.html', { root: __dirname }) 
    else     
        res.redirect("/")   
}) 

app.get('/Dashboard/traer', async (req,res)=>{
    const cursor =await usuario.findOne({correo:req.session.email, password:req.session.password}, {_id:0})
    console.log(cursor.correo)
    res.send({'status':200,'correo':cursor.correo,'nombre':cursor.nombre,'password':cursor.password,
            'edad':cursor.edad,nacionalidad:cursor.nacionalidad,total_apostado:cursor.total_apostado,
            total_ganado:cursor.total_ganado})                   
})

app.post('/Dashboard/enviar', upload.none(), async (req,res)=>{
    console.log("llego");
    //si llego a este punto la sesion debe de estar activa, asi que no es necesario asegurarse
    const cursor =await usuario.findOne({correo:req.session.email, password:req.session.password}, {_id:0})
    console.log(cursor);
    const act=await usuario.updateOne({correo:req.session.email, password:req.session.password},
                    {edad:req.body.EDAD,nombre:req.body.username,password:req.body.pass, nacionalidad:req.body.nacionalidad,
                    total_apostado:req.body.total_apostado,total_ganado:req.body.total_ganado})
    console.log(act);
    res.send({"status":200,"mensaje":"Datos actualizados"});                  
})

app.get('/Partidos', (req,res)=>{
    res.sendFile('./public/views/partidos.html', { root: __dirname })
})

app.get('/Partidos_pedir',upload.none(),async (req,res)=>{
    console.log(req.body.pagina)
    var pag= req.body.pagina || 1;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var fecha=year + "-" +"0"+ month + "-" + day;
    //paginacion
    const cursor =await Partidos.paginate({hora_inicio:{$regex:fecha}}, {_id:0, limit:7, page:pag})
    var round=new Array();
    var torneo=new Array();
    var local=new Array();
    var visitante=new Array();
    var hora_inicio=new Array();
    console.log(cursor)
    for(let i=0;i<7;i++){
        round [i]= await Rounds.findOne({_id:cursor.docs[i].round},{id_torneo:1, nombre:1})
        torneo [i]=await Torneos.findOne({_id:round[i].id_torneo},{nombre:1})
        local[i]= await Equipos.findOne({_id:cursor.docs[i].equipo_local},{nombre:1})
        visitante[i]= await Equipos.findOne({_id:cursor.docs[i].equipo_visitante},{nombre:1})
        hora_inicio[i]=cursor.docs[i].hora_inicio
    }
    res.send({"status":200,"torneo":torneo,"local":local,"visitante":visitante,
            "tipo":round,"horario":hora_inicio, "hasPrevPage":cursor.hasPrevPage,"hasNextPage":cursor.hasNextPage, "page":cursor.page})
    // console.log(cursor);
    // console.log(round)
    // res.send(cursor)
})

app.use((req, res) => {
   res.status(404).send({'message': 'Errorrrrr 404'});
});
  
app.listen(app.get('port'), ()=>{
    console.log('Server on port:', app.get('port'));
})