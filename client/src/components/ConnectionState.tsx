import { useSocket } from "../context/socketProvider";

function ConnectionState() {
  const { isConnected } = useSocket();
  return (
    <div
      className={`absolute tex-sm p-2 flex justify-center text-white right-0 top-0 items-center w-fit
    ${isConnected ? "bg-green-500" : "bg-rose-600"}
    `}
    >
      {isConnected ? "Connected To Server" : "Connected Time Out"}
    </div>
  );
}

export default ConnectionState;
