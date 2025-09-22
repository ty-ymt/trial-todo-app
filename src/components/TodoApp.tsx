import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

export type Todo = {
  id: string;
  title: string;
  detail: string;
  status: "not-started" | "in-progress" | "completed"
};

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDetail, setTodoDetail] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [editId, setEditId] = useState<string>();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDetail, setNewDetail] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleAddTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleAddDetailChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDetail(e.target.value);
  };

  // const resetFormInput = () => {
  //   setTodoTitle("");
  //   setTodoDetail("");
  // };

  const handleAddTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (todoTitle.trim() === "") return;

    const newTodo: Todo = {
      id: uuidv4(),
      title: todoTitle,
      detail: todoDetail,
      status: "not-started",
    };
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDetail("");
    // resetFormInput()
  };

  const handleEditTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleEditDetailChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDetail(e.target.value);
  };

  const handleEditTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: newTitle, detail: newDetail }
          : todo
      )
    );
    setNewTitle("");
    setNewDetail("");
    handleCloseEditForm();
  };

  const handleDeleteTodo = (targetTodo: Todo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  const handleOpenEditForm = ({ id, title, detail }: Todo) => {
    setIsEditable(true);
    setEditId(id);
    setNewTitle(title);
    setNewDetail(detail);
  };

  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId(undefined);
  };

  const handleStatusChange = (id: string, newStatus: Todo["status"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "not-started":
          setFilteredTodos(todos.filter((todo) => todo.status === "not-started"));
          break;
        case "in-progress":
          setFilteredTodos(todos.filter((todo) => todo.status === "in-progress"));
          break;
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.status === "completed"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <div className="todo-app">
      <h1>ToDo App</h1>

      {isEditable ? (
        <TodoForm
          title={newTitle}
          detail={newDetail}
          onTitleChange={handleEditTitleChanges}
          onDetailChange={handleEditDetailChanges}
          onSubmit={handleEditTodo}
          onCancel={handleCloseEditForm}
          isEdit
        />
      ) : (
        <TodoForm
          title={todoTitle}
          detail={todoDetail}
          onTitleChange={handleAddTitleChanges}
          onDetailChange={handleAddDetailChanges}
          onSubmit={handleAddTodo}
        />
      )}

      <select
        className="filter-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">全て</option>
        <option value="not-started">未着手</option>
        <option value="in-progress">進行中</option>
        <option value="completed">完了</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleOpenEditForm}
            onDelete={handleDeleteTodo}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
};
