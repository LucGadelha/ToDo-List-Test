import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { V4 } from "uuid";

connect()

export async function GET(req: NextRequest, res: NextResponse) {
    try{
        const todos = await Todo.find({})
        console.log(todos)
        return NextResponse.json({msg:" Found all todos",success: true, todos })
    }
    catch{
        return NextResponse.json({ error: "Something went wrong" })
    }
    }
