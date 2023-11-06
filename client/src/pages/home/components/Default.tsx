import Model from "./Model";
import { AiFillVideoCamera } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import AppContext from "../../../context/AppContext";
import { Dispatch, SetStateAction } from "react";
type props = {
  toggle: Dispatch<
    SetStateAction<"default" | "new meet" | "balance" | "enjoy">
  >;
};
function Default({ toggle }: props) {
  const { auth } = AppContext();
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <div className="image mb-5">
        <img
          src={`/logo2.png`}
          alt="PROFILE IMAGE"
          className="object-cover max-w-[200px]"
        />
      </div>
      <div
        className="grid gap-3 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
        }}
      >
        <Model
          Icon={AiFillVideoCamera}
          bg="bg-gradient_sky"
          content="Start new meet"
          fn={() => toggle("new meet")}
        />
        <Model
          Icon={BsPeopleFill}
          bg="bg-alt"
          content="join existing meet"
          fn={() => toggle("enjoy")}
        />
        <Model
          Icon={FaMoneyBill}
          bg="bg-orange-600"
          content="View your remaining balance"
          fn={() => toggle("balance")}
        />
      </div>
    </div>
  );
}

export default Default;
