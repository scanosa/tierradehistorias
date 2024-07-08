const pool = require('../config/database');

exports.getAllBooks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const { title, editorial, description, ano, autor } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Validación de campos obligatorios
        if (!title || !editorial || !description || !ano || !autor) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Asegurarse de que ano sea un número válido
        if (isNaN(parseInt(ano, 10))) {
            return res.status(400).json({ message: 'El año debe ser un número válido' });
        }

        await pool.query('INSERT INTO books (title, editorial, description, ano, autor, image) VALUES (?, ?, ?, ?, ?, ?)', [title, editorial, description, ano, autor, image]);
        res.status(201).json({ message: 'Libro creado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { title, editorial, description, ano, autor } = req.body;
        await pool.query('UPDATE books SET title = ?, editorial = ?, description = ?, ano = ?, autor = ? WHERE id = ?', [title, editorial, description, ano, autor, req.params.id]);
        res.status(200).json({ message: 'Libro actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
