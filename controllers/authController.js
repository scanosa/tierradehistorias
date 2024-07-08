const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const config = require('../config/config');

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Insertar usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        const newUser = { id: result.insertId, username };

        const payload = { id: newUser.id, username: newUser.username };
        const token = jwt.sign(payload, config.secretKey, { expiresIn: config.tokenExpiresIn });

        res.status(201).send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario en la base de datos
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        const user = rows[0];
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, config.secretKey, { expiresIn: config.tokenExpiresIn });

        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
};

module.exports = { register, login };
