const mongoose = require('mongoose');


const LeituraSchema = new mongoose.Schema({
    carro: { 
        type: String, 
        required: true, 
        trim: true 
    },
    sensor: { 
        type: String, 
        required: true,
        enum: ['temperatura_motor', 'pressao_oleo', 'velocidade', 'combustivel'],
        trim: true 
    },
    valor: { 
        type: Number, 
        required: true,
        min: 0 
    },
    data_hora: { 
        type: Date, 
        default: Date.now 
    },
    status_sensor: { 
        type: String, 
        required: false 
    }
}, { 
    timestamps: true 
});

// Cria e exporta o Modelo
const Leitura = mongoose.model('Leitura', LeituraSchema);

module.exports = Leitura;