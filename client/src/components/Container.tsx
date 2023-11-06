import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="container lg:px-20 md:px-12 px-5 m-auto flex-1 flex">
      {children}
    </div>
  );
}

export default Container;
