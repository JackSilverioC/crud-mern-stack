import { UseTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = UseTasks();

  return (
    <div className="w-full bg-zinc-700 p-4 rounded-md">
      <header className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-2 text-sm">
          <button
            className="bg-red-500 px-2 py-1 rounded-md text-white hover:bg-red-600"
            onClick={() => deleteTask(task._id)}
          >
            Borrar
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-green-600 px-2 py-1 rounded-md text-white hover:bg-green-700"
          >
            Editar
          </Link>
        </div>
      </header>

      <p className="text-slate-300 text-sm">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
