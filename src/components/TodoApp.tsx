import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  title: string;
  detail: string;
  status: "未完了" | "進行中" | "完了";
};

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDetail, setTodoDetail] = useState<string>("");

  const [editId, setEditId] = useState<string>();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDetail, setNewDetail] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleAddTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (todoTitle.trim() === "") return;

    const newTodo: Todo = {
      id: uuidv4(),
      title: todoTitle,
      detail: todoDetail,
      status: "未完了",
    };
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDetail("");
  };

  const handleDeleteTodo = (targetTodo: Todo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  const handleEditTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: newTitle, detail: newDetail }
          : todo
      )
    );
  };

  const handleStatusChange = ({ id }, e) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleDetailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDetail(e.target.value);
  };

  return (
    <>
      <h1>ToDo App</h1>
      <form>
        <div>
          <input type="text" value={todoTitle} onChange={handleTitleChange} />
          <button onClick={handleAddTodo}>追加</button>
        </div>
        <div>
          <textarea rows={3} value={todoDetail} onChange={handleDetailChange} />
        </div>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(todo, e)}
              >
                <option value="未着手">未着手</option>
                <option value="進行中">進行中</option>
                <option value="完了">完了</option>
              </select>
              <span>{todo.title}</span>
              <button
                onClick={() => {
                  handleEditTodo;
                }}
              >
                編集
              </button>
              <button
                onClick={() => {
                  handleDeleteTodo(todo);
                }}
              >
                削除
              </button>
            </div>
            <span>{todo.detail}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
