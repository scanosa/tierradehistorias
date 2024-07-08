// controllers/mainController.js
const pool = require('../config/database');

exports.getHome = async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM yourtable');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
