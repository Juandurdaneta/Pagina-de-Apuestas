const mongoose = require('mongoose')

const  Usuario = new mongoose.Schema(
	{
        correo: {
            type:String, 
            required:true, 
            unique:true
        },
		nombre: { 
            type: String, 
            required: true
        },
		password: { 
            type: String, 
            required: true 
        },
        edad: {
            type:String
        },
        nacionalidad:{
            type: String
        },
        total_apostado:{
            type:Number
        },
        total_ganado:{
            type:Number
        }
	}
)

const model = mongoose.model('Usuario', Usuario)

module.exports = model
