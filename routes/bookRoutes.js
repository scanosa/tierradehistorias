const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../tierradehistorias-main/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/create', verifyToken, upload.single('image'), bookController.createBook); // Aplica el middleware a la ruta protegida
router.put('/:id', verifyToken, bookController.updateBook); // Aplica el middleware a la ruta protegida
router.delete('/:id', verifyToken, bookController.deleteBook); // Aplica el middleware a la ruta protegida

module.exports = router;
