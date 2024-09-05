const { response } = require('express');
const bcrypt = require('bcrypt');
const usuario = require('../modules/usuario');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken')

const usuarioGet = async (req, res = response ) => {
    const body = req.query
    const usuarios = await Usuario.find();

    return res.json({
        usuario:"monda"
    })
}

const promGet = async (req, res = response ) => {
    const body = req.query
    
    const usuarios = await Usuario.find()

    usuarios.forEach( e => {
        console.log(e);
    });

    res.json({
        msg: 'Prom API controlador',
        usuarios
    })
}


const usuarioPost = async (req, res = response) => {
    const body = req.query;
    const usuario = new Usuario(body)
    
    try {
        const salt = bcrypt.genSaltSync(10)
        usuario.password = bcrypt.hashSync( "sqwe", salt )
        const token = jwt.sign( body, process.env.JWT_SECRET )
        res.json( token )

    } catch (error) {
        console.error(error);
        if( error.name == 'ValidationError' ) {
            console.error( Object.values(error.errors).map( v => v.message ) );
        }
    }
}


const usuarioPut = async (req, res = response ) => {
    const body = req.query;
    let msg = '';
    try{
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, body);
        res.json({
            usuario
        })
    }
    catch(error) {
        console.error(error);
        if( error.name == 'ValidationError' ) {
            console.error( Object.values(error.errors).map( v => v.message ) );
            msg = Object.keys( error.errors ).map( v => v.message )
        }
        res.status(500).json({ msg })
    }
}

const usuarioDelete = async (req, res = response ) => {
    let msg = '';
    try{
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'Usuario deleted',
            usuario
        })
    }
    catch(error) {
        console.error(error);
        if( error.name == 'ValidationError' ) {
            console.error( Object.values(error.errors).map( v => v.message ) );
            msg = Object.keys( error.errors ).map( v => v.message )
        }
        res.status(500).json({ msg })
    }
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    promGet
}