const {Schema, model} = require('mongoose');

//modelo Paises y continentes, sacados de la API
const Rounds = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    id_torneo:{
        type: Number,
        unique: true,
    },
    nombre:{
        type: String,
        require:true,
    },
    Temporada:{
        type: Number
    },
    Fecha_inicio:{
        type: String
    },
    Fecha_fin:{
        type: String
    }
})

module.exports= model("Rounds",Rounds);