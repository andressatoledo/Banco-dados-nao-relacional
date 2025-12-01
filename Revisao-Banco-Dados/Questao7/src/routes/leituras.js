const express = require('express');
const router = express.Router();
const Leitura = require('../model/leitura'); 


router.post('/leituras', async (req, res) => {
    try {
        const { carro, sensor, valor, data_hora } = req.body;

        if (!carro || !sensor || valor === undefined) {
            return res.status(400).json({ error: "Campos 'carro', 'sensor' e 'valor' são obrigatórios." });
        }

        const novaLeitura = new Leitura({
            carro,
            sensor,
            valor,
            data_hora: data_hora || new Date() 
        });

        await novaLeitura.save();

        res.status(201).json(novaLeitura);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar leitura: " + error.message });
    }
});

module.exports = router;