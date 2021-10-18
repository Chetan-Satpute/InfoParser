import React, { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Layout from "./Layout";
import Fuse from "fuse.js";
import { getTopics } from "../utils/apiRequest";
import Loading from "../components/Loading";

const Topics: FC = () => {
  const [fuzzyTopics, setFuzzyTopics] = useState<string[]>([]);
  const [fuse] = useState(new Fuse<string>([]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      const topics = (await getTopics()) as string[];

      fuse.setCollection(topics);
      setFuzzyTopics(topics);

      setLoading(false);
    };

    request();
  }, []);

  const fuzzyFind = (query: string) => {
    if (query === "") {
      setFuzzyTopics([...fuse.getCollection()]);
    } else {
      const fuzzyTopics = fuse.search(query).map(({ item }) => item);
      setFuzzyTopics(fuzzyTopics);
    }
  };

  return (
    <Layout>

      <SearchBox placeholder="Search Topic" liveQuery={fuzzyFind} />

      {loading ? (
        <Loading />
      ) : (
        <ul className="text-white mt-5">
          {fuzzyTopics.map((topic) => (
            <li className="m-1" key={topic}>
              <Button lable={topic} icon="topic" />
            </li>
          ))}
        </ul>
      )}

    </Layout>
  );
};

export default Topics;
