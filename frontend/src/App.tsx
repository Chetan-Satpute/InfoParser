import React, { FC } from "react";
import Card from "./components/Card";
import SearchBox from "./components/SearchBox";
import "./styles/App.css";

const App: FC = () => {
  const searchQuery = async (query: string) => {};

  return (
    <div className="w-full m-auto max-w-5xl">
      <h1 className="text-7xl text-center mt-32 mb-3 md:text-8xl">
        Info Parser
      </h1>

      <SearchBox search={searchQuery} />

      <div className="mt-10 toggles-container">
        <Card
          data={{
            headers: ["Company", "Rank"],
            rows: [
              ["Alfreds Futterkiste", "1"],
              ["Centro comercial Moctezuma", "2"],
              ["Ernst Handel", "3"],
              ["Island Trading", "9"],
              ["Laughing Bacchus Winecellars", "0"],
              ["Magazzini Alimentari Riuniti", "1"],
            ],
          }}
        />
      </div>

      <Card
        data={`
          Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        `}
      />
    </div>
  );
};

export default App;
