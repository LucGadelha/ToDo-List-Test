import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on("connected", () => {
      console.log("Conexão com o banco de dados bem sucedida!");
    });
  } catch {
    console.log("Conexão com o banco de dados falhou!", error);
  }
}
