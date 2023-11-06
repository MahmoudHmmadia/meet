import { useMutation } from "@tanstack/react-query";
import { joinMeet } from "../../../libs/apiCalls";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/socketProvider";
import AppContext from "../../../context/AppContext";

function useExistingMeet() {
  const { socket } = useSocket();
  const { auth, setAuth } = AppContext();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  function handleValid() {
    if (inputRef.current?.value) {
      setValid(true);
    } else {
      setValid(false);
    }
  }
  const meetMutation = useMutation({
    mutationFn: joinMeet,
    onSuccess({ data: { role, meetId } }) {
      setServerError(undefined);
      if (auth) {
        setAuth({
          token: auth?.token,
          userDetails: {
            ...auth?.userDetails,
            role,
            meetId,
          },
        });
        setServerError(undefined);
        socket.emit("get-code", inputRef.current?.value);
        navigate("/meet-room/" + inputRef.current?.value);
      }
    },
    onError({ response }) {
      setServerError(response.data.message);
    },
  });
  async function join() {
    if (auth)
      await meetMutation.mutateAsync({
        userId: auth?.userDetails.id,
        meetCode: inputRef.current!.value,
      });
  }

  return { inputRef, join, serverError, handleValid, valid };
}
export default useExistingMeet;
