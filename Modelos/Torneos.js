const {Schema, model} = require('mongoose');

//modelo Paises y continentes, sacados de la API
const Torneos = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    nombre:{
        type: String,
        require:true,
    },
    Pais_continente:{
        type: String,
        required: true
    },
    formato:{
        type: String,
    }
})

module.exports= model("Torneos",Torneos);