const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 3001;
const verifyToken = require('./middleware/authMiddleware'); // Importa el middleware de autenticación

// Middleware de CORS
app.use(cors());

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'tierradehistorias-main')));

// Middleware para servir imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'tierradehistorias-main/uploads')));

// Otro middleware y configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'tierradehistorias-main/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Importar rutas
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación

// Usar rutas
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación

// Proteger la ruta de booklist.html
app.get('/pages/booklist.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'tierradehistorias-main/pages/booklist.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
