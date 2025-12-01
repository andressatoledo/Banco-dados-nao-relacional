const mongoose = require('mongoose');
const { importarTemperaturaExterna } = require('./routes/clima');

const mongoUri = 'mongodb://localhost:27017/revisaobd3'; 

async function startImport() {
    try {
        await mongoose.connect(mongoUri);
        console.log("Conectado ao MongoDB para importação.");

        await importarTemperaturaExterna();

    } catch (error) {
        console.error("Ocorreu um erro no processo:", error.message);
    } finally {
    
        await mongoose.disconnect();
        console.log("Conexão com o MongoDB fechada.");
    }
}


startImport();
