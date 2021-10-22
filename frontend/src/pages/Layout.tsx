import React, { FC } from "react";
import Header from "../components/Header";

const Layout: FC = ({ children }) => {
  return (
    <div className="overflow-auto h-full no-scrollbar">
      <Header />
      <div className="w-full m-auto max-w-5xl mt-16 p-2 text-white">{children}</div>
    </div>
  );
};

export default Layout;
