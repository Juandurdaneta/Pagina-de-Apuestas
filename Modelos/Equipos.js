const {Schema, model} = require('mongoose');

//modelo Paises y continentes, sacados de la API
const equipos = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    id_pais:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        require:true,
    },
    url_escudo:{
        type: String,
    },
    N_jugadores:{
        type: Number,
        require:true
    }
})

module.exports= model("Equipos",equipos);