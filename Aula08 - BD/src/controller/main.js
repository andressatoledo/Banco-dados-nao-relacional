import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
console.log(process.env.USER);

const uri = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}?authSource=${process.env.DBNAME}`;


console.log(uri);
const leituraSchema = new mongoose.Schema({}, { strict: false });
const Leitura = mongoose.model("leituras", leituraSchema);

async function main() {
  try {

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const leituras = await Leitura.find().lean();
    fs.writeFileSync("leituras_backup.json", JSON.stringify(leituras, null, 2));
    console.log("Coleção 'leituras' exportada para leituras_backup.json");

    await Leitura.collection.drop();
    console.log("Coleção 'leituras' deletada");

    const dadosRestaurar = JSON.parse(fs.readFileSync("leituras_backup.json"));
    await Leitura.insertMany(dadosRestaurar);
    console.log("Coleção 'leituras' restaurada a partir do JSON");

    const teste = await Leitura.find({}).limit(5);
    console.log("Primeiras 5 leituras:");
    console.log(teste);

  } catch (err) {
    console.error("Erro:", err.message);
  } finally {

    await mongoose.disconnect();
    console.log("Conexão encerrada");
  }
}

main();
