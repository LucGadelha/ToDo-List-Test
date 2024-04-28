import mongoose from "mongoose";

async function connect() {
  try {
    // Conecta ao banco de dados
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on("connected", () => {
      console.log("Conexão com o banco de dados bem sucedida!");
    });
  } catch {
    // Caso ocorra algum erro, exibe a mensagem de erro no console
    console.log("Conexão com o banco de dados falhou!", error);
  }
}

export default connect;
