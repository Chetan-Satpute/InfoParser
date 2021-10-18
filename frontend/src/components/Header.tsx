import React, { FC } from "react";
import { Link } from "react-router-dom";
import githubMark from "./../styles/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png";

const Header: FC = () => {
  return (
    <header className="fixed top-0 w-full p-3 bg-background text-white">
      <div className="max-w-5xl m-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="font-extrabold text-3xl">Info Parser</h1>
        </Link>
        <button>
          <a
            href="https://github.com/Chetan-Satpute/InfoParser"
            target="_blank"
          >
            <img src={githubMark} height="32" width="32" />
          </a>
        </button>
      </div>
    </header>
  );
};

export default Header;
