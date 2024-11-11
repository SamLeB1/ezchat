import { createContext, useReducer } from "react";

type AuthState = {
  user: {
    token: string;
    _id: string;
    username: string;
  } | null;
};

type AuthLoginAction = {
  type: "LOGIN";
  payload: {
    token: string;
    _id: string;
    username: string;
  };
};

type AuthLogoutAction = {
  type: "LOGOUT";
};

type AuthAction = AuthLoginAction | AuthLogoutAction;

type AuthContextValue = {
  stateAuth: AuthState;
  dispatchAuth: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function reducerAuth(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stateAuth, dispatchAuth] = useReducer(reducerAuth, {
    user: JSON.parse(localStorage.getItem("user") as string),
  });

  return (
    <AuthContext.Provider value={{ stateAuth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
