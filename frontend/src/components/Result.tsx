import React, { FC } from "react";
import Card from "./Card";
import Table from "./Table";

export interface ResultInterface {
  tokens: string[];
  articleRanks: {
    name: string;
    rank: number;
  }[];
  sentenceRanks: {
    sent: string;
    rank: number;
    qtd: number;
  }[];
}

interface ResultProps {
  data: ResultInterface;
}

const Result: FC<ResultProps> = ({ data }) => {
  const { tokens, articleRanks, sentenceRanks } = data;

  return (
    <>
      <Card>
        <h1 className="text-2xl">Result</h1>
        <p className="mt-3 italic text-green-200">{sentenceRanks[0].sent}</p>
      </Card>
      <Card>
        <h1 className="text-2xl">Query Tokens</h1>
        <div className="p-3 mt-3">
          {tokens.map((token) => (
            <span className="rounded-lg bg-indigo-500 p-2 m-2 font-bold">
              {token}
            </span>
          ))}
        </div>
      </Card>
      <Card>
        <h1 className="text-2xl">Article Ranks</h1>
        <Table
          headers={["Topic", "Rank"]}
          rows={articleRanks.map(({ name, rank }) => [
            name,
            String(rank.toPrecision(5)),
          ])}
        />
      </Card>
      <Card>
        <h1 className="text-2xl">Sentence Ranks</h1>
        <Table
          headers={["Sentence", "Rank", "QTD"]}
          rows={sentenceRanks.map(({ sent, rank, qtd }) => [
            sent,
            String(rank.toPrecision(5)),
            String(qtd.toPrecision(5)),
          ])}
        />
      </Card>
    </>
  );
};

export default Result;

