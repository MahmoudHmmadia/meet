import { AiFillVideoCamera } from "react-icons/ai";
import Button from "../../../components/Button";
import { motion as m } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import BackToDefault from "./BackToDefault";
import HomeModelTitle from "./HomeModelTitle";
import useInitialMeet from "../hooks/useInitialMeet";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";
type props = {
  toggle: Dispatch<
    SetStateAction<"default" | "new meet" | "balance" | "enjoy">
  >;
};
function NewMeet({ toggle }: props) {
  const { joinRoom, copy, isCopied } = useInitialMeet();
  const { auth } = AppContext();
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 w-full justify-center lg:flex-row flex-col">
      <div className="image lg:text-[300px] sm:text-[200px] text-[150px] text-main">
        <AiFillVideoCamera />
      </div>
      <div className="flex flex-col gap-6 w-full sm:max-w-[500px] flex-1 items-center">
        <HomeModelTitle content="New Meet" />
        <div className="bg-white border-alt border sm:text-base text-xs p-1 rounded-md w-full justify-between relative flex gap-2 items-center">
          {isCopied && (
            <m.span
              className="absolute -top-10 text-xs rounded-md -right-5 bg-opacity-70 p-2 bg-green-500 text-white"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              text copied
            </m.span>
          )}
          {auth?.userDetails.meetCode.length! ? (
            <span className="">{auth?.userDetails.meetCode}</span>
          ) : (
            <span className="opacity-40">Meet Code</span>
          )}
          <div className="w-fit text-xs rounded-md overflow-hidden">
            <Button
              bg="bg-alt"
              content="copy link"
              fn={copy}
              disabled={auth?.userDetails.meetCode.length! > 0 ? false : true}
            />
          </div>
        </div>
        <div className="m-auto flex gap-2 w-full items-center">
          <Button
            bg="bg-alt"
            content={
              auth?.userDetails.meetCode.length! > 0
                ? "get new code"
                : "get meet code"
            }
            disabled={auth?.userDetails.meetCode.length! > 0 ? true : false}
            fn={joinRoom}
          />
          <Button
            bg="bg-main"
            content="go to meet room"
            disabled={auth?.userDetails.meetCode.length! > 0 ? false : true}
            fn={() => {
              navigate("/meet-room/" + auth?.userDetails.meetCode);
            }}
          />
        </div>
        <BackToDefault fn={() => toggle("default")} />
      </div>
    </div>
  );
}

export default NewMeet;
