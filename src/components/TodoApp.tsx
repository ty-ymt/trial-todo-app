import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm.tsx";
import { TodoItem } from "./TodoItem.tsx";

export type Todo = {
  id: string;
  title: string;
  detail: string;
  status: "未着手" | "進行中" | "完了";
};

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDetail, setTodoDetail] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [editId, setEditId] = useState<string>();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDetail, setNewDetail] = useState<string>("");
  const [filter, setFilter] = useState<string>("全て");
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
      status: "未着手",
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

  const handleEditTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
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

  const handleStatusChange = (
    id: string,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: e.target.value as Todo["status"] }
          : todo
      )
    );
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "未着手":
          setFilteredTodos(todos.filter((todo) => todo.status === "未着手"));
          break;
        case "進行中":
          setFilteredTodos(todos.filter((todo) => todo.status === "進行中"));
          break;
        case "完了":
          setFilteredTodos(todos.filter((todo) => todo.status === "完了"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
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

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="全て">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
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
    </>
  );
};
