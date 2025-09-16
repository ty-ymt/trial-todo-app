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
    <div>
      <input type="text" value={title} onChange={onTitleChange} />
      <button onClick={onSubmit}>{isEdit ? "保存" : "追加"}</button>
      {isEdit && onCancel && <button onClick={onCancel}>キャンセル</button>}
    </div>
    <div>
      <textarea rows={3} value={detail} onChange={onDetailChange} />
    </div>
  </form>
);
