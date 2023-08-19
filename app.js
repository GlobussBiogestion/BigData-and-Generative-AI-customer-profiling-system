const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuración de MongoDB Atlas
const mongoURI = 'mongodb+srv://Globuss:Perry-08@cluster0.vyxifef.mongodb.net/GlobussDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Definición del modelo de datos
const UsuarioSchema = new mongoose.Schema({
    _id: String, // Cambiar el tipo de dato a String para utilizar userId como identificador
    acciones: [{
        accion: String,
        tiempoPermanencia: Number
    }]
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Middleware para parsear JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS
app.use(cors());

// Ruta para registrar acciones en la base de datos
app.post('/registrar-accion', async (req, res) => {
    console.log('Solicitud recibida en /registrar-accion:', req.body);

    // Obtener el userId desde el cuerpo de la solicitud
    const userId = req.body.userId;
    if (!userId) {
        console.error('Ingresa un nombre de usuario');
        res.status(400).json({ mensaje: 'Ingresa un nombre de usuario' });
        return;
    }

    try {
        // Buscar o crear el usuario en la base de datos
        let usuario = await Usuario.findById(userId);
        if (!usuario) {
            usuario = new Usuario({ _id: userId });
        }

        // Agregar la acción actual al array de acciones del usuario
        usuario.acciones.push({
            accion: req.body.accion,
            tiempoPermanencia: req.body.tiempoPermanencia
        });

        // Guardar el usuario en la base de datos
        await usuario.save();

        console.log('Acción registrada en la base de datos:', usuario);
        res.json({ mensaje: 'Acción registrada con éxito' });
    } catch (error) {
        console.error('Error al guardar la acción:', error);
        res.status(500).json({ mensaje: 'Error al guardar la acción' });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

// Ruta para obtener datos en tiempo real desde la base de datos
app.get('/obtener-datos', async (req, res) => {
    try {
        const usuarios = await Usuario.find(); // Recuperar todos los usuarios
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
});