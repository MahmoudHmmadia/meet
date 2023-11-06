function HomeModelTitle({ content }: { content: string }) {
  return (
    <h1 className="sm:text-5xl text-3xl text-alt font-bold relative">
      <span className="uppercase">{content}</span>
      <span className="absolute w-1/3 h-[3px] left-0 -bottom-2 bg-main"></span>
    </h1>
  );
}

export default HomeModelTitle;
