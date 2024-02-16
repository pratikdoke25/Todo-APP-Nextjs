"use client"
import axios from "axios";
import { useState, useEffect } from "react";

interface Todo {
  id: string;
  desc: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [edit, setEdit] = useState<Todo>({
    id: "",
    desc: "",
    completed: false,
  });

  useEffect(() => {
    // Call the function
    axios.get("/api/todos").then((response) => {
      console.log(response.data);
      setTodos(response.data.todos);
    });
  }, []);

  async function addTodo() {
    const data = {
      desc: inputText,
    };

    const resp = await axios.post("/api/todos", data);
    console.log(resp);

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: resp.data.id, desc: inputText, completed: false },
    ]);
  }

  async function clearTodo() {
    const resp = await axios.delete("/api/todos");
    console.log(resp.data);
    setTodos([]);
  }

  async function deleteTodo(todo: Todo) {
    const id = todo.id;
    const resp = await axios.delete(`/api/todos/${id}`);
    console.log(resp.data);
  }

  async function editTodo(todo: Todo) {
    setEditMode(true);

    setEdit({
      id: todo.id,
      desc: todo.desc,
      completed: todo.completed,
    });
  }

  async function updateTodo() {
    const data = {
      desc: edit.desc,
      completed: edit.completed,
    };

    const resp = await axios.put(`/api/todos/${edit.id}`, data);
    console.log(resp);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
        <div className="text-2xl">Edit Todo</div>
        <div className="flex gap-4">
          <div className="text-lg ">Edit desc:</div>
          <input
            type="text"
            value={edit.desc}
            onChange={(e) => setEdit({ ...edit, desc: e.target.value })}
            placeholder="Enter new desc"
            className="rounded-md shadow-md text-lg"
          />
        </div>
        <div className="flex gap-4">
          <div className="text-lg">Edit Completed:</div>
          <input
            type="checkbox"
            checked={edit.completed}
            onChange={(e) =>
              setEdit({ ...edit, completed: !edit.completed })
            }
          />
        </div>
        <button
          onClick={updateTodo}
          className="text-xl shadow-md bg-blue-600 hover:bg-blue-500 rounded-md px-3 py-1"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List Next</div>
      <div className="flex gap-2">
        <input
          type="text"
          className="text-xl rounded-md shadow-md"
          placeholder="Enter todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="text-xl shadow-md bg-blue-600 hover:bg-blue-500 rounded-md px-3 py-1"
        >
          Add
        </button>
        <button
          onClick={clearTodo}
          className="text-xl shadow-md bg-grey-600 hover:bg-grey-500 rounded-md px-3 py-1"
        >
          Clear
        </button>
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((todo, index) => (
          <div
            className="bg-violet-600 flex justify-between items-center p-2 rounded-md shadow-lg"
            key={index}
          >
            <div className="flex gap-2">
              <input type="checkbox" checked={todo.completed} />
              <div className="text-lg text-white">{todo.desc}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editTodo(todo)}
                className="text-xl shadow-md bg-green-600 hover:bg-green-500 rounded-md px-1"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo)}
                className="text-xl shadow-md bg-red-600 hover:bg-red-500 rounded-md px-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
