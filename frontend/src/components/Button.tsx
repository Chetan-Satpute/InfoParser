import React, { FC } from "react";

interface ButtonProps {
  lable: string;
  icon?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ lable, icon, onClick }) => {
  return (
    <button
      className="flex items-center p-3 w-full rounded border-2 border-blue-400 hover:bg-gray-800"
      onClick={onClick}
    >
      <span className="material-icons px-3">{icon}</span>
      {lable}
    </button>
  );
};

export default Button;
