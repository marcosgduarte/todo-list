import Clipboard from "../assets/clipboard.svg";
import styles from "./NoTasks.module.css";

export default function NoTasks() {
  return (
    <div className={styles.noTasks}>
      <img src={Clipboard} alt="Clipboard icon" width={56} height={56} />
      <p>
        Você ainda não tem tarefas cadastradas <br />
        <span>Crie tarefas e organize seus itens a fazer</span>
      </p>
    </div>
  );
}
