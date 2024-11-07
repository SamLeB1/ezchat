import { useEffect, useState } from "react";

export default function AuthForm() {
  const [selectedForm, setSelectedForm] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
  }, [selectedForm]);

  if (selectedForm === "login")
    return (
      <form className="w-96 rounded-lg bg-white p-6 shadow">
        <div className="mb-6">
          <button
            className="w-1/2 rounded-2xl bg-blue-100 py-1 text-blue-900"
            type="button"
          >
            Log In
          </button>
          <button
            className="w-1/2 rounded-2xl py-1 hover:bg-blue-50"
            type="button"
            onClick={() => setSelectedForm("signup")}
          >
            Sign Up
          </button>
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
          value="Log In"
        />
      </form>
    );
  else
    return (
      <form className="w-96 rounded-lg bg-white p-6 shadow">
        <div className="mb-6">
          <button
            className="w-1/2 rounded-2xl py-1 hover:bg-blue-50"
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
        />
      </form>
    );
}
