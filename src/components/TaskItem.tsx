import Checkbox from "./Checkbox";
import style from "./TaskItem.module.css";
import Trash from "../assets/trash.svg";

interface TaskItemProps {
  taskId: string;
  title: string;
  completed: boolean;
  onSetCompleted: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
}

export default function Task({ taskId, title, completed, onSetCompleted, onDelete }: TaskItemProps) {
  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSetCompleted(taskId, event.target.checked);
  }

  function handleDeleteClick() {
    onDelete(taskId);
  }

  return (
    <div className={completed ? style.taskCompleted : style.taskUncompleted}>
      <Checkbox checked={completed} onChange={handleCheckBoxChange} />
      <p className={style.taskTitle}>{title}</p>
      <img src={Trash} alt="Trash" className={style.trashIcon} onClick={handleDeleteClick} />
    </div>
  );
}
