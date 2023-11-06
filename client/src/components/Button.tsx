type props = {
  content: string;
  bg: string;
  fn?: () => void;
  disabled?: boolean;
};
function Button({ bg, content, fn, disabled }: props) {
  return (
    <button
      className={`cursor-pointer p-2 tracking-wide sm:text-base text-xs uppercase transition-all w-full hover:scale-95 text-white ${bg} ${
        disabled && "opacity-70 pointer-events-none"
      }`}
      onClick={fn}
    >
      {content}
    </button>
  );
}

export default Button;
