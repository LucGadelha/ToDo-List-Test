import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  // Cria o schema para login
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true } // Cria os campos createdAt e updateAt automaticamente
);

const modelName = mongoose.models.User || mongoose.model("User", userSchema);

export default modelName;
