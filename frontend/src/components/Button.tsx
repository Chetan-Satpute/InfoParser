import React, { FC } from "react";

interface ButtonProps {
  lable: string;
  icon?: string;
}

const Button: FC<ButtonProps> = ({ lable, icon }) => {
  return (
    <button className="flex items-center p-3 w-full rounded border-2 border-blue-400 hover:bg-gray-800">
      <span className="material-icons px-3">{icon}</span>
      {lable}
    </button>
  );
};

export default Button;
