import React, { FC, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Result, { ResultInterface } from "../components/Result";
import SearchBox from "../components/SearchBox";
import { getData } from "../utils/apiRequest";

const Home: FC = () => {
  const [result, setResult] = useState<ResultInterface>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const request = async () => {};

    request();
  }, []);

  const searchQuery = async (query: string) => {
    if (query) {
      setLoading(true);

      const data = await getData<ResultInterface>(`/?q=${query}`);

      setResult(data);
      setLoading(false);
    } else {
      setResult(undefined);
    }
  };

  return (
    <div className="w-full m-auto max-w-5xl mt-32 p-2">
      <h1 className="text-7xl text-center mb-3 md:text-8xl">Info Parser</h1>

      <SearchBox placeholder="Search Query" search={searchQuery} />

      <div className="my-10">
        {loading ? (
          <Loading />
        ) : (
          <>
            {result ? (
              <Result data={result} />
            ) : (
              <>
                <Card>
                <div>
                  <p>
                    Our system will perform two tasks: topic retrieval and
                    passage retrieval.
                  </p>
                  <p>
                    Our system will have access to a corpus of text documents.
                    When presented with a query (a question in English asked by
                    the user), topic retrieval will first identify which topic
                    is most relevant to the query. Once the top topic is found,
                    passages from topic will be processed so that the most
                    relevant passage to the query can be determined.
                  </p>
                  <br />
                  <p>
                    How do we find the most relevant topic and passage? To find
                    the most relevant topic, we’ll use term frequency-inverse
                    document frequency to rank topics based both on term
                    frequency for words in the query as well as inverse document
                    frequency for words in the query.
                  </p>
                  <br />
                  <p>
                    Once we’ve found the most relevant documents, we’ll use a
                    combination of inverse document frequency and a query term
                    density measure to determine most relevant passage.
                  </p>
                  </div>
                </Card>
                <Card>
                  View and edit information that AI has access to:
                  <br />
                  <br />
                  <Link to="/explore">
                    <Button
                      lable="Explore Information"
                      icon="storage"
                      onClick={() => {}}
                    />
                  </Link>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
