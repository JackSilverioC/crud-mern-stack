import { useEffect } from "react";
import { UseTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = UseTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No hay tareas</h1>;

  return (
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl gap-2 w-full">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;
