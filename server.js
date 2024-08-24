const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'chatbot_faq'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM faq_categories', (err, results) => {
        if (err) {
            console.error('Erro ao buscar categorias:', err);
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        } else {
            console.log('Categorias retornadas:', results); // Log para depuração
            res.json(results);
        }
    });
});

app.get('/api/questions/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    db.query('SELECT * FROM faq_questions WHERE category_id = ?', [categoryId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar perguntas:', err);
            res.status(500).json({ error: 'Erro ao buscar perguntas' });
        } else {
            console.log('Perguntas retornadas:', results); // Log para depuração
            res.json(results);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
