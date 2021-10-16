import React, { FC } from "react";
import githubMark from "./../styles/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png";

const Header: FC = () => {
  return (
    <header className="fixed top-0 w-full m-auto max-w-5xl p-3 m-3 bg-background flex justify-between items-center text-white">
      <h1 className="font-extrabold text-2xl">Info Parser</h1>
      <button>
        <a href="https://github.com/Chetan-Satpute/InfoParser" target="_blank">
          <img src={githubMark} height="32" width="32" />
        </a>
      </button>
    </header>
  );
};

export default Header;
