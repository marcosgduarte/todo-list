import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.svg";
import plus from "./assets/plus-sign.svg";
import Counter from "./components/Counter";
import NoTasks from "./components/NoTasks";
import TaskItem from "./components/TaskItem";

type Task = {
  id: string;
  createdAt: Date;
  title: string;
  isCompleted: boolean;
};

function App() {
  const storedTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") || "") : [];

  const [createdTasks, setCreatedTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskInputText, setTaskInputText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(storedTasks);

  const handleTaskInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInputText(event.target.value);
  };

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    setTasks([...tasks, { id: crypto.randomUUID(), createdAt: new Date(), title: taskInputText, isCompleted: false }]);
    setTaskInputText("");
  };

  const handleSetTaskCompleted = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  function handleDeleteTask(taskId: string) {
    if (window.confirm("Você tem certeza que deseja excluir essa tarefa?")) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  }

  useEffect(() => {
    const completedCount = tasks.filter((task) => task.isCompleted).length;
    setCompletedTasks(completedCount);
    setCreatedTasks(tasks.length);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, taskInputText]);

  return (
    <main>
      <div className="header">
        <img src={logo} alt="ToDo Logo" className="logo" />
      </div>
      <div className="add-task-container">
        <form className="add-task-form" onSubmit={handleCreateTask}>
          <input
            name="task-title"
            type="text"
            autoComplete="off"
            placeholder="Adicione uma nova tarefa"
            onChange={handleTaskInputTextChange}
            value={taskInputText}
            required
          />
          <button type="submit">
            Criar <img src={plus} alt="Criar Tarefa" />
          </button>
        </form>
      </div>
      <div className="tasks-container">
        <div className="tasks-header">
          <Counter caption="Tarefas criadas" value={`${createdTasks}`} />
          <Counter caption="Concluídas" value={`${completedTasks} de ${createdTasks}`} />
        </div>

        <div className="tasks-list">
          {createdTasks === 0 ? (
            <NoTasks />
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                taskId={task.id}
                title={task.title}
                completed={task.isCompleted}
                onSetCompleted={handleSetTaskCompleted}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
