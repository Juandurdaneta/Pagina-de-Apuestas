const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//modelo Paises y continentes, sacados de la API
const Partidos = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    round:{
        type: Number,
        require:true
    },
    equipo_local:{
        type: Number
    },
    equipo_visitante:{
        type: Number
    },
    hora_inicio:{
        type: String
    },
    equipo_local_gol:{
        type: Number
    },
    equipo_visitante_gol:{
        type: Number
    },
    estado:{
        type: String
    },
    ganador:{
        type: String
    }
})

Partidos.plugin(mongoosePaginate);

module.exports= model("Partidos",Partidos);