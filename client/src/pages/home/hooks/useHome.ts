import { useState } from "react";

function useHome() {
  const [homeState, setHomeState] = useState<
    "default" | "new meet" | "balance" | "enjoy"
  >("default");

  return { homeState, setHomeState };
}
export default useHome;
