import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signUp, isAuthenticated, errors: RegisterErrors } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
  });

  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center">
      <div className=" bg-zinc-800 w-full max-w-md p-10 rounded-md flex flex-col gap-5 justify-center items-center">
        {RegisterErrors.map((error, index) => {
          return (
            <div
              key={index}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md  "
            >
              {error}
            </div>
          );
        })}
        <h1 className="text-white text-center text-4xl font-bold">
          Regístrate
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
          <input
            type="text"
            {...register("username", {
              required: true
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <p className="text-red-500 -mt-5">*Este campo es requerido</p>
          )}
          <input
            type="email"
            {...register("email", {
              required: true
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md "
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 -mt-5">*Este campo es requerido</p>
          )}
          <input
            type="password"
            {...register("password", {
              required: true
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md "
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 -mt-5">*Este campo es requerido</p>
          )}
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md  hover:bg-indigo-600 transition-colors"
          >
            Registrar
          </button>
        </form>
        <p className="text-white text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline ">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
