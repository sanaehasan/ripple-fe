"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { getUserbyUsername } from "@/app/functions/api";

const LoginForm = () => {
  const { user, login, logout } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  console.log(username)
  const handleLogin = async () => {
    try {
      const validUser = await getUserbyUsername(username);
      console.log(validUser)
      if (validUser) {
        console.log("hi");
        login(username);
        setUsername("");
        setError(null);
      }
    } catch {
      setError("Invalid username, Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-component">
      {user ? (
        <>
          <span className="font-Quicksand text-black text-lg font-semibold flex justify-center text-center">
            WELCOME {user.username.toUpperCase()}
          </span>
          <button
            onClick={logout}
            className="font-Quicksand mt-4 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            className="text-black w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </>
      )}
    </div>
  );
};

export default LoginForm;