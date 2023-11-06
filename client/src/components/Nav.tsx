import { BiSolidUserCircle } from "react-icons/bi";
import AppContext from "../context/AppContext";
import Container from "./Container";
import { IoLogOut, IoSettings } from "react-icons/io5";
function Nav() {
  const { auth, setAuth } = AppContext();
  return (
    <nav className="py-3 shadow-xl z-10">
      <Container>
        <div className="flex gap-4 justify-between w-full items-center">
          <div className="logo flex items-center gap-2">
            <img src="/logo1.png" alt="" width={50} />
            <h1 className="text-3xl font-semibold text-main tracking-wide">
              JOYBOX
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`py-2 px-4 uppercase text-white cursor-pointer ${
                auth?.userDetails.plan === "free"
                  ? "bg-alt"
                  : auth?.userDetails.plan === "premium"
                  ? "bg-orange-400"
                  : "bg-main"
              }`}
            >
              {auth?.userDetails.plan} plan
            </div>
            <div className=" text-alt cursor-pointer text-2xl">
              <BiSolidUserCircle />
            </div>
            <div className=" text-alt cursor-pointer text-2xl">
              <IoSettings />
            </div>
            <div
              className=" text-alt cursor-pointer text-2xl"
              onClick={() => setAuth(undefined)}
            >
              <IoLogOut />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Nav;
