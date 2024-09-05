const { response } = require("express")

// Controlador para la solicitud GRET para la ruta de usuario

const usuarioGet = (req, res = response ) =>{
    res.json({  msg: "GET API" })
}

// Controlador para la solicitud POST para la ruta de usuario

const usuarioPost = (req, res = response ) =>{
    res.json({ msg: "POST API" });
}

// Controlador para la solicitud PUT para la ruta de usuario

const usuarioPut = (req, res = response ) =>{
    res.json({ msg: "PUT API" });
}

// Controlador para la solicitud DELETE para la ruta de usuario

const usuarioDelete = (req, res = response ) =>{
    res.json({ msg: "DELETE API" });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}