import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../types/types";

interface context {
  auth: auth | undefined;
  setAuth: Dispatch<SetStateAction<auth | undefined>>;
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  isRegister: boolean;
}
const context = createContext<context>({
  auth: undefined,
  setAuth: () => {},
  setIsRegister: () => {},
  isRegister: false,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<auth | undefined>(undefined);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <context.Provider value={{ auth, setAuth, setIsRegister, isRegister }}>
      {children}
    </context.Provider>
  );
}
const AppContext = () => useContext(context);
export default AppContext;
