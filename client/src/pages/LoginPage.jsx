import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { signIn, errors: loginErrors, isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <div className=" bg-zinc-800  max-w-md w-full p-10 rounded-md flex flex-col gap-5">
        {loginErrors.map((error, index) => {
          return (
            <div
              key={index}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md  "
            >
              {error}
            </div>
          );
        })}
        <h1 className="text-white text-center text-4xl font-bold">Login</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
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
            Acceder
          </button>
        </form>
        <p className="text-white text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
