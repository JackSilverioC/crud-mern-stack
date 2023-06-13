import { useForm } from "react-hook-form";
import { UseTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { getTask, createTask, updateTask } = UseTasks();

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const newDate = dayjs(data.date).utc().format();
    if (newDate === "Invalid Date") {
      alert("La fecha ingresada es incorrecta");
      return;
    }
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: newDate
      });
    } else {
      createTask({
        ...data,
        date: newDate
      });
    }
    navigate("/tasks");
  });

  return (
    <div className="flex justify-center items-center  h-[calc(100vh-120px)]">
      <div className="max-w-md w-full">
        <div className="bg-zinc-800 w-full p-10 rounded-md">
          <h1 className="text-white text-2xl font-bold mb-5">
            {params.id ? "Editar tarea" : "Crear tarea"}
          </h1>
          <hr className="opacity-50 border-2 border-white mb-4" />
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-white font-bold mb-2"
              >
                Título:
              </label>
              <input
                type="text"
                placeholder="Nombre de la tarea"
                {...register("title")}
                autoFocus
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-white font-bold mb-2"
              >
                Descripción:
              </label>
              <textarea
                rows="3"
                placeholder="Descripción de la tarea"
                {...register("description")}
                style={{ resize: "none" }}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              ></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block text-white font-bold mb-2">
                Fecha:
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskFormPage;
