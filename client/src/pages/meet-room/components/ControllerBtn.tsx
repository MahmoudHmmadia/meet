import {
  BiCamera,
  BiCameraOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
type props = {
  toggle: (stream: MediaStream) => void;
  enabled: boolean;
  stream: MediaStream;
  type: "camera" | "mic";
};
function ControllerBtn({ toggle, enabled, stream, type }: props) {
  return (
    <div
      className={`text-2xl text-white p-3 flex justify-center w-fit items-center cursor-pointer rounded-md aspect-square ${
        !enabled ? " bg-alt" : type == "camera" ? "bg-main" : "bg-rose-500"
      }`}
      onClick={() => toggle(stream)}
    >
      {type === "camera" ? (
        <>{enabled ? <BiCamera /> : <BiCameraOff />}</>
      ) : (
        <>{enabled ? <BiMicrophone /> : <BiMicrophoneOff />}</>
      )}
    </div>
  );
}

export default ControllerBtn;
