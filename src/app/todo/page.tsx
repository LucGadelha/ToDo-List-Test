'use client';
'use client';
import React, { useState } from "react";

const Page = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1); // Inicialmente nenhum item está sendo editado

  const adicionar = () => {
    if (task.trim() !== "") {
      if (editIndex !== -1) {
        // Se estamos editando um item
        const newTodos = [...todos];
        newTodos[editIndex] = task;
        setTodos(newTodos);
        setTask("");
        setEditIndex(-1); // Resetamos o índice de edição
      } else {
        setTodos([...todos, task]);
        setTask("");
      }
    }
  };

  const deletar = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editar = (index: number) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-start">
      <header className="text-3xl font-bold text-white w-full text-center shadow-lg p-4 bg-blue-900 mb-4">
        To Do List
      </header>
      <div className="w-full max-w-xl px-4">
        <section className="w-full mt-4 flex flex-col items-center">
          {editIndex === -1 && (
            <input
              className="bg-white shadow-lg text-center rounded-lg p-2 w-full mb-4"
              type="text"
              placeholder="Adicione uma tarefa..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          )}
          <button
            onClick={adicionar}
            className="bg-blue-600 shadow-lg rounded-lg p-2 mb-4 text-white font-semibold transition duration-200 hover:bg-blue-500 hover:text-gray-500 active:bg-green-400 active:text-gray-600 w-full"
          >
            {editIndex !== -1 ? "Salvar Edição" : "Adicionar Tarefa"}
          </button>
        </section>
      </div>
      <div className="w-full max-w-xl mt-4 py-4 px-4">
        {todos.map((todo, index) => (
          <div
            className="flex flex-row bg-slate-300 rounded-lg p-2 w-full mb-2 items-center justify-center shadow-lg"
            key={index}
          >
            <p className="text-slate-700 font-semibold bg-slate-300 w-2/3 text-center" style={{ textDecoration: todo.startsWith("~~") ? "line-through" : "none" }}>
              {editIndex === index ? (
                <input
                  className="bg-white text-center rounded-lg p-2 w-full"
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              ) : (
                todo.startsWith("~~") ? todo.slice(2) : todo
              )}
            </p>
            {editIndex !== index && (
              <button
                onClick={() => editar(index)}
                className="bg-blue-600 shadow-lg rounded-lg p-1 text-white font-semibold transition duration-200 hover:bg-white hover:text-gray-500 active:bg-gray-500 active:text-white mx-2"
              >
                Editar
              </button>
            )}
            {editIndex !== index && (
              <button
                onClick={() => deletar(index)}
                className="bg-blue-600 shadow-lg rounded-lg p-1 text-white font-semibold transition duration-200 hover:bg-white hover:text-red-600 active:bg-red-600 active:text-white"
              >
                Deletar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
