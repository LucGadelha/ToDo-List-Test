import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connect from "@/dbConfig/db.js";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    await connect();

    const emailExists = await User.findOne({ email });

    if (emailExists)
      return NextResponse.json({
        message: "Email ja cadastrado",
        status: 409,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Ocorreu um erro ao cadastrar o usuário",
      status: 500,
    });
  }
}
