const { Router } = require('express')

const router = Router()

const usuario = require('../controllers/usuario')

router.get('/', usuario.usuarioGet)

router.get('/promedio', usuario.promGet)

router.post('/', usuario.usuarioPost)

router.put('/:id', usuario.usuarioPut)

router.delete('/:id', usuario.usuarioDelete)


module.exports = router