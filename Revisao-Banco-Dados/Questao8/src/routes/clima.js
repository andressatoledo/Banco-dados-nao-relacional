const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const axios = require('axios');
const Clima = require('../model/clima'); 
 
const CIDADE = 'Jacarei,br'; 


async function importarTemperaturaExterna() {
    console.log(`Buscando dados de clima para ${CIDADE}...`);
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);

        const temperatura = response.data.main.temp;
        const descricao = response.data.weather[0].description;
        const dataRegistro = new Date();

       
        const novoRegistroClima = new Clima({
            local: CIDADE,
            temperatura: temperatura,
            unidade: 'Celsius',
            data_registro: dataRegistro,
            descricao: descricao
        });

        await novoRegistroClima.save();
        console.log("Registro de clima salvo com sucesso:", novoRegistroClima);
        return novoRegistroClima;

    } catch (error) {
        if (error.response) {
            console.error(`Erro na requisição: Status ${error.response.status}. Mensagem: ${error.response.data.message}`);
        } else {
            console.error("Erro ao consumir API ou salvar no BD:", error.message);
        }
        throw new Error("Falha ao importar temperatura.");
    }
}

module.exports = { importarTemperaturaExterna };