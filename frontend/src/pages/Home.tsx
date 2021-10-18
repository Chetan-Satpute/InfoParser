import React, { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";

const Home: FC = () => {
  const searchQuery = async (query: string) => {};

  return (
    <div className="w-full m-auto max-w-5xl mt-32">
      <h1 className="text-7xl text-center mb-3 md:text-8xl">Info Parser</h1>

      <SearchBox placeholder="Search Query" search={searchQuery} />

      <div className="my-10">
        <Card>
          Some description of application: Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Card>
        <Card>
          <Link to="/explore">
            <Button lable="Explore Information" icon="storage" />
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Home;
