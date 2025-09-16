import type { ChangeEvent } from "react";
import type { Todo } from "./TodoApp";

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (id: string, e: ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoItem = ({ todo, onEdit, onDelete, onStatusChange }: Props) => (
  <li>
    <div>
      <select value={todo.status} onChange={(e) => onStatusChange(todo.id, e)}>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <span>{todo.title}</span>
      <button onClick={() => onEdit(todo)}>編集</button>
      <button onClick={() => onDelete(todo)}>削除</button>
    </div>
    <span>{todo.detail}</span>
  </li>
);
