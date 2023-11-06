import { AiTwotoneHome } from "react-icons/ai";
import { BsCameraVideoFill, BsChatSquareFill } from "react-icons/bs";
import { IoCall, IoPeople } from "react-icons/io5";
import AppContext from "../context/AppContext";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const { auth } = AppContext();
  return (
    <div className="flex flex-col gap-4 md:w-3/12 w-[20%] pt-10 self-stretch shadow-xl bg-white">
      <div className="overflow-hidden flex justify-center px-4">
        <img
          src={`${
            import.meta.env.VITE_STATE === "DEV"
              ? import.meta.env.VITE_DEV_URL
              : "api"
          }/assets/images/${auth?.userDetails.imageName}`}
          alt="PROFILE"
          className="rounded-full aspect-square object-cover"
          width={200}
        />
      </div>
      <h1 className="uppercase text-lg hidden sm:flex justify-center px-4">
        {auth?.userDetails.name}
      </h1>
      <ul className="links">
        <li>
          <NavLink
            to={"/"}
            className="p-4 uppercase flex items-center justify-center sm:justify-start gap-2 border-b border-b-gray-300 cursor-pointer transition-all hover:bg-main hover:text-white"
          >
            <span className="text-orange-400">
              <AiTwotoneHome />
            </span>
            <span className="sm:flex hidden">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/chats"}
            className="p-4 uppercase flex items-center justify-center sm:justify-start gap-2 border-b border-b-gray-300 cursor-pointer transition-all hover:bg-main hover:text-white"
          >
            <span className="text-orange-400">
              <BsChatSquareFill />
            </span>
            <span className="sm:flex hidden">chats</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/users"}
            className="p-4 uppercase flex items-center justify-center sm:justify-start gap-2 border-b border-b-gray-300 cursor-pointer transition-all hover:bg-main hover:text-white"
          >
            <span className="text-orange-400">
              <IoPeople />
            </span>
            <span className="sm:flex hidden">users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/calls"}
            className="p-4 uppercase flex items-center justify-center sm:justify-start gap-2 border-b border-b-gray-300 cursor-pointer transition-all hover:bg-main hover:text-white"
          >
            <span className="text-orange-400">
              <IoCall />
            </span>
            <span className="sm:flex hidden">calls</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/video-calls"}
            className="p-4 uppercase flex items-center justify-center sm:justify-start gap-2 cursor-pointer transition-all hover:bg-main hover:text-white"
          >
            <span className="text-orange-400">
              <BsCameraVideoFill />
            </span>
            <span className="sm:flex hidden">video calls</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
