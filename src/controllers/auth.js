const usuario = require('../modules/usuario.js');
const jwt = require('jsonwebtoken');


//cifrado de contraseña y comparacion de contraseña
const bcrypt = require('bcrypt');

// Comparar contraseña con el hash almacenado
async function comparePassword(password, hash) {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    return false;
  }
}

// inicio de seccion

const login = async (req, res) => {
    try {
        const { email, password } = req.body;	
        // Verificar que el usuario exista
        // const user = await Usuario.findOne({ email });
        const user = { _id:23, nombre:"nombre", email:"email"}
        // if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
        // if( !(user.state) ) return res.status(401).json({ message: 'Usuario deshabilitado' });
        
        // // Comparar la contraseña con el hash en la base de datos
        // const passwordMatch = await comparePassword(password, user.password);
        // if (!passwordMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
        
        // Generar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Devolver los datos del usuario y el token
        res.json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el login' });
    }
}

module.exports = {
    login,
}; 