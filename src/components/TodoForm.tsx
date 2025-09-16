import type { ChangeEvent, MouseEvent } from "react";

type Props = {
  title: string;
  detail: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDetailChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancel?: () => void;
  isEdit?: boolean;
};

export const TodoForm = ({
  title,
  detail,
  onTitleChange,
  onDetailChange,
  onSubmit,
  onCancel,
  isEdit = false,
}: Props) => (
  <form>
    <div className="form-button">
      <button onClick={onSubmit}>
        {isEdit ? "保存" : "追加"}
      </button>
      {isEdit && onCancel && (
        <button onClick={onCancel}>
          キャンセル
        </button>
      )}
    </div>
    <div>
      <input type="text" value={title} placeholder="タスクを登録" onChange={onTitleChange} />
    </div>
    <div>
      <textarea rows={3} value={detail} placeholder="詳細を登録" onChange={onDetailChange} />
    </div>
  </form>
);
