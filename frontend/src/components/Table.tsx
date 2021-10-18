import React, { FC } from "react";

interface TableProps {
  headers: string[];
  rows: string[][];
}

const Table: FC<TableProps> = ({ headers, rows }) => {
  const head = (
    <thead>
      <tr>
        {headers.map((head) => (
          <th key={head}>{head}</th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {rows.map((row, index) => (
        <tr key={`row-${index}`}>
          {row.map((cell) => (
            <td key={`${row}-${cell}`}>{cell}</td>
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

export default Table;
