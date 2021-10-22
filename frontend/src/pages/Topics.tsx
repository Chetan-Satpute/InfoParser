import React, { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Layout from "./Layout";
import Fuse from "fuse.js";
import { getData, IPassage, ITopic, newPassage } from "../utils/apiRequest";
import Loading from "../components/Loading";
import Passage from "../components/Passage";
import Card from "../components/Card";

const Topics: FC = () => {
  const [loading, setLoading] = useState(true);

  const [fuzzyTopics, setFuzzyTopics] = useState<ITopic[]>([]);
  const [fuse] = useState(new Fuse<ITopic>([]));

  const [passages, setPassages] = useState<IPassage[]>();
  const [topic, setTopic] = useState<ITopic>();

  useEffect(() => {
    const request = async () => {
      const topics = (await getData<{ topics: ITopic[] }>("/topic")).topics;

      fuse.setCollection(topics);
      setFuzzyTopics(topics);

      setLoading(false);
    };

    request();
  }, []);

  const loadPassages = async (topic: ITopic) => {
    setLoading(true);
    setTopic(topic);

    const passages = (
      await getData<{ passages: IPassage[] }>(`/passage/?topic=${topic.title}`)
    ).passages;

    setPassages(passages);
    setLoading(false);
  };

  const reloadPassages = async () => {
    await loadPassages(topic);
  };

  const fuzzyFind = (query: string) => {
    setPassages(undefined);

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
        <>
          {passages ? (
            <>
              {passages.map((passage) => (
                <Passage
                  id={passage.id}
                  content={passage.content}
                  topic={passage.topic}
                  reload={reloadPassages}
                />
              ))}

              <Card>
                <Button
                  lable="New Passage"
                  icon="view_headline"
                  onClick={async () => {
                    setLoading(true);
                    await newPassage(topic.id);
                    await reloadPassages();
                    setLoading(false);
                  }}
                />
              </Card>
            </>
          ) : (
            <ul className="text-white mt-5">
              {fuzzyTopics.map((topic) => (
                <li className="m-1" key={topic.title}>
                  <Button
                    lable={topic.title}
                    icon="topic"
                    onClick={() => loadPassages(topic)}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Layout>
  );
};

export default Topics;
