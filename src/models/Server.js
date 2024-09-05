// const { dbConnection } = require('../database/config')
require('../database/config')
const cors = require('cors')
const express = require('express');
const bodyParser = require("body-parser");
const { usuarioGet } = require('../controllers/usuario.js');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioPath = "/api/usuario/"
        this.authPath = "/api/auth/"
        this.middleware()
        this.routes()
        // this.dbConnection() = dbConnection
    }

    listen() {
        console.log( this.port );
        
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
    
    middleware() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(express.static((__dirname = "/public" )))
    }
    routes(){
        const router = require('../routes/usuario.js')
        // this.app.get("/", usuarioGet)
        this.app.use(this.usuarioPath, router)
        this.app.use(this.authPath, require('../routes/auth'))
    }
}

module.exports = Server;