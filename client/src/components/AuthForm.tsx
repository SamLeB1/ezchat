import { FormEvent, useEffect, useState } from "react";
import useLogin from "../hooks/useLogin.tsx";
import useSignup from "../hooks/useSignup.tsx";

export default function AuthForm() {
  const [selectedForm, setSelectedForm] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading: isLoadingLogin, error: errorLogin } = useLogin();
  const {
    signup,
    isLoading: isLoadingSignup,
    error: errorSignup,
  } = useSignup();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await login(username, password);
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    await signup(email, username, password);
  }

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
  }, [selectedForm]);

  if (selectedForm === "login")
    return (
      <form
        className="w-96 rounded-lg bg-white p-6 shadow"
        onSubmit={handleLogin}
      >
        <div className="mb-6">
          <button
            className="w-1/2 rounded-2xl bg-blue-100 py-1 text-blue-900"
            type="button"
          >
            Log In
          </button>
          <button
            className="w-1/2 rounded-2xl py-1"
            type="button"
            onClick={() => setSelectedForm("signup")}
          >
            Sign Up
          </button>
        </div>
        {errorLogin && (
          <p className="mb-1 text-sm text-red-500">
            <b>Error:</b> {errorLogin.message}
          </p>
        )}
        <div className="mb-3">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input
          className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          type="submit"
          value="Log In"
          disabled={isLoadingLogin}
        />
      </form>
    );
  else
    return (
      <form
        className="w-96 rounded-lg bg-white p-6 shadow"
        onSubmit={handleSignup}
      >
        <div className="mb-6">
          <button
            className="w-1/2 rounded-2xl py-1"
            type="button"
            onClick={() => setSelectedForm("login")}
          >
            Log In
          </button>
          <button
            className="w-1/2 rounded-2xl bg-blue-100 py-1 text-blue-900"
            type="button"
          >
            Sign Up
          </button>
        </div>
        {errorSignup &&
          (errorSignup.message as string[]).map((m, i) => {
            return (
              <p key={i} className="mb-1 text-sm text-red-500">
                <b>Error:</b> {m}
              </p>
            );
          })}
        <div className="mb-3">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input
          className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          type="submit"
          value="Sign Up"
          disabled={isLoadingSignup}
        />
      </form>
    );
}
