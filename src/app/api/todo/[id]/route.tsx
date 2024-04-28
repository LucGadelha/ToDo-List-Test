import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";
import { error } from "console";

connect()

function getIdFromPathname(s: String) {
    let parts = s.split("/");
    return parts[parts.length - 1];
}

export async function GET(req: NextRequest, res: NextResponse) {
    try{
        const path = req.nextUrl.pathname
        const id = getIdFromPathname(path)
        console.log(id);
        
        const todo = await Todo.findOne({id})

        console.log(todo)

        return NextResponse.json({msg:" Encontrei todos os TODOS",success: true })
    }
    catch{
        return NextResponse.json({ error:"Alguma coisa errada com o GET", success: false })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname
        const id = getIdFromPathname(path)

        await Todo.deleteOne({id})

        return NextResponse.json({msg:"Tarefa Deletada!", success: true})
    } catch (error) {

        return NextResponse.json({msg:"Algum problema com Delete"}, {status: 500})
    }
    
}

export async function PUT(req:NextRequest) {
    try {
        const path = req.nextUrl.pathname
        const id = getIdFromPathname(path)

        const reqBody = await req.json()
        const {desc, completed} = reqBody

        await Todo.updateOne({id}, {desc, completed})

        return NextResponse.json({msg:"Tarefa Editada!", success: true})

    } catch (error) {
        return NextResponse.json({msg:"Algum problema com o PUT"}, {status: 500})
    
    }
}