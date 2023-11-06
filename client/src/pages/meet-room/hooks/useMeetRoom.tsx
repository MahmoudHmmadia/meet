import Peer, { CallOption } from "peerjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../../context/socketProvider";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../../libs/apiCalls";
let currentPeer: undefined | RTCPeerConnection;
function useMeetRoom() {
  let peer: undefined | Peer;
  const { socket } = useSocket();
  const { meetCode } = useParams();
  const navigate = useNavigate();
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [admin, setAdmin] = useState("");
  const peers: CallOption = {};
  const meetQuery = useQuery({
    queryKey: ["meet"],
    queryFn: () => getMembers({ meetCode: meetCode ? meetCode : "" }),
  });

  // ==> FUNCTIONS <== //

  function start() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMyStream(stream);
        peer = peerInitialize();
        peer?.on("open", (id) => {
          socket.emit("room", id);
        });
        peer?.on("call", (call) => {
          currentPeer = call.peerConnection;
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId: string) => {
          if (peer) connectToNewUser(userId, stream, peer, peers);
        });
        socket.on("user-disconnected", (userId: string) => {
          if (peers[userId as keyof typeof peers])
            peers[userId as keyof typeof peers].close();
        });
      });
  }
  function toggleCamera(stream: MediaStream) {
    const camera = stream.getTracks().filter((e) => e.kind === "video")[0];
    camera.enabled ? (camera.enabled = false) : (camera.enabled = true);
    setCameraEnabled(camera.enabled);
  }
  function toggleMic(stream: MediaStream) {
    const mic = stream.getTracks().filter((e) => e.kind === "audio")[0];
    mic.enabled ? (mic.enabled = false) : (mic.enabled = true);
    setMicEnabled(mic.enabled);
  }
  function screenSharing() {
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          //@ts-ignore
          cursor: "always",
        },
        audio: false,
      })
      .then((stream) => {
        let videoTrack = stream.getTracks()[0];
        let sender = currentPeer?.getSenders().find((s) => {
          return s.track?.kind == videoTrack.kind;
        });
        sender?.replaceTrack(videoTrack);
      });
  }
  async function exitTheMeet() {
    myStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setMyStream(undefined);
    peer?.disconnect();
    socket.on("user-disconnected", (userId: string) => {
      if (peers[userId as keyof typeof peers])
        peers[userId as keyof typeof peers].close();
    });
    document.getElementById("videos")!.innerHTML = "";
    navigate("/");
  }

  // ==> EFFECTS <== //

  useEffect(() => {
    start();
    return () => {
      peer?.disconnect();
      peer = undefined;
      myStream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);
  useEffect(() => {
    if (meetQuery.data) setAdmin(meetQuery.data.admin);
  }, [meetQuery]);
  return {
    meetCode,
    myStream,
    toggleCamera,
    cameraEnabled,
    micEnabled,
    toggleMic,
    screenSharing,
    admin,
    exitTheMeet,
  };
}
export default useMeetRoom;
function connectToNewUser(
  userId: string,
  stream: MediaStream,
  peer: Peer,
  peers: CallOption
) {
  const call = peer.call(userId, stream);
  currentPeer = call.peerConnection;
  console.log(currentPeer);
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
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("relative");
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  // videoContainer.appendChild(video);
  // videoContainer.appendChild(helper);
  video.classList.add("the_video");
  document.getElementById("videos")?.append(video);
}
function peerInitialize() {
  const myPeer = new Peer({
    host: "meet-joybox.com",
    debug: 3,
    path: "api",
    secure: true,
    config: {
      iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "976776674d5e26c0b97dd685",
          credential: "dqwWyHCY+eCXcn8I",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "976776674d5e26c0b97dd685",
          credential: "dqwWyHCY+eCXcn8I",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "976776674d5e26c0b97dd685",
          credential: "dqwWyHCY+eCXcn8I",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "976776674d5e26c0b97dd685",
          credential: "dqwWyHCY+eCXcn8I",
        },
      ],
    },
  });
  return myPeer;
}
