import type { Todo } from "./TodoApp";
import React from "react";

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (id: string, newStatus: Todo["status"]) => void;
};

type StatusKey = "not-started" | "in-progress" | "completed";

const statusLabelMap: Record<StatusKey, string> = {
  "not-started": "未着手",
  "in-progress": "進行中",
  completed: "完了",
};

const statusOrder: Todo["status"][] = [
  "not-started",
  "in-progress",
  "completed",
];

const getNextStatus = (current: Todo["status"]): Todo["status"] => {
  const index = statusOrder.indexOf(current);
  if (index < statusOrder.length - 1) {
    return statusOrder[index + 1];
  }
  return current;
};

export const TodoItem = ({ todo, onEdit, onDelete, onStatusChange }: Props) => (
  <li>
    <div>
      <button
        className={`status-button ${todo.status}`}
        onClick={() => onStatusChange(todo.id, getNextStatus(todo.status))}
      >
        {statusLabelMap[todo.status]}
      </button>
      <h3 className={todo.status === "completed" ? "completed-title" : ""}>
        {todo.title}
      </h3>
      <button onClick={() => onEdit(todo)}>編集</button>
      <button onClick={() => onDelete(todo)}>削除</button>
    </div>
    <span>
      {todo.detail.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </span>
  </li>
);
