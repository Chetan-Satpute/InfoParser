import React, { FC } from "react";
import Header from "../components/Header";

const Layout: FC = ({ children }) => {
  return (
    <div className="overflow-auto h-full p-2 no-scrollbar">
      <Header />
      <div className="w-full m-auto max-w-5xl mt-14">{children}</div>
    </div>
  );
};

export default Layout;
