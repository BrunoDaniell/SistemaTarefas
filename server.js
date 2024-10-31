const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database/tarefas.db', (err) => {
    if (err) console.error('Erro ao conectar ao banco de dados', err);
    else console.log('Conectado ao banco de dados SQLite');
    
});

// Importar rotas de tarefas
const tarefasRoutes = require('./routes/tarefas');
app.use('/api/tarefas', tarefasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
