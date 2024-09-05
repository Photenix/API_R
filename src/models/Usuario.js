const { model, Schema } = require("mongoose")

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: [true,'Se requiere definir un nombre'],
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN', 'USER']
    },
    active: {
        type: Boolean,
        required: [true, "El estado es requerido"],
        default: true
    }
})

module.exports = model('Usuario', UsuarioSchema);