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
                <Card>Some description of application.</Card>
                <Card>
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
