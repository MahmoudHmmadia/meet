import { useEffect, useRef } from "react";
import AppContext from "../context/AppContext";

function Video({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { auth } = AppContext();
  useEffect(() => {
    videoRef.current!.srcObject = stream;
  }, []);
  return <video ref={videoRef} autoPlay muted={true} />;
}

export default Video;
