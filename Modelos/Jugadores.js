const {Schema, model} = require('mongoose');

//modelo Paises y continentes, sacados de la API
const Jugadores = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    nacionalidad:{
        type: String,
        required: true
    },
    //nombre comun
    nombre:{
        type: String,
        require:true,
    },
    url_foto:{
        type: String,
    },
    equipo:{
        type: Number,
    },
    numero_camisa:{
        type: String,  
    }
})

module.exports= model("Jugadores",Jugadores);