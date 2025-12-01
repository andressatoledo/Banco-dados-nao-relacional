// mongoDevAluno.js
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";



const uri = "mongodb://devAluno:senha123@localhost:27017/clima_alerta";

// Definir esquema e modelo para a coleção 'leituras'
const leituraSchema = new mongoose.Schema({}, { strict: false });
const Leitura = mongoose.model("leituras", leituraSchema);

async function main() {
  try {

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conectado ao MongoDB como devAluno");

    // -----------------------------
    // Exportar coleção para JSON
    // -----------------------------
    const leituras = await Leitura.find().lean();
    fs.writeFileSync("leituras_backup.json", JSON.stringify(leituras, null, 2));
    console.log("✅ Coleção 'leituras' exportada para leituras_backup.json");

    // -----------------------------
    // Deletar coleção
    // -----------------------------
    await Leitura.collection.drop();
    console.log("✅ Coleção 'leituras' deletada");

    // -----------------------------
    // Restaurar a partir do arquivo JSON
    // -----------------------------
    const dadosRestaurar = JSON.parse(fs.readFileSync("leituras_backup.json"));
    await Leitura.insertMany(dadosRestaurar);
    console.log("✅ Coleção 'leituras' restaurada a partir do JSON");

    // -----------------------------
    // Teste de leitura com logs
    // -----------------------------
    const teste = await Leitura.find({}).limit(5);
    console.log("🔎 Primeiras 5 leituras:");
    console.log(teste);

  } catch (err) {
    console.error("❌ Erro:", err.message);
  } finally {
    // Fechar conexão
    await mongoose.disconnect();
    console.log("🔌 Conexão encerrada");
  }
}

main();
