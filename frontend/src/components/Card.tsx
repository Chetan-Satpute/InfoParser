import React, { FC } from "react";

const Card: FC = ({ children }) => {
  return <div className="my-5 p-5 text-white rounded-lg card">{children}</div>;
};

export default Card;
