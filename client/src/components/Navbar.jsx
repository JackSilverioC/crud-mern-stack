import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = UseAuth();

  return (
    <div className="pt-4">
      <nav className="bg-indigo-600 text-white flex justify-between rounded-md px-10 py-4">
        <Link to={isAuthenticated ? "/tasks" : "/"}>
          <h1 className="text-2xl font-bold hover:text-indigo-200">
            Task Manager
          </h1>
        </Link>
        <ul className="flex justify-between items-center gap-4">
          {isAuthenticated ? (
            <>
              <li>Bienvenido {user.username} </li>
              <Link to={"/add-task"}>
                <li className="bg-indigo-500 hover:bg-green-600 hover:text-white font-bold px-2 py-1 rounded-md">
                  Añadir Tarea
                </li>
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  logout();
                }}
              >
                <li className="bg-indigo-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded-md">
                  Cerrar Sesión
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <li className="bg-slate-100 text-indigo-600 font-bold hover:text-indigo-300 px-2 py-1 rounded-md">
                  Login
                </li>
              </Link>
              <Link to={"/register"}>
                <li className="hover:bg-slate-100 font-bold hover:text-indigo-300 px-2 py-1 rounded-md">
                  Registrar
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
