import AuthForm from "../components/AuthForm.tsx";

export default function AuthPage() {
  return (
    <div className="mx-auto my-8 w-fit">
      <div className="mb-4 w-96 rounded-lg bg-white p-2 text-center shadow">
        <h1 className="mb-1 text-4xl">EzChat</h1>
        <p className="text-lg">Chatting made easy</p>
      </div>
      <AuthForm />
    </div>
  );
}
