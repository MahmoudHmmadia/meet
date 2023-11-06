import { useEffect, useState } from "react";
import { useSocket } from "../../../context/socketProvider";
import { v4 as room } from "uuid";
import AppContext from "../../../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { newMeet } from "../../../libs/apiCalls";
function useInitialMeet() {
  const { auth, setAuth } = AppContext();
  const { socket } = useSocket();
  const [isCopied, setIsCopied] = useState(false);
  const roleMutation = useMutation({
    mutationFn: newMeet,
    onSuccess({ role, meetId, meetCode }) {
      if (auth) {
        setAuth({
          token: auth?.token,
          userDetails: {
            ...auth?.userDetails,
            role,
            meetId,
            meetCode,
          },
        });
      }
    },
  });
  function joinRoom() {
    socket.emit("get-code", room());
    socket.on("meet-code", (l: string) => {
      roleMutation.mutate({ id: auth!.userDetails.id, meetCode: l });
    });
  }
  function copy() {
    if (auth?.userDetails.meetCode.length)
      navigator.clipboard.writeText(auth?.userDetails.meetCode);
    setIsCopied(true);
  }
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);
  return { joinRoom, isCopied, copy };
}
export default useInitialMeet;
