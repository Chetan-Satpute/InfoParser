import React, { FC, ReactElement } from "react";

interface CardProps {
  data: string | { headers: string[]; rows: string[][] };
}

const Card: FC<CardProps> = ({ data }) => {
  let value: ReactElement<HTMLParagraphElement | HTMLCanvasElement>;

  if (typeof data === "string") {
    value = <p>{data}</p>;
  } else {
    value = getTable(data.headers, data.rows);
  }

  return <div className="my-5 p-5 text-white rounded-lg card">{value}</div>;
};

export default Card;

const getTable = (headers: string[], rows: string[][]) => {
  const head = (
    <thead>
      <tr>
        {headers.map((head) => (
          <th>{head}</th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {rows.map((row) => (
        <tr>
          {row.map((cell) => (
            <td>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table>
      {head}
      {body}
    </table>
  );
};
