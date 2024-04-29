'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutAdmin from "@/components/LayoutAdmin";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";

const Page = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<{id: string, desc: string, completed: boolean}[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1); // Inicialmente nenhum item está sendo editado
  const [editTodoInfo, setEditTodoInfo] = useState({
    id:'',
    desc:'',
    completed:false
  });
  const [showAddInput, setShowAddInput] = useState(true);

  useEffect(() => {
    axios.get("/api/todo")
      .then((response: any) => {
        console.log(response);
        setTodos(response.data.todo || []);
      })
      .catch((error: any) => {
        console.error("Erro ao buscar dados:", error.response);
      });
  }, []);
  
  async function addTodo() {
    // Verifica se o campo de entrada não está vazio
    if (!task.trim()) {
      // Se estiver vazio, exibe uma mensagem de erro e retorna sem adicionar a tarefa
      console.error("O campo de adicionar tarefa não pode estar vazio.");
      return;
    }
  
    const data = {
      desc: task
    };
  
    try {
      const resp = await axios.post("/api/todo", data);
      console.log(resp);
      // Atualiza o estado todos com a nova tarefa
  
      setTodos(prevTodos => [...prevTodos, {id: resp.data.id, desc: task, completed: false}]); // Usa uma função de atualização para garantir que o estado anterior seja considerado
  
      // Limpa o campo de input após adicionar a tarefa
      setTask("");
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
      // Lida com o erro, se necessário
    }
  }
  
  async function clearTodos () {
    const resp = await axios.delete("/api/todo")
    console.log(resp.data)

    setTodos([]);
  }

  async function deleteTodo (todo: {id: string, desc: string, completed: boolean}) {
    const id = todo.id;   
  
    const resp = await axios.delete(`/api/todo/${id}`);
    console.log(resp.data);

    setTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));
  };

  async function editTodo (index:number, todo: {id: string, desc: string, completed: boolean}){
    setEditIndex(index);
    setEditTodoInfo({...todo});
    setShowAddInput(false); 
}

  async function updateTodo (){
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed
    };

    try {
      const resp = await axios.put(`/api/todo/${editTodoInfo.id}`, data);
      console.log(resp.data);
      
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id === editTodoInfo.id) {
            return {
              ...todo,
              desc: editTodoInfo.desc,
              completed: editTodoInfo.completed
            };
          }
          return todo;
        });
      });

      setEditIndex(-1);
      setShowAddInput(true);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  return (
    <LayoutAdmin>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
        <Header/>
        <Button
        onClick={() => signOut()}
        text="Sair"
        className="bg-red-600 text-white rounded px-3 py-1 cursor-pointer absolute top-4 right-10"/>

        <div className="w-full max-w-xl px-4">
          <section className="w-full mt-4 flex flex-col items-center">
            {showAddInput && ( // Renderização condicional para mostrar o input apenas quando showAddInput for verdadeiro
              <input
                className="bg-white shadow-lg text-center rounded-lg p-2 w-full mb-4"
                type="text"
                placeholder="Adicione uma tarefa..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            )}
            <button
              onClick={editIndex === -1 ? addTodo : updateTodo}
              className="bg-blue-600 shadow-lg rounded-lg p-2 mb-4 text-white font-semibold transition duration-200 hover:bg-blue-500 hover:text-gray-500 active:bg-green-400 active:text-gray-600 w-full"
            >
              {editIndex !== -1 ? "Salvar Edição" : "Adicionar Tarefa"}
            </button>
            {editIndex === -1 && (
              <button
                onClick={clearTodos}
                className="bg-blue-600 shadow-lg rounded-lg p-2 mb-4 text-white font-semibold transition duration-200 hover:bg-blue-500 hover:text-gray-500 active:bg-red-400 active:text-gray-600 w-full"
              >
                Limpar Tudo
              </button>
            )}
          </section>
        </div>
        <div className="w-full max-w-xl mt-4 py-4 px-4">
          {todos && todos.map((todo, index) => (
            <div
              className="flex flex-row bg-slate-300 rounded-lg p-2 w-full mb-2 items-center justify-center shadow-lg"
              key={index}
            >
              <p className="text-slate-700 font-semibold bg-slate-300 w-2/3 text-center" style={{textDecoration: editIndex === index ? "line-through" : "none" }}>
                {editIndex === index ? (
                  <input
                    className="bg-white text-center rounded-lg p-2 w-full"
                    type="text"
                    value={editTodoInfo.desc}
                    onChange={(e) => setEditTodoInfo({...editTodoInfo, desc: e.target.value})}
                  />
                ) : (
                  todo.desc
                )}
              </p>
              {editIndex !== index && (
                <button
                  onClick={() => editTodo(index, todo)}
                  className="bg-blue-600 shadow-lg rounded-lg p-1 text-white font-semibold transition duration-200 hover:bg-white hover:text-gray-500 active:bg-gray-500 active:text-white mx-2"
                >
                  Editar
                </button>
              )}
              {editIndex !== index && (
                <button
                  onClick={() => deleteTodo(todo)}
                  className="bg-blue-600 shadow-lg rounded-lg p-1 text-white font-semibold transition duration-200 hover:bg-white hover:text-red-600 active:bg-red-600 active:text-white"
                >
                  Deletar
                </button>
              )}
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    </LayoutAdmin>
  );
};

export default Page;
