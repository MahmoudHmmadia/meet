import { IconType } from "react-icons";
type props = {
  Icon: IconType;
  content: string;
  bg: string;
  fn: () => void;
};
function Model({ Icon, content, bg, fn }: props) {
  return (
    <div
      className={`rounded-lg flex flex-col gap-3 cursor-pointer p-5 text-white items-center ${bg}`}
      onClick={fn}
    >
      <span className="text-5xl">
        <Icon />
      </span>
      <p className="uppercase tracking-wide text-center">{content}</p>
    </div>
  );
}

export default Model;
