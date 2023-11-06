import { useEffect, useRef } from "react";

function MyVideo({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current!.srcObject = stream;
  }, []);
  return <video ref={videoRef} autoPlay muted className="aspect-video" />;
}

export default MyVideo;
