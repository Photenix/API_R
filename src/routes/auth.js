const { Router } = require('express')
const jwt = require('jsonwebtoken')

const auth = Router()
const { login } = require('../controllers/auth.js')

auth.post('/login', login)

const verification =  ( req, res, next ) => {
    let token = req.headers["x-access-token"]||req.headers["authorization"]
    if(!token){
        return res.status(401).json({ msg: 'No token provided'})
    }
    if( token.startsWith('Bearer ')){
        token = token.slice(7, token.length)
        console.log(token)
    }
    if( token ){
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
            if(error) return res.status(403).json({ msg: 'Token invalido'})
            req.user = decoded
            next()
        })
    }
}

auth.use(verification) // Middleware para verificar el token antes de cada petición

auth.get("/", (req, res) => res.status(200).json({message:"token valido"}))


module.exports = auth;