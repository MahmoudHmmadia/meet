import ConnectionState from "../../components/ConnectionState";
import useMeetRoom from "./hooks/useMeetRoom";
import MyVideo from "./components/MyVideo";
import ControllerBtn from "./components/ControllerBtn";
import AppContext from "../../context/AppContext";
import { BiChat } from "react-icons/bi";
import { MdScreenShare } from "react-icons/md";
import Button from "../../components/Button";

function MeetRoom() {
  const {
    myStream,
    toggleCamera,
    cameraEnabled,
    micEnabled,
    toggleMic,
    admin,
    exitTheMeet,
    screenSharing,
  } = useMeetRoom();
  const { auth } = AppContext();
  return (
    <div className="relative flex flex-col gap-2 justify-center items-center w-full h-full">
      {
        <div className="flex gap-2 items-center uppercase  font-bold md:text-2xl sm:text-xl text-sm flex-wrap ">
          <span className="text-alt">THE ADMIN OF TH MEET:</span>
          <span className="text-main">{admin}</span>
        </div>
      }
      {myStream && (
        <div className="flex justify-start w-full gap-2 flex-col">
          <div className="w-full bg-black relative justify-center flex">
            <ConnectionState />
            <MyVideo stream={myStream} />
            <div className="screen-sharing hidden left-0 top-0 absolute w-full h-full bg-black z-10"></div>
          </div>
          <div className="flex justify-center gap-2">
            <ControllerBtn
              enabled={cameraEnabled}
              toggle={toggleCamera}
              stream={myStream}
              type="camera"
            />
            <ControllerBtn
              enabled={micEnabled}
              toggle={toggleMic}
              stream={myStream}
              type="mic"
            />
            <div className="text-2xl aspect-square rounded-md text-white p-3 flex justify-center w-fit items-center cursor-pointer bg-orange-400">
              <BiChat />
            </div>
            <div
              className="text-2xl aspect-square rounded-md text-white p-3 flex justify-center w-fit items-center cursor-pointer bg-green-500"
              onClick={screenSharing}
            >
              <MdScreenShare />
            </div>
          </div>
        </div>
      )}
      <Button
        content="exit the meet"
        bg="bg-gray-600 text-white"
        fn={() => {
          stop();
          exitTheMeet();
        }}
      />
      <div
        id="videos"
        className="grid w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill , minmax(200px , 1fr))",
        }}
      ></div>
      <div className="screen-sharing  w-full h-full" id="screen_sharing"></div>
    </div>
  );
}

export default MeetRoom;
