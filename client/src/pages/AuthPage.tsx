import AuthForm from "../components/AuthForm.tsx";

export default function AuthPage() {
  return (
    <div className="mx-auto my-8 w-fit">
      <div className="mb-8 text-center">
        <h1>EzChat</h1>
        <p>Chatting made easy</p>
      </div>
      <AuthForm />
    </div>
  );
}
