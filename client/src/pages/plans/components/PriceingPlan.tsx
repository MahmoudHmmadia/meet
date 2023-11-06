import { BiDollar } from "react-icons/bi";
import { BsCameraVideoFill, BsPhone } from "react-icons/bs";
import { MdClose, MdOutlineStorage } from "react-icons/md";
import Button from "../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { chosePlan } from "../../../libs/apiCalls";
import AppContext from "../../../context/AppContext";

type props = {
  title: string;
  numberOfCalls: number;
  numberOfVideoCalls: number;
  numberOfBytes: number;
  price: number;
  color: string;
  bg: string;
};
function PricingPlan({
  color,
  numberOfBytes,
  numberOfCalls,
  numberOfVideoCalls,
  price,
  title,
  bg,
}: props) {
  const planMutation = useMutation({
    mutationFn: chosePlan,
    onSuccess: ({ plan }) => {
      if (auth) {
        setAuth({
          token: auth?.token,
          userDetails: {
            ...auth?.userDetails,
            plan: plan,
          },
        });
      }
      setIsRegister(false);
    },
  });
  const { auth, setAuth, setIsRegister } = AppContext();
  return (
    <div className="flex items-center gap-8 shadow-lg flex-col uppercase">
      <h1 className={`text-3xl p-4 ${bg} w-full text-center text-white`}>
        {title}
      </h1>
      <div className={`flex items-center p-4 ${color}`}>
        <span className="text-6xl font-bold">{price}</span>
        <span className="text-6xl font-bold">
          <BiDollar />
        </span>
        <span className="tex-sm opacity-75">/PER MONTH</span>
      </div>
      <ul className="flex flex-col text-xs w-full p-4">
        <li className="py-2 flex items-center gap-2 border-b-gray-300 border-b">
          <span>
            <BsCameraVideoFill />
          </span>
          <span>{numberOfVideoCalls}</span>
          <span>video call</span>
        </li>
        <li className="py-2 flex items-center gap-2 border-b-gray-300 border-b">
          <span>
            <BsPhone />
          </span>
          <span>{numberOfCalls}</span>
          <span>Audio call</span>
        </li>
        <li className="py-2 flex items-center gap-2 border-b-gray-300 border-b">
          <span>
            <MdOutlineStorage />
          </span>
          <span>{numberOfBytes}</span>
          <span>Gigabyte of storage</span>
        </li>
        <li className="py-2 flex items-center gap-2">
          <span>
            <MdClose />
          </span>
          <span>No Overages</span>
        </li>
      </ul>
      <div className="w-full p-4">
        <Button
          bg={bg}
          content="chose plan"
          fn={() => {
            if (auth)
              planMutation.mutate({ plan: title, id: auth?.userDetails.id });
          }}
        />
      </div>
    </div>
  );
}

export default PricingPlan;
