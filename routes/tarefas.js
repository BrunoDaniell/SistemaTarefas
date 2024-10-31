const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/tarefas.db');

// Listar Tarefas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Tarefas ORDER BY ordem';
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ tarefas: rows });
    });
});

// Incluir nova tarefa
router.post('/', (req, res) => {
    const { nome, custo, data_limite } = req.body;
    const ordem = new Date().getTime(); // Última posição
    const sql = 'INSERT INTO Tarefas (nome, custo, data_limite, ordem) VALUES (?, ?, ?, ?)';
    db.run(sql, [nome, custo, data_limite, ordem], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// Excluir Tarefa
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM Tarefas WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Editar Tarefa
router.put('/:id', (req, res) => {
    const { nome, custo, data_limite } = req.body;
    const sql = 'UPDATE Tarefas SET nome = ?, custo = ?, data_limite = ? WHERE id = ?';
    db.run(sql, [nome, custo, data_limite, req.params.id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ updated: this.changes });
    });
});

module.exports = router;
