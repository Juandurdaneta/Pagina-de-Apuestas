const {Schema, model} = require('mongoose');

//modelo Paises y continentes, sacados de la API
const Pais_continente = new Schema({
    _id:{
        type: Number,
        unique: true,
        required: true
    },
    nombre:{
        type: String,
        require:true,
    }
})

module.exports= model("Pais_continente",Pais_continente);