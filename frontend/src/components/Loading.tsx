import React, { FC } from "react";
import "../styles/Loading.css";

interface LoadingProps {
  message?: string;
}

const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <div className="w-full flex justify-center items-center my-10">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
