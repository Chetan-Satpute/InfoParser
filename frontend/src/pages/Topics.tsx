import React, { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "./Layout";
import { getData, IPassage, ITopic, newPassage } from "../utils/apiRequest";
import Loading from "../components/Loading";
import Passage from "../components/Passage";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Topics: FC = () => {
  const [loading, setLoading] = useState(true);

  const [fuzzyTopics, setFuzzyTopics] = useState<ITopic[]>([]);

  const [passages, setPassages] = useState<IPassage[]>();
  const [topic, setTopic] = useState<ITopic>();

  useEffect(() => {
    const request = async () => {
      const topics = (await getData<{ topics: ITopic[] }>("/topic")).topics;

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

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          {passages ? (
            <>
              <Button
                lable="Back to Topics"
                icon="keyboard_arrow_left"
                onClick={() => setPassages(undefined)}
              />

              {passages.map((passage) => (
                <Passage
                  key={passage.id}
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
            <>
              <Link to="/">
                <Button lable="Back to Home" icon="home" onClick={() => {}} />
              </Link>

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
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Topics;
