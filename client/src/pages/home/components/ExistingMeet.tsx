import { BsPeopleFill } from "react-icons/bs";
import BackToDefault from "./BackToDefault";
import Button from "../../../components/Button";
import { Dispatch, SetStateAction } from "react";
import useExistingMeet from "../hooks/useExistingMeet";
type props = {
  toggle: Dispatch<
    SetStateAction<"default" | "new meet" | "balance" | "enjoy">
  >;
};
function ExistingMeet({ toggle }: props) {
  const { handleValid, inputRef, join, serverError, valid } = useExistingMeet();
  return (
    <div className="flex items-center gap-4 justify-center w-full">
      <div className="image lg:text-[300px] sm:text-[200px] text-[150px] text-main">
        <BsPeopleFill />
      </div>
      <div className="flex flex-col gap-6 max-w-[500px] flex-1 items-center">
        {serverError && (
          <h1 className="text-rose-700 text-xl uppercase text-center">
            {serverError}
          </h1>
        )}
        <input
          type="text"
          className="p-2 border border-alt w-full"
          placeholder="meet code"
          ref={inputRef}
          onChange={handleValid}
        />
        <div className="m-auto flex gap-2 w-full items-center">
          <Button
            bg="bg-alt"
            content={"go to meet room"}
            disabled={!valid}
            fn={join}
          />
        </div>
        <BackToDefault fn={() => toggle("default")} />
      </div>
    </div>
  );
}

export default ExistingMeet;
