import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io from "socket.io-client";
import { CallOption, Peer } from "peerjs";
interface context {
  myStream: undefined | MediaStream;
  setMyStream: Dispatch<SetStateAction<MediaStream | undefined>>;
  room: undefined | string;
  setRoom: Dispatch<SetStateAction<string | undefined>>;
  server: undefined | string;
  setServer: Dispatch<SetStateAction<string | undefined>>;
  connectState: undefined | string;
  setConnectState: Dispatch<SetStateAction<string | undefined>>;
  joinRoom: (id: string) => void;
  start: () => void;
  createServer: () => void;
}

const context = createContext<context>({
  myStream: undefined,
  setMyStream: () => {},
  connectState: undefined,
  setConnectState: () => {},
  room: undefined,
  setRoom: () => {},
  server: undefined,
  setServer: () => {},
  joinRoom: () => {},
  start: () => {},
  createServer: () => {},
});

const socket = io("http://localhost:5000");
export function Provider({ children }: { children: ReactNode }) {
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const [connectState, setConnectState] = useState<string | undefined>();
  const [room, setRoom] = useState<string | undefined>();
  const [server, setServer] = useState<string | undefined>();
  function joinRoom(id: string) {
    socket.emit("join-room", id);
  }
  function createServer() {
    socket.on("server", (data) => {
      setServer(data);
      console.log(data);
    });
  }
  useEffect(() => {
    socket.on("connected", (data) => {
      setConnectState(data);
    });
  }, []);
  function start() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMyStream(stream);
        const myPeer = new Peer({
          host: "localhost",
          port: 5000,
          // debug: 3,
        });
        const peers: CallOption = {};
        myPeer.on("open", (id) => {
          socket.emit("join-room", room, id);
        });
        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream, myPeer, peers);
        });
        socket.on("user-disconnected", (userId) => {
          if (peers[userId as keyof typeof peers])
            peers[userId as keyof typeof peers].close();
        });
      });
  }
  return (
    <context.Provider
      value={{
        myStream,
        setMyStream,
        connectState,
        setConnectState,
        room,
        setRoom,
        joinRoom,
        start,
        server,
        setServer,
        createServer,
      }}
    >
      {children}
    </context.Provider>
  );
}
export const SocketContext = () => useContext(context);
function connectToNewUser(
  userId: string,
  stream: MediaStream,
  peer: Peer,
  peers: CallOption
) {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userId as keyof typeof peers] = call;
}
function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  document.getElementById("videos")!.append(video);
}
