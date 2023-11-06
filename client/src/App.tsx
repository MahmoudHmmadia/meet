import AppContext from "./context/AppContext";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { SocketProvider } from "./context/socketProvider";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
function App() {
  // useEffect(() => {
  // const myPeer = new Peer({
  //   host: "meet-joybox.com",
  //   debug: 3,
  //   path: "api",
  //   secure: true,
  //   config: {
  //     iceServers: [
  //       {
  //         urls: "stun:stun.relay.metered.ca:80",
  //       },
  //       {
  //         urls: "turn:a.relay.metered.ca:80",
  //         username: "976776674d5e26c0b97dd685",
  //         credential: "dqwWyHCY+eCXcn8I",
  //       },
  //       {
  //         urls: "turn:a.relay.metered.ca:80?transport=tcp",
  //         username: "976776674d5e26c0b97dd685",
  //         credential: "dqwWyHCY+eCXcn8I",
  //       },
  //       {
  //         urls: "turn:a.relay.metered.ca:443",
  //         username: "976776674d5e26c0b97dd685",
  //         credential: "dqwWyHCY+eCXcn8I",
  //       },
  //       {
  //         urls: "turn:a.relay.metered.ca:443?transport=tcp",
  //         username: "976776674d5e26c0b97dd685",
  //         credential: "dqwWyHCY+eCXcn8I",
  //       },
  //     ],
  //   },
  // });
  // }, []);
  const { auth, isRegister } = AppContext();
  return (
    <div className="app bg-gradient_cloudy flex flex-col w-full h-full min-h-screen overflow-hidden">
      {/* <Helmet>
        <link rel="icon" href="/logo1.png" />
        <title>MEET JOYBOX</title>
      </Helmet> */}
      {auth ? (
        <SocketProvider>
          <Nav />
          <div className="flex w-full flex-1">
            {!isRegister && <Sidebar />}
            <div className="flex-1 p-6 justify-center items-center flex">
              <ProtectedRoutes />
            </div>
          </div>
        </SocketProvider>
      ) : (
        <PublicRoutes />
      )}
    </div>
  );
}

export default App;
