// server.js

const express = require('express');
const mongoose = require('mongoose');
const leituraRoutes = require('./routes/leituras');

const app = express();
const port = 3000;

app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/revisaobd3';

mongoose.connect(mongoUri)
    .then(() => {
        console.log("Conectado ao MongoDB com sucesso!");
    })
    .catch((err) => {
        console.error("Erro na conexão com o MongoDB:", err);
    });


app.use('/api', leituraRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API de Monitoramento Veicular está online.');
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

