import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";
import { error } from "console";

connect()

export async function GET(req: NextRequest, res: NextResponse) {
    try{
        const todo = await Todo.find({})
        console.log(todo)
        return NextResponse.json({msg:" Encontrei todos os TODOS",success: true, todo })
    }
    catch{
        return NextResponse.json({ error:"Alguma coisa errada com o GET", success: false })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try{    
        const reqBody = await req.json()
        const {desc} = reqBody
        console.log(desc)

        const newTodo = new Todo({
            id: v4(),
            desc,
            completed: false
            })
            
        const savedTodo = await newTodo.save();
        return NextResponse.json({msg: "tarefa add", sucess: true, savedTodo})
    }
    catch (error) {
             return NextResponse.json({error: "Alguma coisa errada com o POST", success: false})
    }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
    try {
        await Todo.deleteMany({})
        return NextResponse.json({msg: "tarefas deletadas", sucess: true})
    } catch (error) {
        return NextResponse.json({msg: "Alguma coisa errada com o DELETE", success: false})
    }
}