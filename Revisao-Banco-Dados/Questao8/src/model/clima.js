const mongoose = require('mongoose');

const ClimaSchema = new mongoose.Schema({
    local: { 
        type: String, 
        required: true 
    },
    temperatura: { 
        type: Number, 
        required: true 
    },
    unidade: { 
        type: String, 
        default: 'Celsius' 
    },
    data_registro: { 
        type: Date, 
        default: Date.now 
    },
    descricao: { 
        type: String 
    }
});

const Clima = mongoose.model('Clima', ClimaSchema);

module.exports = Clima;